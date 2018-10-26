import React, {Component} from 'react';
import { connect } from 'react-redux';
import TaskList from './TaskList.js';

class TaskAreaDate extends Component {
    render() {
        const filterDate = () => {
            this.props.tasks.filter( task => {
                // if (task.date == )
                return task.list
            }) 
        }
        
        return (
            <div id="taskArea">
                <h4>Task Area:</h4>
                
                <TaskList filter={filterDate}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(TaskAreaDate);