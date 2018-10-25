import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddTask extends Component {
    state = { task: "Add new task", id: 5 }
    handleChange = (e) => {
        this.setState( {task: e.target.value} );
    }
    handleClick = (e) => {
        e.preventDefault();
        if(this.state.task.length === 0 ) {
            return
        }
        this.addTask();
        this.props.hideAddNewTask();
    }
    addTask = (e) => {
        // console.log("tuuu " ,this.props.tasks)
        // console.log(this.state)
        let id = this.state.id+1;
        this.setState( {id: id})
        this.props.addTask(this.state.task, this.state.id);
        this.setState( {task: ""})
    }
    
    render() {
        return(
            <div id="add-task-area">
                <button className="delete-task-button right" onClick={this.props.hideAddNewTask}>X</button>
                <textarea className="textarea" value={this.state.task} onChange={this.handleChange}></textarea>
                <div className="add-task-properties">
                    <div className="add-list"></div>
                    <div className="add-date"></div>
                    <div className="add-time"></div>
                    <div className="add-priority"></div>
                </div>
                <button className="button-to-input" onClick={this.handleClick}>Add Task</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        tasks: state.tasks
    }
}

// Whenever addTask function is called, dispatch is running
const mapDispatchToPost = (dispatch) => {
    return {
        addTask: (task, id) => { dispatch( { type: 'ADD_TASK', task: {task: task, id: id, style: {textDecoration: "none"}, checked: false, list: "", date: "", time: "", priority: "", color: ""}} ) },
        hideAddNewTask: () => { dispatch( {type: 'HIDE_ADD_TASK_AREA'} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(AddTask);