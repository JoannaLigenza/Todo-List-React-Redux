import React, {Component} from 'react';
import { connect } from 'react-redux';
import AddTask from './add-task.js';

class AddTaskDiv extends Component {
    render() {
        console.log(this.props.addTaskArea)
        return (
            <div className={this.props.addTaskArea ? ("add-task-div-visible") : ("add-task-div-hidden")} >                
                <AddTask />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addTaskArea: state.addTaskArea
    }
}

export default connect(mapStateToProps)(AddTaskDiv) ;