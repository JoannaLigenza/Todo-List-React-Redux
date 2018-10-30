import React from 'react';
import { connect } from 'react-redux';

const ListFilter = ( {lists, filter, filterTasks, showAddNewList, deleteList} ) => {

    const listOption = lists.map( list => {
        return <option key={list.id} > {list.list} </option>
    })

    return(
        <div className="ovlp-descr-select">
            <div id="choose-list">
                <p>Choose List</p>
                <select className="list-filter" onChange={ (e) => {filterTasks("list", e.target.value);}} value={filter.list}>
                    {listOption}
                </select>
            </div>
            <div id="add-new-list">
                <button className="add-new-delete-list-button button-round" onClick={showAddNewList}>Add List</button>
                 <button className="add-new-delete-list-button button-round" onClick={ () => {deleteList(filter.list) } }>Delete List</button>
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
        filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) },
        showAddNewList: () => { dispatch( {type: 'SHOW_ADD_LIST_AREA'} ) },
        deleteList: (list) => { dispatch( {type: 'DELETE_LIST', list: list} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(ListFilter);