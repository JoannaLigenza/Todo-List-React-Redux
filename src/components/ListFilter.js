import React from 'react';
import { connect } from 'react-redux';

const ListFilter = ( {lists, priorities, filter, filterTasks} ) => {

    const listOption = lists.map( list => {
        if (list.id === 1) {
            console.log("jeden")
            return <option key={list.id} selected> {list.list} </option> 
        }
        if (list.id !== 1) {
            console.log(" NIE jeden")
            return <option key={list.id} > {list.list} </option> 
        }
    })
    const piorityOption = priorities.map( prior => {
         return <option key={prior.id}> {prior.priority} </option> 
    })

    return(
        <div className="ovlp-descr-select">
            <div className="choose-list">
                <p>Choose List</p>
                <select id="list-filter" onChange={ (e) => {filterTasks("list", e.target.value);}} value={filter.list}>
                    {listOption}
                </select>
            </div>
            <div className="choose-list">
                <p>Choose Priority</p>
                <select id="date-filter" onChange={ (e) => {filterTasks("priority", e.target.value);}} value={filter.priority}>
                    {piorityOption}
                </select>
            </div>
            <div className="choose-list">
                <p>Redet Filters</p>
                <div id="no-filter" onClick={ () => {filterTasks("none")} }>Reset</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists,
        priorities: state.priorities,
        filter: state.filter
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(ListFilter);