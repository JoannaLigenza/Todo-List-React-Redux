import React, {Component} from 'react';
import AddTask from './Add-task.js';
import TaskList from './TaskList.js';

class TaskArea extends Component {
    render() {
        return (
            <div className="task-area">
                <h4>Task Area:</h4>
                <AddTask />
                <TaskList />
            </div>
        )
    }
}


export default TaskArea;