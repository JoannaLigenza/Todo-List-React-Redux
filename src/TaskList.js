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
            const newTasks = this.props.tasks.map( task => {
                if (task.id === id) {
                    task.checked = !task.checked
                }
                return task
            })
            this.props.changeStyle(newTasks);
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
            const newTasks = this.state.tasks.map( task => {
                if (task.id === id) {
                    task.moveTaskStyle = true
                }
                return task
            })
            //setState is made because task.moveTaskStyle is changed every time that state is changing
            this.setState( {tasks: newTasks})        
        }

        const dragleaveHandler = (e, id) => {
            e.preventDefault();
            e.stopPropagation();
            const newTasks = this.state.tasks.map( task => {
                if (task.id === id) {
                    task.moveTaskStyle = false
                }
                return task
            })
            // setState render component, so each time dragleaveHandler is performed, state read tasks from store
            this.setState( {tasks: newTasks})
        }

        const dropHandler = (e, task) => {
            e.preventDefault();
            const tasksCopy = this.props.tasks;
            let MovedTask = e.dataTransfer.getData("text");
            let MovedTaskIndex = tasksCopy.findIndex(task => task.id === Number(MovedTask));
            let newPlace = task;
            let indexOfNewPlace = tasksCopy.findIndex(task => task.id === Number(newPlace.id));
            
            tasksCopy.map( taskx => {
                taskx.moveTaskStyle = false
                return taskx
            })
            if(MovedTaskIndex === indexOfNewPlace) {
                this.setState( {tasks: tasksCopy} )
               return null;
            }

            const DeletedTask = tasksCopy.splice(MovedTaskIndex, 1);

            if(MovedTaskIndex > indexOfNewPlace) {
                tasksCopy.splice(indexOfNewPlace, 0, DeletedTask[0]);
            }
            if(MovedTaskIndex < indexOfNewPlace) {
                tasksCopy.splice(indexOfNewPlace, 0, DeletedTask[0]);
            }

            this.setState( {tasks: tasksCopy} )
            this.props.changeTasksOrder(tasksCopy);
        }

        const search = this.props.tasks.filter( task => {
            if(task.task.toLocaleLowerCase().includes(this.props.filter.searchText) ) {
                return task;
            }
            return null
        })

        const filteringTask = search.filter( task => {    
            const {filter} = this.props      
            if (filter.list === "Default" && filter.priority === "All" && filter.date === "") {
                return task;
            }
            if (filter.list !== "Default" && filter.priority === "All" && filter.date === "") {
                return task.list === filter.list;
            }
            if (filter.priority !== "All" && filter.list === "Default" && filter.date === "") {
                return task.priority === filter.priority;
            }
            if (filter.date !== "" && filter.list === "Default" && filter.priority === "All") {
                if (filter.date[2] === "expired") {
                    if (task.date !== "") {
                        return task.date < filter.date[0];
                    }
                } else if (filter.date[2] === "all") {
                    return task;
                } else {
                    return task.date >= filter.date[0] && task.date <= filter.date[1];
                }
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
                        if(task.priority === "None") {
                            task.priority = ""
                        }
                        return task.priority
                    }
                    if (property === "date") {
                        return task.date
                    }
                }
                if (switchProperty() !== "") {
                    return property.charAt(0).toUpperCase() + property.slice(1) + ": " + switchProperty() + ", "
                }
            }
        
            return <li className={task.moveTaskStyle ? ("one-task one-task-dragover") : ("one-task") } 
                    key={task.id} id={task.id} 
                    style={ task.checked===true || task.edit===true ? ({backgroundColor:"#f6f6f6"}) : (null) }
                    draggable="true" onDragStart={ (e) => {onDragStart(e, task.id)} } 
                    onDragOver={ (e) => {dragoverHandler(e, task.id) } } 
                    onDragLeave={(e) => {dragleaveHandler(e, task.id) } } 
                    onDrop={(e) => {dropHandler(e, task)} }  
                   >
                <div className="checkbox-container">
                    <input type="checkbox" className="checkbox-style" onChange={ () => {handleChangeInput(task.id) } } 
                            defaultChecked={task.checked} style={ task.color==="" ? ({boxShadow: "none" }) : ({boxShadow: "3px 3px 3px " + task.color }) } >
                    </input>
                </div> 
                <div className="task-p-area"  >
                    <div className="task-p" onClick={() => {this.props.editTask(task.id)}} >
                        <p className="task-text" style={ task.checked===true ? ({textDecoration: "line-through"}) : ({textDecoration: "none"}) } >{task.task}</p>
                        
                        <p className="task-property"> {showProperty("list")} {showProperty("priority")} {showProperty("date")} </p>
                    </div>
                    
                    <div className={task.edit ? ("edit-task-div visible") : ("edit-task-div hidden")} >
                        <EditTask task={task}/>
                    </div>
                </div>
                <div className="delete-task-button" onClick={ () => {this.props.deleteTask(task.id)} }></div>
            </li>
            

        } );

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
                <div id="desktop-div">
                    <button id="show-all-button" onClick={ () => {this.props.filterTasks("none")} }>Show All</button>
                    <button id="delete-all-button" onClick={ () => {this.props.deleteAllTasks()} }>Delete Finished</button>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        tasks: state.tasks,
        lists: state.lists,
        filter: state.filter
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        deleteTask: (id) => { dispatch( { type: 'DELETE_TASK', id: id} ) }, 
        changeStyle: (tasks) => { dispatch( {type: 'CHANGE_TASK_STYLE', tasks: tasks}  ) },
        editTask: (id) => { dispatch( { type: 'SHOW_EDIT_TASK', id: id} ) }, 
        showAddNewTask: () => { dispatch( {type: 'SHOW_ADD_TASK_AREA'} ) },
        changeTasksOrder: (newOrder) => { dispatch( {type: 'CHANGE_TASKS_ORDER', newOrder: newOrder } ) }, 
        filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) },
        deleteAllTasks: () => { dispatch( {type: 'DELETE_All_TASKS'} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(TaskList);