const initState = {
    addTaskArea: false,
    addListArea: false,
    // addEditTaskArea: false,
    // editTask: {},
    tasks: [
        {task: "task 1", id: 1, checked: false, edit: false, list: "Default", date: "2018-10-30", time: "", priority: "Low", color: "yellow", moveTaskStyle: false},
        {task: "task 2", id: 2, checked: false, edit: false, list: "Work", date: "2018-11-02", time: "", priority: "High", color: "red", moveTaskStyle: false}, 
        {task: "task 3", id: 3, checked: false, edit: false, list: "", date: "2018-10-15", time: "", priority: "Low", color: "yellow", moveTaskStyle: false}, 
        {task: "task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4 task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4 task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4 task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4", id: 4, checked: false, edit: false, list: "Private", date: "2018-11-02", time: "", priority: "", moveTaskStyle: false},
        ], 
    lists: [
        {list: "Default", id: 1, nameRepeat: false},
        {list: "Private", id: 2, nameRepeat: false},
        {list: "Work", id: 3, nameRepeat: false},
    ],
    priorities: [
        {priority: "All", id: 1},
        {priority: "Low", id: 2},
        {priority: "Middle", id: 3},
        {priority: "High", id: 4},
    ],
    notes: [ 
            {note: "Sample note", id: 1},
        ],
    overlaps: [
            { id: 1, title: "Tasks", description: "", visibility: false, style: {border: "none"} },
            { id: 2, title: "Filter", description: "", visibility: false, style: {border: "none"}},
            { id: 3, title: "Lists", description: "", visibility: false, style: {border: "none"} },
            { id: 4, title: "Notes", description: "", visibility: false, style: {border: "none"} },
        ],
    filter: 
        {list: "Default", priority: "All", searchText: ""}
    
}

const rootReducer = (state = initState, action) => {
    console.log("store ", state.filter)
    if (action.type === 'ADD_TASK') {
        return {
            ...state, 
            tasks: [...state.tasks, action.task]
        }
    }  
    if (action.type === 'DELETE_TASK') {
        let newPosts = state.tasks.filter( post => {
            return post.id !== action.id
        })
        return {
            ...state, 
            tasks: newPosts
        }
    }
    if (action.type === 'DELETE_All_TASKS') {
        let newPosts = state.tasks.filter( post => {
            return post.checked === false
        })
        return {
            ...state, 
            tasks: newPosts
        }
    }
    if (action.type === 'CHANGE_TASK_STYLE') {
        let newTask = state.tasks.filter( task => {
            if (task.id === action.id) {
                if (action.checked) {
                    task.checked = true 
                }
                if (!action.checked) {
                    task.checked = false
                }
            }
            return  task
        })
        return {
            ...state, 
            tasks: newTask
        }
    }
    if (action.type === 'CHANGE_TASK_STYLE') {
        //console.log("tasks: ", state.tasks)
        return {
            ...state, 
            tasks: action.tasks
        }
    }
    if (action.type === 'SHOW_EDIT_TASK') {
        const newTask = state.tasks.map( task => {
            if (task.id === action.id) {
                if (task.edit === false) {
                    task.edit = true;
                    return task
                }
                if (task.edit === true) {
                    task.edit = false;
                }
            }
            return task
        })
        return {
            ...state, 
            tasks: newTask
        }
    }
    if (action.type === 'EDIT_TASK') {
        const newTask = state.tasks.map( task => {
            if (task.id === action.task.id) {
               task = action.task;
            }
            //console.log("task ", task)
            return task
        })
        return {
            ...state, 
            tasks: newTask
        }
    }
    if (action.type === 'ADD_LIST') {
        return {
            ...state, 
            lists: [...state.lists, action.list]
        }
    }  
    if (action.type === 'DELETE_LIST') {
        let newPosts = state.lists.filter( list => {
                return list.list !== action.list
        })
        return {
            ...state, 
            lists: newPosts
        }
    }
    // if (action.type === 'EDIT_LIST') {
    //     const newList = state.lists.map( list => {
    //         if (list.id === action.id) {
    //            list.list = action.list;
    //         }
    //         return list
    //     })
    //     return {
    //         ...state, 
    //         lists: newList
    //     }
    // }

    if (action.type === 'ADD_NOTE') {
        return {
            ...state, 
            notes: [...state.notes, action.note]
        }
    }  
    if (action.type === 'DELETE_NOTE') {
        let newNotes = state.notes.filter( note => {
            return note.id !== action.id
        })
        return {
            ...state, 
            notes: newNotes
        }
    }
    if (action.type === 'EDIT_NOTE') {
        const newNote = state.notes.map( note => {
            if (note.id === action.id) {
                note.note = action.note;
            }
            return note
        })
        return {
            ...state, 
            notes: newNote
        }
    }
    if (action.type === 'TOGGLE_VISIBILITY') {
        const visible = state.overlaps.map( overlap => {
            if (overlap.id === action.id) {
                if (overlap.visibility === action.visibility) {
                    overlap.visibility = !action.visibility
                    return overlap
                }
                if (overlap.visibility !== action.visibility) {
                    overlap.visibility = action.visibility
                    return overlap
                }
            }
            if (overlap.id !== action.id) {
                if (overlap.visibility === true) {
                    overlap.visibility = false
                }
                // return visible.visibility
            }
            return overlap
        }) 
        return {
                ...state, 
                overlaps: visible
            }
    }
    if (action.type === 'SHOW_ADD_TASK_AREA') {
        return {
            ...state, 
            addTaskArea: true
        }
    }
    if (action.type === 'HIDE_ADD_TASK_AREA') {
        console.log("ukryj")
        return {
            ...state, 
            addTaskArea: false
        }
    }
    if (action.type === 'SHOW_ADD_LIST_AREA') {
        return {
            ...state, 
            addListArea: true
        }
    }
    if (action.type === 'HIDE_ADD_LIST_AREA') {
        console.log("ukryj")
        return {
            ...state, 
            addListArea: false
        }
    }
    if (action.type === 'FILTER_TASKS') {
        //console.log("store ", state.filter)
       // console.log("checked ", state.filter.checked)
        const filter = ( ()  => {
            if (action.filter === "list") {
                return  {...state.filter, list: action.value,
                priority: "All" }
            }
            if (action.filter === "priority") {
                return {...state.filter, list: "Default",
                priority: action.value }
            }
            if (action.filter === "none") {
                return {list: "Default",
                priority: "All", searchText: "" }
            }
        })
        //console.log("state.filter.list ", state.filter.list)
        return {
            ...state, 
            filter: filter()
        }
    }
    if (action.type === 'SEARCH') {
        // console.log("store ", state.filter)
        return {
            ...state,
            filter: {...state.filter, searchText:  action.searchText}
        }
    }
    if (action.type === 'CHANGE_TASKS_ORDER') {
        //console.log("tasks: ", state.tasks)
        //console.log("action.newOrder: ", action.newOrder)
        return {
            ...state, 
            tasks: action.newOrder
        }
    }
    return state;
}

export default rootReducer;