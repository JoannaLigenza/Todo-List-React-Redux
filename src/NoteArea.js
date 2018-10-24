import React, {Component} from 'react';
import AddNote from './AddNote.js';
import NoteList from './NoteList.js';

class NoteArea extends Component {
    render() {
        return (
            <div className="note-area">
                <h4>Note Area:</h4>
                <AddNote />
                <NoteList />
            </div>
        )
    }
}

export default NoteArea;