import React, {Component} from 'react';
import AllOverlaps from './AllOverlaps.js';

// props:filter is from Main
class Menu extends Component {
    displayOverlap = (id) => {
        this.props.loadOverlap(id);
    }
    filterTaskModuleToMain = (filterName) => {
        console.log("cos2")
        console.log("filterName ", filterName)
        this.props.filter(filterName)
    }

    render() {
        return(
            <div className="menu-container">
                <h4>Menu</h4>
                <AllOverlaps displayOverlap={this.displayOverlap} filter={this.filterTaskModuleToMain} />
            </div>
        )
    }
}

export default Menu;