import React, {Component} from 'react';
import { connect } from 'react-redux';

class Search extends Component {
    state = { search: ""}

    handleChange = (e) => {
        const value = e.target.value.toLocaleLowerCase();
        this.setState( {search: value} )
    }

    handleSearch = () => {
        this.props.search(this.state.search);
    }

    render() {

        return (
        <div id="search-area">
            <input type="search" id="search-input" onChange={this.handleChange}
            defaultValue={this.props.searchText !== "" ? (this.props.searchText) : ("")} ></input>
            <button id="search-button" onClick={this.handleSearch}>Search</button>
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks, 
        filter: state.filter
    }
}

const mapDispatchToPost = (dispatch) => {
    return { 
        search: (searchText) => { dispatch( {type: 'SEARCH', searchText: searchText} ) },
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(Search);