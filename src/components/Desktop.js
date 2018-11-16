import React from 'react';
import { connect } from 'react-redux';

const Desktop = ( {tasks, filterTasks, deleteAllTasks} ) => {
    return(
        <div id="desktop-div">
            <div>
                <p className="ovlp-descr-p">Show All Tasks</p>
                <button id="show-all-buttton" onClick={ () => {filterTasks("none")} }>Show All</button>
            </div>
            <div>
                <p className="ovlp-descr-p">Delete Checked Tasks</p>
                <button id="delete-all-buttton" onClick={ () => {deleteAllTasks()} }>Delete All</button>
            </div>
            
        </div>
        
    )
}

const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        tasks: state.tasks
    }
}

const mapDispatchToPost = (dispatch) => {
    return { 
        filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) },
        deleteAllTasks: () => { dispatch( {type: 'DELETE_All_TASKS'} ) }
    }
}

export  default connect(mapStateToProps, mapDispatchToPost)(Desktop);