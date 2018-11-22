import React, {Component} from 'react';
import { connect } from 'react-redux';
import AddTaskDiv from './AddTaskDiv.js';
import EditTask from './Edit-task.js';
import AddListDiv from './AddListDiv.js';
import Search from './Search.js';

class TaskList extends Component {
    state = { tasks: this.props.tasks} 

    render() {

        const handleChangeInput = (id) => {
            const newTasks = this.state.tasks.map( task => {
                if (task.id === id) {
                    task.checked = !task.checked
                }
                return task
            })
            this.setState( {tasks: newTasks} )
            this.props.changeStyle(this.state.tasks);
        }

        const handleDeleteTask = (id) => {
            const newTasks = this.props.tasks.filter( task => {
                return task.id !== id
            })
            this.setState( {tasks: newTasks} )
            this.props.deleteTask(id);
        }

        const onDragStart = (e, id) => {
        //e.preventDefault();
        e.dataTransfer.setData("text", id); 
        e.dataTransfer.effectAllowed = "move"; 
        }

        const dragoverHandler = (e, id) => {
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = 'move';
            const newTasks = this.props.tasks.map( task => {
                if (task.id === id) {
                    task.moveTaskStyle = true
                }
                return task
            })
            this.setState( {tasks: newTasks})        
        }

        const dragleaveHandler = (e, id) => {
            e.preventDefault();
            e.stopPropagation();
            // if(e.target === null) {return};
            // if(e.target.tagName !== "LI") {return};
            //e.target.closest(".one-task").classList.remove("one-task-dragover");
            const newTasks = this.props.tasks.map( task => {
                if (task.id === id) {
                    task.moveTaskStyle = false
                }
                return task
            })
            // setState render component, so each time dragleaveHandler is performed, state read tasks from store
            this.setState( {tasks: newTasks})
        }

        const dropHandler = (e, task) => {
            const tasksCopy = this.props.tasks
            let MovedTask = e.dataTransfer.getData("text")
            let MovedTaskIndex = tasksCopy.findIndex(task => task.id === Number(MovedTask))

            const DeletedTask = tasksCopy.splice(MovedTaskIndex, 1);
            let newPlace = task;
            let indexOfNewPlace = tasksCopy.findIndex(task => task.id === Number(newPlace.id))

            if(MovedTaskIndex > indexOfNewPlace) {
                tasksCopy.splice(indexOfNewPlace, 0, DeletedTask[0]);
            }
            if(MovedTaskIndex <= indexOfNewPlace) {
                tasksCopy.splice(indexOfNewPlace+1, 0, DeletedTask[0]);
            }

            tasksCopy.map( taskx => {
                taskx.moveTaskStyle = false
                return taskx
            })

            this.setState( {tasks: tasksCopy} )
            this.props.changeTasksOrder(tasksCopy);
        }

        const search = this.props.tasks.filter( task => {
            if(task.task.toLocaleLowerCase().includes(this.props.filter.searchText) ) {
                return task
            }
            return null
        })

        //console.log("search ", this.props.filter.searchText)

        const filteringTask = search.filter( task => {    
            const {filter} = this.props      
            if (filter.list === "Default" && filter.priority === "All") {
                return task
            }
            if (filter.list !== "Default" && filter.priority === "All") {
                return task.list === filter.list
            }
            if (filter.priority !== "All" && filter.list === "Default") {
                return task.priority === filter.priority
            }
            return null
        }) 

        const alltasks = filteringTask.map( task => {
            const showProperty = (property) => {
                let switchProperty = () => {
                    if (property === "list") {
                        if(task.list === "Default") {
                            task.list = ""
                        }
                        return task.list
                    }
                    if (property === "priority") {
                        return task.priority
                    }
                    if (property === "date") {
                        return task.date
                    }
                    if (property === "time") {
                        return task.time
                    }
                }
                if (switchProperty() !== "") {
                    return property.charAt(0).toUpperCase() + property.slice(1) + ": " + switchProperty() + ", "
                }
            }
        
            return <li className={task.moveTaskStyle ? ("one-task one-task-dragover") : ("one-task") } 
                    key={task.id} id={task.id} 
                    style={ task.checked===true || task.edit===true ? ({backgroundColor:"#f6f6f6"}) : (null) }
                    draggable="true" onDragStart={ (e) => {onDragStart(e, task.id) }} 
                    onDragOver={ (e) => {dragoverHandler(e, task.id)} } 
                    onDragLeave={(e) => {dragleaveHandler(e, task.id)} } 
                    onDrop={(e) => {dropHandler(e, task)} }>
                <div className="checkbox-container">
                    <input type="checkbox" className="checkbox-style" onChange={ () => {handleChangeInput(task.id) } } 
                            defaultChecked={task.checked} style={ task.color==="" ? ({boxShadow: "none" }) : ({boxShadow: "3px 3px 3px " + task.color }) } >
                    </input>
                    {/* <div className="trash-icon"></div> */}
                </div> 
                <div className="task-p-area"  >
                    <div className="task-p" onClick={() => {this.props.editTask(task.id)}} >
                        <p className="task-text" style={ task.checked===true ? ({textDecoration: "line-through"}) : ({textDecoration: "none"}) } >{task.task}</p>
                        {/* contentEditable="true" onBlur={ (e) => {editTask(e.target.innerText, task.id)}} */}
                        
                        <p className="task-property">{showProperty("list")} {showProperty("priority")} {showProperty("date")} {showProperty("time")}</p>
                    </div>
                    
                    <div className={task.edit ? ("edit-task-div visible") : ("edit-task-div hidden")} >
                        <EditTask task={task}/>
                    </div>
                </div>
                {/* <button className="delete-task-button" onClick={ () => {deleteTask(task.id)} }>X</button></li>  */}
                <div className="delete-task-button" onClick={ () => {handleDeleteTask(task.id)} }></div>
            </li>
            

        } );

        console.log("przed przekazaniem do searcha: ", this.props.filter.searchText)
        return(
            <div id="task-list-container">
                <div id="round-button-area">
                    <button className="add-task-button" onClick={this.props.showAddNewTask}>Add Task</button> 
                    <Search searchText={this.props.filter.searchText} />
                </div>
                
                <div><AddTaskDiv /></div>
                <div><AddListDiv /></div>
                <ul id="task-list" >
                    { alltasks }
                </ul>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        tasks: state.tasks,
        filter: state.filter
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        deleteTask: (id) => { dispatch( { type: 'DELETE_TASK', id: id} ) }, 
        //deleteAllTasks: () => { dispatch( {type: 'DELETE_All_TASKS'} ) },
        changeStyle: (tasks) => { dispatch( {type: 'CHANGE_TASK_STYLE', tasks: tasks}  ) },
        //changeStyle: (checked, id) => { dispatch( {type: 'CHANGE_TASK_STYLE', checked: checked, id: id}  ) },
        // editTask: (text, id) => { dispatch( { type: 'EDIT_TASK', task: text, id: id} ) }, 
        editTask: (id) => { dispatch( { type: 'SHOW_EDIT_TASK', id: id} ) }, 
        showAddNewTask: () => { dispatch( {type: 'SHOW_ADD_TASK_AREA'} ) },
        changeTasksOrder: (newOrder) => { dispatch( {type: 'CHANGE_TASKS_ORDER', newOrder: newOrder } ) }, 
        // filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) },
        //search: (searchText) => { dispatch( {type: 'SEARCH', searchText: searchText} ) },
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(TaskList);