import React, {Component} from 'react';
import { connect } from 'react-redux';
import AddList from './Add-list.js';

class AddNoteDiv extends Component {
    render() {
        return (              
            <div className={this.props.addListArea ? ("add-list-div-visible") : ("add-list-div-hidden")} >                
                <AddList />
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addListArea: state.addListArea
    }
}

export default connect(mapStateToProps)(AddNoteDiv) ;