import React, {Component} from 'react';

class AddTaskArea extends Component {
    state = { task: "Add new task", id: 5 }
    handleChange = (e) => {
        this.setState( {task: e.target.value} );
    }
    handleClick = (e) => {
        e.preventDefault();
        // console.log(this.props)
        // console.log(this.state)
        let id = this.state.id+1;
        this.setState( {id: id})
        this.props.addTask(this.state);
        this.setState( {task: ""})
    }
    render() {
        return(
            <div id="add-task-area">
                <AddTask addTask={this.addTask}/>
            </div>
        )
    }
}

export default AddTaskArea