const initState = {
    addTaskArea: false,
    addListArea: false,
    // addEditTaskArea: false,
    // editTask: {},
    tasks: [
        {task: "Sample task", id: 1, checked: false, edit: false, list: "Default", date: "", priority: "Low", color: "yellow", moveTaskStyle: false},
        ], 
    id: {taskId: 3, listId: 4, noteId: 2},
    lists: [
        {list: "Default", id: 1, nameRepeat: false, color: "default"},
        {list: "Private", id: 2, nameRepeat: false, color: "default"},
        {list: "Work", id: 3, nameRepeat: false, color: "default"},
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
            { id: 2, title: "Date", description: "", visibility: false, style: {border: "none"}},
            { id: 3, title: "Priority", description: "", visibility: false, style: {border: "none"} },
            { id: 4, title: "Lists", description: "", visibility: false, style: {border: "none"} },
            { id: 5, title: "Notes", description: "", visibility: false, style: {border: "none"} },
        ],
    filter: 
        {list: "Default", priority: "All", searchText: "", date: ""}
    
}

const rootReducer = (state = initState, action) => {
    // this merge state from localStorage and store
    if (!state.hydrated) {
        state = { ...initState, ...state, hydrated: true };
    }
    if (action.type === 'ADD_TASK') {
        return {
            ...state, 
            tasks: [...state.tasks, action.task], 
            id: {...state.id, taskId: state.id.taskId + 1}
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
            lists: [...state.lists, action.list], 
            id: {...state.id, listId: state.id.listId + 1}
        }
    }  
    if (action.type === 'DELETE_LIST') {
        let newLists = state.lists.filter( list => {
            if(action.list === "Default") {
                return list
            }
            return list.list !== action.list
        })
        let newTasks = state.tasks.map( task => {
            if(task.list === action.list) {
                task.list = "Default"
            }
            return task
        })
        return {
            ...state, 
            tasks: newTasks, lists: newLists
        }
    }
    if (action.type === 'ADD_NOTE') {
        return {
            ...state, 
            notes: [...state.notes, action.note], id: {...state.id, noteId: state.id.noteId + 1}
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
        const visible = state.overlaps.map( (overlap, index) => {
            if (overlap.id === action.id) {
                overlap.visibility = !overlap.visibility
            }
            if (index === 0 && action.id !== 1) {
                overlap.visibility = false;
            }
            if (index === 4 && action.id !== 5) {
                overlap.visibility = false;
            }
            return overlap;
        }) 
        return {
                ...state, 
                overlaps: visible
            }
    }
    if (action.type === 'TOGGLE_COLOR') {
        const setColor = state.lists.map( list => {
            if (list.id === action.id) {
                if (list.color === "default") {
                    list.color = "color";
                    return list
                }
                else {
                    list.color = "default"
                    return list
                }
            }
            if (list.id !== action.id) {
                list.color = "default"
            }
            return list
        }) 
        return {
                ...state, 
                lists: setColor
            }
    }
    if (action.type === 'SHOW_ADD_TASK_AREA') {
        return {
            ...state, 
            addTaskArea: true
        }
    }
    if (action.type === 'HIDE_ADD_TASK_AREA') {
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
        return {
            ...state, 
            addListArea: false
        }
    }
    if (action.type === 'FILTER_TASKS') {
        const filter = ( ()  => {
            if (action.filter === "list") {
                return  {...state.filter, list: action.value,
                priority: "All", date: "" }
            }
            if (action.filter === "priority") {
                return {...state.filter, list: "Default",
                priority: action.value, date: "" }
            }
            if (action.filter === "date") {
                return {...state.filter, list: "Default",
                priority: "All", date: [action.value, action.endValue, action.day, action.string] }
            }
            if (action.filter === "none") {
                return {list: "Default",
                priority: "All", searchText: "", date: "" }
            }
        });
        const lists = state.lists.map( list => {
            list.color = "default";
            return list;
        })
        return {
            ...state, 
            filter: filter(), lists: lists
        }
    }
    if (action.type === 'SEARCH') {
        return {
            ...state,
            filter: {...state.filter, searchText:  action.searchText}
        }
    }
    if (action.type === 'CHANGE_TASKS_ORDER') {
        return {
            ...state, 
            tasks: action.newOrder
        }
    }
    return state;
}

export default rootReducer;