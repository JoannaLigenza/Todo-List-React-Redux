const initState = {
    addTaskArea: false,
    tasks: [
        {task: "task 1", id: 1, style: {textDecoration: "none"}, checked: false, list: "Private", date: "", time: "", priority: "fast", color: "orange", },
        {task: "task 2", id: 2, style: {textDecoration: "none"}, checked: false, list: "Work", date: "", time: "", priority: "",}, 
        {task: "task 3", id: 3, style: {textDecoration: "none"}, checked: false, list: "Work", date: "", time: "", priority: "",}, 
        {task: "task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4 task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4 task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4 task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4", id: 4, style: {textDecoration: "none"}, checked: false, list: "Private", date: "", time: "", priority: "",},
        ], 
    lists: [
        {list: "Default", id: 1},
        {list: "Private", id: 2},
        {list: "Work", id: 3} 
    ],
    notes: [ 
            {note: "Sample note", id: 1},
        ],
    overlaps: [
            { id: 1, title: "Desktop", description: "", visibility: false },
            { id: 2, title: "AllTasks", description: "", visibility: false },
            { id: 3, title: "AllNotes", description: "", visibility: false },
        ],
}

const rootReducer = (state = initState, action) => {
    console.log("action: ", action)
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
    if (action.type === 'CHANGE_TASK_STYLE') {
        let newPosts = state.tasks.filter( post => {
            if (post.id === action.id) {
                if (action.checked) {
                    console.log("checked ", action.checked);
                    post.style = {textDecoration: "line-through"}
                    post.checked = true 
                }
                if (!action.checked) {
                    console.log("checked ", action.checked);
                    post.style = {textDecoration: "none"}
                    post.checked = false
                }
                console.log(post.checked)
                console.log("state: ", state.tasks)
            }
            return [post.style, post.checked]
        })
        return {
            ...state, 
            tasks: [...state.tasks: newPosts]
        }
    }
    if (action.type === 'EDIT_TASK') {
        const newTask = state.tasks.map( task => {
            if (task.id === action.id) {
               task.task = action.task;
            }
            return task.task
        })
        return {
            ...state, 
            tasks: [...state.tasks: newTask]
        }
    }

    if (action.type === 'ADD_NOTE') {
        console.log("action note" , action.note)
        return {
            ...state, 
            notes: [...state.notes, action.note]
        }
    }  
    if (action.type === 'DELETE_NOTE') {
        console.log("action id:" , action.id)
        let newNotes = state.notes.filter( note => {
            return note.id !== action.id
        })
        return {
            ...state, 
            notes: newNotes
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
    if (action.type === 'EDIT_NOTE') {
        const newNote = state.notes.map( note => {
            if (note.id === action.id) {
                note.note = action.note;
            }
            return note.note
        })
        return {
            ...state, 
            notes: [...state.notes: newNote]
        }
    }
    if (action.type === 'TOGGLE_VISIBILITY') {
        const visible = state.overlaps.map( visible => {
            if (visible.id === action.id) {
                if (visible.visibility === action.visibility) {
                    visible.visibility = !action.visibility
                    return visible.visibility
                }
                if (visible.visibility !== action.visibility) {
                    visible.visibility = action.visibility
                    return visible.visibility
                }
            }
            if (visible.id !== action.id) {
                if (visible.visibility === true) {
                    visible.visibility = false
                }
                // return visible.visibility
            }
            return visible.visibility
        }) 
        return {
                ...state, 
                overlaps: [...state.overlaps: visible]
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

    return state;
}

export default rootReducer;