import React from 'react';
import { connect } from 'react-redux';
import AddTaskDiv from './AddTaskDiv.js';

const TaskList = ( {tasks, filter, deleteTask, editTask, changeStyle, showAddNewTask, changeTasksOrder, dragOverStyle} ) => {

    const filteringTask = tasks.filter( task => {          
        if (filter.list === "Default" && filter.priority === "None") {
            return task
        }
        if (filter.list !== "Default" && filter.priority === "None") {
            return task.list === filter.list
        }
        if (filter.priority !== "None" && filter.list === "Default") {
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

        const onDragStart = (e, id) => {
            //e.preventDefault();
            e.dataTransfer.setData("text", id); 
            e.dataTransfer.effectAllowed = "move"; 
            //e.target.style.opacity = "0.5"; // ustaw wartosc w state: opacity: 0.5, a w onDragEnd ustaw na 1 + dodaj style do kazdego taska
            console.log(e.target, id)
        }
        
        return ( <li className="one-task" key={task.id} id={task.id} draggable="true" onDragStart={ (e) => {onDragStart(e, task.id) }} >
                {/* style={task.dragenterStyle===true ? ({backgroundColor: "rgba"+(255,255,255,0.7), border: 2+"px "+ "dashed blue"}) : ({backgroundColor: "white", border: "none"})}> */}
            <div className="checkbox-container"><input type="checkbox" className="checkbox-style" onChange={ (e) => {changeStyle(e.target.checked, task.id) } } defaultChecked={task.checked} style={ task.color==="" ? ({boxShadow: "none" }) : ({boxShadow: "3px 3px 3px " + task.color }) } ></input></div> 
            <div className="task-p-area">
                <p className="task-text" style={task.style} contentEditable="true" onBlur={ (e) => {editTask(e.target.innerText, task.id)}}>{task.task}</p> 
                <p className="task-property">{showProperty("list")} {showProperty("priority")} {showProperty("date")} {showProperty("time")}</p>
            </div>
            
            <button className="delete-task-button" onClick={ () => {deleteTask(task.id)} }>X</button></li> )
    } );

    const dragoverHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
        if(e.target === null) {return};
        if(e.target.tagName !== "LI") {return};
        // const style = tasks.map( task => {
        //     return true
        // })
        //dragOverStyle(true);
        if(e.target.className !== "one-task") {return};
        
        e.target.closest(".one-task").classList.add("one-task-dragover");
         console.log("trzymam ", e.target.className)
        
    }

    const dragleaveHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        if(e.target === null) {return};
        if(e.target.tagName !== "LI") {return};
        e.target.closest(".one-task").classList.remove("one-task-dragover");
       // dragOverStyle(false);
    }

    const dropHandler = e => {
        const tasksCopy = tasks
        e.preventDefault();
        console.log("drop");
        let MovedTask = e.dataTransfer.getData("text")
        let MovedTaskIndex = tasksCopy.findIndex(task => task.id === Number(MovedTask))
        console.log("id: ", MovedTask);

        if( e.target.closest(".one-task") === null) {return};
        if( e.target.closest(".one-task").tagName !== "LI") {return};
        if( e.target.closest(".one-task").id === MovedTask) { console.log("same id");return};
        e.target.closest(".one-task").classList.remove("one-task-dragover");

        const DeletedTask = tasksCopy.splice(MovedTaskIndex, 1);
        console.log("DeletedTask ", DeletedTask)
        let newPlace = e.target.closest(".one-task");
        console.log("new place: ", newPlace)
        
        let indexOfNewPlace = tasksCopy.findIndex(task => task.id === Number(newPlace.id))
        console.log("index: ", indexOfNewPlace);

        tasksCopy.splice(indexOfNewPlace, 0, DeletedTask[0]);
        console.log("tasks copy ", tasksCopy)
        
        changeTasksOrder(tasksCopy);
    }
    
    return(
        <div id="task-list-container">
            <button className="add-button-round" onClick={showAddNewTask}>Add Task</button> 
            <div><AddTaskDiv /></div>
            <ul id="task-list" onDrop={dropHandler} onDragOver={dragoverHandler} onDragLeave={dragleaveHandler}>
                { alltasks }
            </ul>
            <div id="test" ></div>
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
        editTask: (text, id) => { dispatch( { type: 'EDIT_TASK', task: text, id: id} ) }, 
        showAddNewTask: () => { dispatch( {type: 'SHOW_ADD_TASK_AREA'} ) },
        changeTasksOrder: (newOrder) => { dispatch( {type: 'CHANGE_TASKS_ORDER', newOrder: newOrder } ) }, 
        dragOverStyle: (bolean) => { dispatch( {type: 'CHANGE_DRAGOVER_STYLE', dragOverStyle: bolean } ) },
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(TaskList);