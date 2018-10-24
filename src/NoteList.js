import React from 'react';

const NoteList = ( {notes, deleteNote, editNote} ) => {
    const showNotes = notes.map( (note) => {
        return <li className="one-note" key={note.id}>
            <p className="note-text" contentEditable="true" onBlur={ (e) => {editNote(e.target.innerText, note.id)} }>{note.note}</p>
            <button className="delete-note-button" onClick={ () => {deleteNote(note.id)} }>X</button></li>
    })
    return(
        <div id="notes">
            <ul id="note-list">
                {showNotes}
            </ul>
        </div>
    )

}

export default NoteList;