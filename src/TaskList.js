import React from 'react';
import AddTask from './Add-task.js';

const TaskList = ( {tasks, deleteTask, editTask, changeStyle} ) => {
    const addTask = () => {
        console.log("dziala")
    }
    const alltasks = tasks.map( task => {
        return ( <li className="one-task" key={task.id}>
            <div className="checkbox-container"><input type="checkbox" className="checkbox-style" onChange={ (e) => {changeStyle(e.target.checked, task.id)}}></input></div> 
            <p className="task-text" style={task.style} contentEditable="true" onBlur={ (e) => {editTask(e.target.innerText, task.id)}}>{task.task}</p> 
            <button className="delete-task-button" onClick={ () => {deleteTask(task.id)} }>X</button></li> )
    } );
    return(
        <div id="task-list-container">
            <div className="add-task">
                <AddTask/>
            </div>
            <button className="add-button-round" onClick={addTask}>Add Task</button> 
            <ul id="task-list">
                { alltasks }
            </ul>
        </div>
    )
}

export default TaskList;