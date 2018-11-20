import React, {Component} from 'react';
import Menu from './Menu.js';
import TaskArea from './TaskArea.js';
import NoteArea from './NoteArea.js';

class Main extends Component {
    state = {
        overlap: [ 
             <div key={0}>
                <TaskArea />
            </div>
            ]
    }
    
    loadOverlap = (id) => {
        const overlap = this.state.overlap.map( ov => {
            if( id === 1) {
            //console.log("jeden ", id)
            ov =  <div key={1}>
                <TaskArea />
            </div>
            }
            if( id === 2) {
            //    console.log("dwa ", id)
             ov = <TaskArea key={2}/>
            }
            if( id === 3) {
            //    console.log("trzy ", id)
             ov = <TaskArea key={3}/>
            }
            if( id === 4) {
            //    console.log("cztery ", id)
             ov =<NoteArea key={4}/> 
            }
            return ov 
        })
        this.setState( {overlap: overlap } )
        // console.log("overlap " ,overlap)
        // console.log("state: " ,this.state.overlap)
    }

    render() {
        return (
            <div id="main">
                <div id="menu">
                    <Menu loadOverlap={this.loadOverlap} />
                </div>
                <div id="tasks">
                    {this.state.overlap}
                </div>
            </div>
        )
    }
}

export default Main;