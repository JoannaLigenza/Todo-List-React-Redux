import React, {Component} from 'react';
import AllOverlaps from './AllOverlaps.js';

class Menu extends Component {
    render() {
        return(
            <div className="menu-container">
                <h4>Menu</h4>
                <AllOverlaps />
            </div>
        )
    }
}

export default Menu;