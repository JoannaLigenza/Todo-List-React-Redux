import React, { Component } from 'react';
import { connect } from 'react-redux';

// props:filter is from AllOverlaps
// const ListFilter = ( {filter} ) => {
//     const filterTaskModuleToAllOverlaps = (filterName) => {
//         console.log("filter by: ", filterName);
//         filter(filterName);
//     }

const ListFilter = ( {lists, priorities, filterTasks} ) => {
    // const filter = (filterName) => {
    //     console.log("filterTasks ", filterName)
    //     filterTasks(filterName)
    // }

    const listOption = lists.map( list => {
         return <option key={list.id}> {list.list} </option> 
    })
    const piorityOption = priorities.map( prior => {
         return <option key={prior.id}> {prior.priority} </option> 
    })

    return(
        <div className="ovlp-descr-p">
             {/* <div id="list-filter" onClick={ () => {filterTaskModuleToAllOverlaps("listFilter")} }></div>
            <div id="date-filter" onClick={ () => {filterTaskModuleToAllOverlaps("dateFilter")} }></div> */}

            <select id="list-filter"  onChange={ (e) => {filterTasks("list", e.target.value);}  }>
                {listOption}
            </select>
            <select id="date-filter" onClick={ (e) => {filterTasks("priority", e.target.value);} }>
                {piorityOption}
            </select>
            <div id="no-filter" onClick={ () => {filterTasks("none")} }></div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists,
        priorities: state.priorities
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(ListFilter);