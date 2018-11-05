import React, {Component} from 'react';
import AllOverlaps from './AllOverlaps.js';

class Menu extends Component {
    displayOverlap = (id) => {
        this.props.loadOverlap(id);
    }

    render() {
        return(
            <div id="menu-container">
                <h4>Menu</h4>
                <AllOverlaps displayOverlap={this.displayOverlap} />
            </div>
        )
    }
}

export default Menu;