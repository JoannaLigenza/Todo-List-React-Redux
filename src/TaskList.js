import React from 'react';
import { connect } from 'react-redux';

const TaskList = ( {tasks, deleteTask, editTask, changeStyle} ) => {
    const addTask = () => {
        console.log("tuuu " , deleteTask)
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
            <button className="add-button-round" onClick={addTask}>Add Task</button> 
            <ul id="task-list">
                { alltasks }
            </ul>
        </div>
    )
}


const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        tasks: state.tasks
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        deleteTask: (id) => { dispatch( { type: 'DELETE_TASK', id: id} ) }, 
        changeStyle: (checked, id) => { dispatch( {type: 'CHANGE_TASK_STYLE', checked: checked, id: id}  ) },
        editTask: (text, id) => { dispatch( { type: 'EDIT_TASK', task: text, id: id} ) }, 
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(TaskList);