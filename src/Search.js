import React, {Component} from 'react';
import { connect } from 'react-redux';

class Search extends Component {
    state = { search: "", value: this.props.defaultValue}

    handleChange = (e) => {
        this.setState( {search: e.target.value} )
    }

    defaultValue = () => {
       // console.log(" this.props.filter.searchText ",  this.props.filter.searchText)
       // return this.props.filter.searchText
    }

    // handleSearch = () => {
    //     //console.log("this.state.search ", this.state.search)
    //     return this.state.search
    // }

    render() {
        
        return (
        <div id="search-area">
            <input type="search" id="search-input" defaultValue={this.props.filter.searchText} onChange={this.handleChange}></input>
            <button id="search-button" onClick={ () => {this.props.handleSearch(this.state.search); this.defaultValue()} }>Search</button>
        </div>
    )
    }
}

  



const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        tasks: state.tasks, 
        filter: state.filter
    }
}

// const mapDispatchToPost = (dispatch) => {
//     return { 
//         filterTasks: (filter, value) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value} ) },
//         //deleteAllTasks: () => { dispatch( {type: 'DELETE_All_TASKS'} ) }
//     }
// }

export default connect(mapStateToProps)(Search);