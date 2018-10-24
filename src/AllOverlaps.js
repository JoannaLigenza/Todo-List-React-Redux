import React from 'react';
import Desktop from './components/Desktop.js';
import TasksFilter from './components/TasksFilter.js';
import NotesFilter from './components/NotesFilter.js';

const AllOverlaps = ( {overlaps, toggleVisibility, overlapDescription} ) => {
    
    const overlap = overlaps.map( overlap => {
        const chooseOverlap = ( (id) => {
            if( id === 1) {
                return <Desktop />
            }
            if( id === 2) {
                return <TasksFilter />
            }
            if( id === 3) {
                return <NotesFilter />
            }
        })
        return (
        <div className="overlap" key={overlap.id} onClick={() => {toggleVisibility(overlap.visibility, overlap.id)} } >
            <h2 className="ovlp-title" >{overlap.title}</h2>
            <div className="ovlp-descr" className={overlap.visibility ? ("visible") : ("hidden") } >
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

export default AllOverlaps;