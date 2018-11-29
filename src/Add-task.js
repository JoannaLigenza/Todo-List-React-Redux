import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddTask extends Component {
    state = { task: "Add new task", id: this.props.id.taskId, list: "Default", date:"", priority: "None", color: "", moveTaskStyle: false }
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
        this.props.addTask(this.state.task, this.state.id, this.state.list, this.state.date, this.state.priority, this.state.color, this.state.moveTaskStyle);
        this.setState( {task: "", date: ""})
    };
    selectChange = (e) => {
        this.setState( {list: e.target.value} );
    };
    
    dateChange = (e) => {
        this.setState( {date: e.target.value} );
    };

    timeChange = (e) => {
        this.setState( {time: e.target.value} );
    };

    priorityChange = (e) => {
        let color = "";
        if (e.target.value === "Low") {
            color = "yellow"
        };
        if (e.target.value === "Middle") {
            color = "orange"
        };
        if (e.target.value === "High") {
            color = "red"
        }
        this.setState( {priority: e.target.value, color: color} );
    };
    
    render() {
        const lists = this.props.lists.map( list => {
           return <option className="option" style={{margin: 5+"px"}} key={list.id}> {list.list} </option> 
        });

        return(
            <div id="add-task-area">
                <button className="delete-add-new-task-button right" onClick={this.props.hideAddNewTask}>X</button>
                <textarea className="textarea" placeholder={this.state.task} onChange={this.handleChange}></textarea>
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
                    <div className="add-priority priority-priority">
                        <h4>Priority:</h4>
                        <select id="priority-select" onChange={this.priorityChange} default="none">
                            <option>None</option>
                            <option>Low</option>
                            <option>Middle</option>
                            <option>High</option>
                        </select>
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
        lists: state.lists,
        id: state.id
    }
}

// Whenever addTask function is called, dispatch is running
const mapDispatchToPost = (dispatch) => {
    return {
        addTask: (task, id, list, date, priority, color, style) => { dispatch( { type: 'ADD_TASK', task: {task: task, id: id, checked: false, edit: false, list: list, date: date, priority: priority, color: color, moveTaskStyle: style}} ) },
        hideAddNewTask: () => { dispatch( {type: 'HIDE_ADD_TASK_AREA'} ) },
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(AddTask);