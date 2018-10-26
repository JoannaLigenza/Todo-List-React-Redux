import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddTask extends Component {
    state = { task: "Add new task", id: 5, list: "", date: "", time: "", priority: "", color: "" }
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
        this.props.addTask(this.state.task, this.state.id, this.state.list, this.state.date, this.state.time, this.state.priority, this.state.color);
        this.setState( {task: ""})
    }
    selectChange = (e) => {
        this.setState( {list: e.target.value} );
    }
    
    render() {
        const lists = this.props.lists.map( list => {
           return <option className="option" style={{margin: 5+"px"}}> {list} </option>
        });
       // const date = 
       // console.log("lists: ", lists)
        return(
            <div id="add-task-area">
                <button className="delete-task-button right" onClick={this.props.hideAddNewTask}>X</button>
                <textarea className="textarea" value={this.state.task} onChange={this.handleChange}></textarea>
                <div className="add-task-properties">
                    <div className="add-priority priority-list">
                        <h4>List:</h4>
                        <select onChange={this.selectChange}>
                            {lists}
                        </select>
                    </div>
                    <div className="add-priority priority-date"></div>
                    <div className="add-priority priority-time"></div>
                    <div className="add-priority priority-priority"></div>
                </div>
                <button className="button-to-input" onClick={this.handleClick}>Add Task</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        tasks: state.tasks, 
        lists: state.lists
    }
}

// Whenever addTask function is called, dispatch is running
const mapDispatchToPost = (dispatch) => {
    return {
        addTask: (task, id, list, date, time, priority, color) => { dispatch( { type: 'ADD_TASK', task: {task: task, id: id, style: {textDecoration: "none"}, checked: false, list: list, date: date, time: time, priority: priority, color: color}} ) },
        hideAddNewTask: () => { dispatch( {type: 'HIDE_ADD_TASK_AREA'} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(AddTask);