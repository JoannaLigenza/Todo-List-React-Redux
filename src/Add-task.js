import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddTask extends Component {
    state = { task: "Add new task", id: 5, list: "Default", date:"", time: "", priority: "", color: "" }
    handleChange = (e) => {
        this.setState( {task: e.target.value} );
    };
    handleClick = (e) => {
        e.preventDefault();
        if(this.state.task.length === 0 ) {
            return
        }
        this.addTask();
        this.props.hideAddNewTask();
    };
    addTask = (e) => {
        let id = this.state.id+1;
        this.setState( {id: id})
        this.props.addTask(this.state.task, this.state.id, this.state.list, this.state.date, this.state.time, this.state.priority, this.state.color);
        this.setState( {task: ""})
        this.setState( {date: ""});
    };
    selectChange = (e) => {
        console.log("e.target.value ", e.target.value)
        this.setState( {list: e.target.value} );
    };
    
    dateChange = (e) => {
        this.setState( {date: e.target.value} );
    };

    timeChange = (e) => {
        this.setState( {time: e.target.value} );
    };

    priorityChange = (e) => {
        console.log("e.target.value ", e.target.value)
        this.setState( {priority: e.target.value} );
    };
    
    render() {
        const lists = this.props.lists.map( list => {
           return <option className="option" style={{margin: 5+"px"}} key={list.id}> {list.list} </option> 
        });

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
                    <div className="add-priority priority-date">
                        <h4>Date:</h4>
                        <input type="date" value={this.state.date} onChange={this.dateChange}></input>
                    </div>
                    <div className="add-priority priority-time">
                        <h4>Time:</h4>
                        <input type="time" value={this.state.time} onChange={this.timeChange}></input>
                    </div>
                    {/* <div className="add-priority priority-priority">
                        <h4>Priority:</h4>
                        <select label="wybierz" onChange={this.priorityChange} default="none">
                            <option>None</option>
                            <option>Low</option>
                            <option>Middle</option>
                            <option>High</option>
                        </select>
                    </div> */}
                    <div className="add-priority priority-priority">
                        <h4>Priority:</h4>
                        <div id="priority-select" onChange={this.priorityChange} default="none">
                            <ul>
                                <li><label htmlFor="1"><input type="radio" id="1"name="prior" value=""></input>None</label></li>
                                <li><label htmlFor="2"><input type="radio" id="2"name="prior" value="Low"></input>Low</label></li>
                                <li><label htmlFor="3"><input type="radio" id="3"name="prior" value="Middle"></input>Middle</label></li>
                                <li><label htmlFor="4"><input type="radio" id="4"name="prior" value="High"></input>High</label></li>
                            </ul>
                        </div>
                    </div>
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