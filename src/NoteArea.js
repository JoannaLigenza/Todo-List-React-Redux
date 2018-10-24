import React, {Component} from 'react';
import AddNote from './AddNote.js';
import NoteList from './NoteList.js';

class NoteArea extends Component {
    state = {
        notes: [ 
            {note: "Sample note", id: 1},
        ]
    }

    addNote = note => {
        let notes = [...this.state.notes, note];
        this.setState( {notes: notes} );
        //console.log(this.state.notes)
    }

    deleteNote = (id) => {
        const notes = this.state.notes.filter( note => {
            return note.id !== id
        })
        this.setState( {notes: notes} )
    }

    editNote = (innerText, id) => {
        console.log("inner: " , innerText)
        console.log("id: " , id)
        const newNote = this.state.notes.map( note => {
            if (note.id === id) {
                note.note = innerText;
            }
            return note
        })
        this.setState( {notes: newNote} )
        console.log("state: " ,this.state.notes)
    }

    render() {
        return (
            <div className="note-area">
                <h4>Note Area:</h4>
                <AddNote addNote={this.addNote}/>
                <NoteList notes={this.state.notes} deleteNote={this.deleteNote} editNote={this.editNote}/>
            </div>
        )
    }
}

export default NoteArea;