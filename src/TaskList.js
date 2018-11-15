import React from 'react';
import { connect } from 'react-redux';
import AddTaskDiv from './AddTaskDiv.js';
import EditTask from './Edit-task.js';
import AddListDiv from './AddListDiv.js';

const TaskList = ( {tasks, filter, deleteTask, editTask, changeStyle, showAddNewTask, changeTasksOrder, filterTasks} ) => {

    const filteringTask = tasks.filter( task => {          
        if (filter.list === "Default" && filter.priority === "All") {
            return task
        }
        if (filter.list !== "Default" && filter.priority === "All") {
            return task.list === filter.list
        }
        if (filter.priority !== "All" && filter.list === "Default") {
            return task.priority === filter.priority
        }
        return task
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
        
        return <li className="one-task" key={task.id} id={task.id} //onClick={ () => {handleEdit(task.id)} }
                style={ task.checked===true ? ({backgroundColor:"#f6f6f6"}) : (null) }
                draggable="true" onDragStart={ (e) => {onDragStart(e, task.id) }} >
            <div className="checkbox-container"><input type="checkbox" className="checkbox-style" 
            onChange={ (e) => {changeStyle(e.target.checked, task.id) } } defaultChecked={task.checked} 
            style={ task.color==="" ? ({boxShadow: "none" }) : ({boxShadow: "3px 3px 3px " + task.color }) } ></input></div> 
            <div className="task-p-area" onClick={() => {handleEdit(task.id)}}>
                <p className="task-text" style={ task.checked===true ? ({textDecoration: "line-through"}) : ({textDecoration: "none"}) } >{task.task}</p>
                    {/* contentEditable="true" onBlur={ (e) => {editTask(e.target.innerText, task.id)}} */}
                     
                <p className="task-property">{showProperty("list")} {showProperty("priority")} {showProperty("date")} {showProperty("time")}</p>
                <div className={task.edit ? ("edit-task-div visible") : ("edit-task-div hidden")} >
                    <EditTask task={task}/>
                </div>
            </div>
            <button className="delete-task-button" onClick={ () => {deleteTask(task.id)} }>X</button></li> 

    } );

    const onDragStart = (e, id) => {
        //e.preventDefault();
        e.dataTransfer.setData("text", id); 
        e.dataTransfer.effectAllowed = "move"; 
        // console.log(e.target, id)
    }

    const handleEdit = (id) => {
        editTask(id)
    }

    const dragoverHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
        if(e.target === null) {return};
        if(e.target.tagName !== "LI") {return};
        if(e.target.className !== "one-task") {return};
        e.target.closest(".one-task").classList.add("one-task-dragover");
        // console.log("trzymam ", e.target.className)
        
    }

    const dragleaveHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        if(e.target === null) {return};
        if(e.target.tagName !== "LI") {return};
        e.target.closest(".one-task").classList.remove("one-task-dragover");
    }

    const dropHandler = e => {
        const tasksCopy = tasks
        //e.preventDefault();
        console.log("drop");
        let MovedTask = e.dataTransfer.getData("text")
        let MovedTaskIndex = tasksCopy.findIndex(task => task.id === Number(MovedTask))
        console.log("id: ", MovedTask);

        if( e.target.closest(".one-task") === null) {return};
        if( e.target.closest(".one-task").tagName !== "LI") {return};
        e.target.closest(".one-task").classList.remove("one-task-dragover");
        if( e.target.closest(".one-task").id === MovedTask) { console.log("same id");return};
        

        const DeletedTask = tasksCopy.splice(MovedTaskIndex, 1);
        console.log("DeletedTask ", DeletedTask)
        let newPlace = e.target.closest(".one-task");
        console.log("new place: ", newPlace)
        
        let indexOfNewPlace = tasksCopy.findIndex(task => task.id === Number(newPlace.id))
        console.log("index: ", indexOfNewPlace);
        if(MovedTaskIndex > indexOfNewPlace) {
            tasksCopy.splice(indexOfNewPlace, 0, DeletedTask[0]);
        }
        if(MovedTaskIndex <= indexOfNewPlace) {
            tasksCopy.splice(indexOfNewPlace+1, 0, DeletedTask[0]);
        }
        
        console.log("tasks copy ", tasksCopy)
        
        changeTasksOrder(tasksCopy);
    }
    
    return(
        <div id="task-list-container">
            <div id="round-button-area">
                <button className="button-round" onClick={showAddNewTask}>Add Task</button> 
                <button className="button-round" onClick={ () => {filterTasks("none")} }>Show All</button>
            </div>
            
            <div><AddTaskDiv /></div>
            <div><AddListDiv /></div>
            <ul id="task-list" onDrop={dropHandler} onDragOver={dragoverHandler} onDragLeave={dragleaveHandler}>
                { alltasks }
            </ul>
        </div>
    )
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
        changeStyle: (checked, id) => { dispatch( {type: 'CHANGE_TASK_STYLE', checked: checked, id: id}  ) },
        // editTask: (text, id) => { dispatch( { type: 'EDIT_TASK', task: text, id: id} ) }, 
        editTask: (id) => { dispatch( { type: 'SHOW_EDIT_TASK', id: id} ) }, 
        showAddNewTask: () => { dispatch( {type: 'SHOW_ADD_TASK_AREA'} ) },
        changeTasksOrder: (newOrder) => { dispatch( {type: 'CHANGE_TASKS_ORDER', newOrder: newOrder } ) }, 
        filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(TaskList);