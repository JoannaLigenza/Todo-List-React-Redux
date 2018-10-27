import React from 'react';
import { connect } from 'react-redux';
import AddTaskDiv from './AddTaskDiv.js';

const TaskList = ( {tasks, filter, deleteTask, editTask, changeStyle, showAddNewTask} ) => {

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

        return ( <li className="one-task" key={task.id}>
            <div className="checkbox-container"><input type="checkbox" className="checkbox-style" onChange={ (e) => {changeStyle(e.target.checked, task.id) } } defaultChecked={task.checked} style={{borderColor: tasks.color}}></input></div> 
            <div className="task-p-area">
                <p className="task-text" style={task.style} contentEditable="true" onBlur={ (e) => {editTask(e.target.innerText, task.id)}}>{task.task}</p> 
                <p className="task-property">{showProperty("list")} {showProperty("priority")} {showProperty("date")} {showProperty("time")}</p>
            </div>
            
            <button className="delete-task-button" onClick={ () => {deleteTask(task.id)} }>X</button></li> )
    } );
    
    return(
        <div id="task-list-container">
            <button className="add-button-round" onClick={showAddNewTask}>Add Task</button> 
            <div><AddTaskDiv /></div>
            <ul id="task-list">
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
        editTask: (text, id) => { dispatch( { type: 'EDIT_TASK', task: text, id: id} ) }, 
        showAddNewTask: () => { dispatch( {type: 'SHOW_ADD_TASK_AREA'} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(TaskList);