import React, {Component} from 'react';
import TaskList from './TaskList.js';

class TaskArea extends Component {
    render() {
        return (
            <div id="taskArea">
                {/* <h4>Task Area:</h4> */}
                
                <TaskList />
            </div>
        )
    }
}


export default TaskArea;