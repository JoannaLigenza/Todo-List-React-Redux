import React from 'react';
import { connect } from 'react-redux';

const ListFilter = ( {lists, filter, toggleColor, filterTasks, showAddNewList, deleteList} ) => {

    const listOption = lists.map( list => {
        return <div key={list.id} className="list-filter-item" style={{backgroundColor: list.color === "default" ? "rgba(255,255,255, 0.3)" : "rgba(255,255,255, 0.6)"}}
                    onClick={ () => {
                        filterTasks("list", list.list); toggleColor("red", list.id);
                    }} > 
                {list.list} 
            </div>
    })

    return(
        <div className="ovlp-descr-select">
            <div id="choose-list">
                {listOption}
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
        toggleColor: (color, id) => { dispatch( { type: 'TOGGLE_COLOR', color: color, id: id} ) },
        filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) },
        showAddNewList: () => { dispatch( {type: 'SHOW_ADD_LIST_AREA'} ) },
        deleteList: (list) => { dispatch( {type: 'DELETE_LIST', list: list} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(ListFilter);