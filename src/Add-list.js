import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddList extends Component {
    state = { list: "Add new list", id: 4 , displayDiv: false, message: "This list already exists"}
    handleChange = (e) => {
        this.setState( {list: e.target.value} );
    };
    handleClick = (e) => {
        e.preventDefault();
        if(this.state.list.length === 0 ) { return }
        if (this.checkListName() === true) {
            this.setState( {displayDiv: true, message: "This list already exists"})
            return;
        }
        this.setState( {displayDiv: false})
        if (this.props.lists.length > 20) { 
            this.setState( {displayDiv: true, message: "You can't add more than 20 lists"});
            return 
        }
        this.addList();
        this.props.hideAddNewList();
    };
    addList = () => {
        let id = this.state.id+1;
        this.setState( {id: id})
        this.props.addList(this.state.list, this.state.id);
        this.setState( {list: ""})
    };
    checkListName = () => {
        let check = false;
        this.props.lists.map( list => {
            if (this.state.list === list.list) { check = true; }
            return check;
        })
        return check;
    }
    
        
    render() {
        return(
            <div id="add-list-area">
                <button className="delete-list-button right" onClick={this.props.hideAddNewList}>X</button>
                <input className="add-list-input" value={this.state.list} onChange={this.handleChange}></input>
                <div >
                    
                    
                </div>
                <button className="button-to-input" onClick={this.handleClick}>Add New List</button>
                <div className={this.state.displayDiv ? ("displayDiv") : ("notDisplayDiv") }> {this.state.message} </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        lists: state.lists
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        addList: (list, id) => { dispatch( { type: 'ADD_LIST', list: {list: list, id: id}} ) },
        hideAddNewList: () => { dispatch( {type: 'HIDE_ADD_LIST_AREA'} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(AddList);