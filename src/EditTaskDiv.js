import React, {Component} from 'react';
import { connect } from 'react-redux';
import EditTask from './Edit-task.js';

class EditTaskDiv extends Component {
    render() {
        console.log(this.props.addTaskArea)
        return (
            <div className={this.props.addEditTaskArea ? ("edit-task-div-visible") : ("edit-task-div-hidden")} >                
                <EditTask />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addEditTaskArea: state.addEditTaskArea
    }
}

export default connect(mapStateToProps)(EditTaskDiv) ;