import React from 'react';
import { connect } from 'react-redux';

const TasksFilter = ( {priorities, filterTasks} ) => {

    const priorityOption = priorities.map( prior => {
         return <div key={prior.id}> <h4>{prior.priority}</h4>
                <input id={prior.id} type="radio" name="priority" key={prior.id}
                onClick={ () => { filterTasks("priority", prior.priority);}} /> 
                <label htmlFor={prior.id}></label></div>
    })

    return(
        <div className="ovlp-descr-select">
            <div className="choose-priority">
                <p>Priority</p>
                <div id="priority-filter" >
                    {priorityOption}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        priorities: state.priorities,
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(TasksFilter);