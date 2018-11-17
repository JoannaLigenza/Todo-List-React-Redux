import React from 'react';
import { connect } from 'react-redux';

const NoteList = ( {notes, deleteNote, editNote} ) => {
    const showNotes = notes.map( (note) => {
        return <li className="one-note" key={note.id}>
            <p className="note-text" contentEditable="true" onBlur={ (e) => {editNote(e.target.innerText, note.id)} }>{note.note}</p>
            <div className="delete-note-button" onClick={ () => {deleteNote(note.id)} }></div></li>
    })
    return(
        <div id="notes">
            <ul id="note-list">
                {showNotes}
            </ul>
        </div>
    )

}

const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        notes: state.notes
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        deleteNote: (id) => { dispatch( { type: 'DELETE_NOTE', id: id} ) }, 
        editNote: (text, id) => { dispatch( { type: 'EDIT_NOTE', note: text, id: id} ) }, 
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(NoteList);