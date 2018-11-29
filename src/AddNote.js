import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddNote extends Component {
    state = { note: "Add some note here", id: 2 }
    handleChange = (e) => {
        this.setState( {note: e.target.value} );
    }
    handleClick = (e) => {
        e.preventDefault();
        let id = this.state.id + 1
        this.setState( {id: id} );
        this.props.addNote(this.state.note, this.state.id);
        this.setState( {note: ""} )
    }
     render() {
        return(
            <div id="add-note">
                <textarea className="textarea" placeholder={this.state.note} onChange={this.handleChange}></textarea>
                <button className="button-to-input" onClick={this.handleClick}>Add Note</button>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        notes: state.notes
    }
}

// Whenever addTask function is called, dispatch is running
const mapDispatchToPost = (dispatch) => {
    return {
        addNote: (note, id) => { dispatch( { type: 'ADD_NOTE', note: {note: note, id: id}} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(AddNote);