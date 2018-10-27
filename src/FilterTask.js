import React from 'react';
import { connect } from 'react-redux';

const FilteredTasks = ( {tasks, filter} ) => {
    const filter = tasks.map( task => {
        if (filter.list === true) {
            return task.list === "Private"
        }
    }) 
}

const mapStateToProps = (state) => {           
    return {
        tasks: state.tasks,
        filter: state.filter
    }
}

export default connect(mapStateToProps)(FilteredTasks);