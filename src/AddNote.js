import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddNote extends Component {
    state = { note: "Add some note here", id: this.props.id.noteId }
    handleChange = (e) => {
        this.setState( {note: e.target.value} );
    }
    addNote = (e) => {
        e.preventDefault();
        let id = this.state.id+1;
        this.props.addNote(this.state.note, id);
        this.setState( {note: "", id: id} );
        e.target.firstChild.value= "";
    }
    render() {
        return(
            <div id="add-note">
                <form onSubmit={this.addNote}>
                    <textarea className="textarea" placeholder={this.state.note} onChange={this.handleChange}></textarea>
                    <button className="button-to-input">Add Note</button>
                </form>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        notes: state.notes,
        id: state.id
    }
}

// Whenever addTask function is called, dispatch is running
const mapDispatchToPost = (dispatch) => {
    return {
        addNote: (note, id) => { dispatch( { type: 'ADD_NOTE', note: {note: note, id: id}} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(AddNote);