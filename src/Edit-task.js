import React, {Component} from 'react';
import { connect } from 'react-redux';

class EditTask extends Component {
    state = { task: this.props.task.task, id: this.props.task.id, checked: this.props.task.checked, edit: this.props.task.edit,
            list: this.props.task.list, date: this.props.task.date, time: this.props.task.time, 
            priority: this.props.task.priority, color: this.props.task.color }
    handleChange = (e) => {
        this.setState( {task: e.target.value} );
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

    handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(this.state.task.length === 0 ) {
            return
        }
        this.props.editTaskProperty(this.state.task, this.state.id, this.state.checked, this.state.edit, this.state.list, this.state.date, this.state.time, this.state.priority, this.state.color);
    };
    
    render() {
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
                    <div className="edit-task-proprty priority-priority">
                        <h4>Priority:</h4>
                        <select label="wybierz" onChange={this.priorityChange} defaultValue={this.props.task.priority}>
                            <option value="">None</option>
                            <option value="Low">Low</option>
                            <option value="Middle">Middle</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div id="edit-task-buttons">
                    <button className="button-to-input" onClick={this.handleClick}>Save</button>
                </div>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks, 
        lists: state.lists
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        editTaskProperty: (task, id, checked, edit, list, date, time, priority, color) => { dispatch( { type: 'EDIT_TASK', task: {task: task, id: id, checked: checked, edit: edit, list: list, date: date, time: time, priority: priority, color: color}} ) },
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(EditTask);