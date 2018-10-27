import React from 'react';
import { connect } from 'react-redux';
import Desktop from './components/Desktop.js';
import ListFilter from './components/ListFilter.js';
import NotesFilter from './components/NotesFilter.js';


const AllOverlaps = ( {overlaps, toggleVisibility, displayOverlap} ) => {
    
    const overlap = overlaps.map( overlap => {
        const chooseOverlap = ( (id) => {
            if( id === 1) {
                return <Desktop />
            }
            if( id === 2) {
                return <ListFilter />
            }
            if( id === 3) {
                return <NotesFilter />
            }
        })
        return (
        <div className="overlap" key={overlap.id}  >
            <h2 className="ovlp-title" onClick={() => {toggleVisibility(overlap.visibility, overlap.id); displayOverlap(overlap.id)} }>{overlap.title}</h2>
            <div className={overlap.visibility ? ("visible") : ("hidden") } >
                {chooseOverlap(overlap.id)}
                
                
            </div>
        </div> )
    })
    return(
        <div>
            { overlap }
        </div>
    )
}

const mapStateToProps = (state) => {            // state is form redux store (from imported connect)
    return {
        overlaps: state.overlaps
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        toggleVisibility: (visibility, id) => { dispatch( { type: 'TOGGLE_VISIBILITY', visibility: visibility, id: id} ) }, 
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(AllOverlaps);