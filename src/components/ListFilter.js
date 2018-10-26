import React from 'react';

// props:filter is from AllOverlaps
const ListFilter = ( {filter} ) => {
    const filterTaskModuleToAllOverlaps = (filterName) => {
        console.log("filter by: ", filterName);
        filter(filterName);
    }
    return(
        <p className="ovlp-descr-p">
            <div id="list-filter" onClick={ () => {filterTaskModuleToAllOverlaps("listFilter")} }></div>
            <div id="date-filter" onClick={ () => {filterTaskModuleToAllOverlaps("dateFilter")} }></div>

        </p>
    )
}

export default ListFilter;