import React, {Component} from 'react';
import AllOverlaps from './AllOverlaps.js';

class Menu extends Component {
    state = {
        overlaps: [
            { id: 1, title: "Desktop", description: "", visibility: false },
            { id: 2, title: "AllTasks", description: "", visibility: false },
            { id: 3, title: "AllNotes", description: "", visibility: false },
        ],
        component: "sos"
    }

    toggleVisibility = (visibility, id) => {
        this.props.loadOverlap(id);
        const style = this.state.overlaps.map( style => {
            if (style.id === id) {
                if (style.visibility === visibility) {
                    style.visibility = !visibility
                    return style.visibility
                }
                if (style.visibility !== visibility) {
                    style.visibility = visibility
                    return style.visibility
                }
            }
            if (style.id !== id) {
                if (style.visibility === true) {
                    style.visibility = false
                    return style.visibility
                }
            }
        }) 
        this.setState( {style: style})
    }

    render() {
        return(
            <div className="menu-container">
                <h4>Menu</h4>
                <AllOverlaps overlaps={this.state.overlaps} toggleVisibility={this.toggleVisibility} />
            </div>
        )
    }
}

export default Menu;