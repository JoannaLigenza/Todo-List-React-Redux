import React, { Component } from 'react';

class AddNote extends Component {
    state = {
        note: "Add some note here", id: 2
    }
    handleChange = (e) => {
        this.setState( {note: e.target.value} );
    }
    handleClick = (e) => {
        //console.log("dodj")
        e.preventDefault();
        let id = this.state.id + 1
        this.setState( {id: id} );
        this.props.addNote(this.state);
        this.setState( {note: ""} )
    }
     render() {
        return(
            <div id="add-note">
                <textarea className="textarea" value={this.state.note} onChange={this.handleChange}></textarea>
                <button className="button-to-input" onClick={this.handleClick}>Add Note</button>
            </div>
            
        )
    }
}

export default AddNote;