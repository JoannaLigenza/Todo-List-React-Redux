import React, {Component} from 'react';
import Menu from './Menu.js';
import TaskArea from './TaskArea.js';
import NoteArea from './NoteArea.js';

class Main extends Component {
    state = {
        overlap: [ 
             <div key={0}>
                <TaskArea />
                <NoteArea />
            </div>
            ]
    }
    
    loadOverlap = (id) => {
        const overlap = this.state.overlap.map( ov => {
            if( id === 1) {
            //console.log("jeden ", id)
            ov =  <div>
                <TaskArea />
                <NoteArea />
            </div>
            }
            if( id === 2) {
            //    console.log("dwa ", id)
             ov = <TaskArea />
            }
            if( id === 3) {
            //    console.log("trzy ", id)
             ov = <TaskArea />
            }
            if( id === 4) {
            //    console.log("cztery ", id)
             ov =<NoteArea /> 
            }
            return ov 
        })
        this.setState( {overlap: overlap } )
        // console.log("overlap " ,overlap)
        // console.log("state: " ,this.state.overlap)
    }

    filterTaskModuleToTaskArea = (filterName) => {
        console.log("cos3")
        console.log("filterName ", filterName)
        //return filterName
        //filter task here 
    }

    render() {
        return (
            <div id="main">
                <div id="menu">
                    <Menu loadOverlap={this.loadOverlap} filter={this.filterTaskModuleToTaskArea}/>
                </div>
                <div id="tasks">
                    {this.state.overlap}
                </div>
            </div>
        )
    }
}

export default Main;