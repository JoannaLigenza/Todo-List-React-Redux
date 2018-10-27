
import { connect } from 'react-redux';

const FilteredTasks = ( {tasks, filter} ) => {
    const filtering = tasks.map( task => {
        if (filter.list === "Default") {
            return task
        }
        if (filter.list !== "Default") {
            if (task.list === filter.list) {
                return task
            }
        }
    }) 
    console.log("filtering ", filtering)
    return filtering
}


const mapStateToProps = (state) => {           
    return {
        tasks: state.tasks,
        filter: state.filter
    }
}

export default connect(mapStateToProps)(FilteredTasks);