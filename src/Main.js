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
            ],
        showMenu: false
    }
    
    loadOverlap = (id) => {
        const overlap = this.state.overlap.map( ov => {
            if( id === 1) {
            ov =  <div key={1}>
                <TaskArea />
            </div>
            }
            if( id === 2) {
             ov = <TaskArea key={2}/>
            }
            if( id === 3) {
             ov = <TaskArea key={3}/>
            }
            if( id === 4) {
             ov =<TaskArea key={4}/> 
            }
            if( id === 5) {
             ov =<NoteArea key={4}/> 
            }
            return ov 
        })
        this.setState( {overlap: overlap } )
    }

    toggleMobileMenu = (e) => {
        this.setState({ showMenu: !this.state.showMenu })
        console.log("klikniety")
    }

    render() {
        return (
            <div id="main">
                <div id="menu">
                    <div id="mobile-menu-button" onClick={this.toggleMobileMenu}> 
                        <div className="menu-line" style={{display: this.state.showMenu ? "none" : "block" }}></div>
                        <div className="menu-line" style={{display: this.state.showMenu ? "none" : "block" }}></div>
                        <div className="menu-line" style={{display: this.state.showMenu ? "none" : "block" }}></div>
                        <div className="menu-X-1" style={{display: this.state.showMenu ? "block" : "none" }}></div>
                        <div className="menu-X-2" style={{display: this.state.showMenu ? "block" : "none" }}></div>
                    </div>
                    <Menu loadOverlap={this.loadOverlap} showMenu={this.state.showMenu}/>
                </div>
                <div id="tasks">
                    {this.state.overlap}
                </div>
            </div>
        )
    }
}

export default Main;