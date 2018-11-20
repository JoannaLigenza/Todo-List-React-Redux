import React, {Component} from 'react';
import { connect } from 'react-redux';

class EditTask extends Component {
    // prop task is from
    state = { task: this.props.task.task, id: this.props.task.id, checked: this.props.task.checked, edit: this.props.task.edit,
            list: this.props.task.list, date: this.props.task.date, time: this.props.task.time, 
            priority: this.props.task.priority, color: this.props.task.color }
    handleChange = (e) => {
        this.setState( {task: e.target.value} );
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

    handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(this.state.task.length === 0 ) {
            return
        }
        this.props.editTaskProperty(this.state.task, this.state.id, this.state.checked, this.state.edit, this.state.list, this.state.date, this.state.time, this.state.priority, this.state.color);
        //this.props.hideEditTask(this.props.task.id); - this isn't needed because in this.props.editTaskProperty this.state.edit is false
    };
    
    render() {
        //console.log("this.props.task ", this.props.task)
        const lists = this.props.lists.map( list => {
           return <option className="option" style={{margin: 5+"px"}} key={list.id}> {list.list} </option> 
        });
        
        return(
            <div id="edit-task-area">
                <textarea className="textarea-edit-task" defaultValue={this.props.task.task} onChange={this.handleChange}></textarea>
                <div className="edit-task-properties">
                    <div className="edit-task-proprty priority-list">
                        <h4>List:</h4>
                        <select defaultValue={this.props.task.list} onChange={this.selectChange}>
                            {lists}
                        </select>
                    </div>
                    <div className="edit-task-proprty priority-date">
                        <h4>Date:</h4>
                        <input type="date" defaultValue={this.props.task.date} onChange={this.dateChange}></input>
                    </div>
                    <div className="edit-task-proprty priority-time">
                        <h4>Time:</h4>
                        <input type="time" defaultValue={this.props.task.time} onChange={this.timeChange}></input>
                    </div>
                    <div className="edit-task-proprty priority-priority">
                        <h4>Priority:</h4>
                        <select label="wybierz" onChange={this.priorityChange} defaultValue={this.props.task.priority}>
                            <option value="">None</option>
                            <option value="Low">Low</option>
                            <option value="Middle">Middle</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    {/* <div className="add-priority priority-priority">
                        <h4>Priority:</h4>
                        <div id="priority-select" onChange={this.priorityChange}>
                            <ul>
                                <li><input type="radio" id="1I" name="prior" value=""></input><label htmlFor="1I">None</label></li>
                                <li><input type="radio" id="2I" name="prior" value="Low"></input><label htmlFor="2I">Low</label></li>
                                <li><input type="radio" id="3I" name="prior" value="Middle"></input><label htmlFor="3I">Middle</label></li>
                                <li><input type="radio" id="4I" name="prior" value="High"></input><label htmlFor="4I">High</label></li>
                            </ul>
                        </div>
                    </div> */}
                </div>
                <div id="edit-task-buttons">
                    <button className="button-to-input" onClick={this.handleClick}>Save</button>
                </div>
                
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
        editTaskProperty: (task, id, checked, edit, list, date, time, priority, color) => { dispatch( { type: 'EDIT_TASK', task: {task: task, id: id, checked: checked, edit: edit, list: list, date: date, time: time, priority: priority, color: color}} ) },
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(EditTask);