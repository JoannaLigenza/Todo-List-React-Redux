import React, {Component} from 'react';
import AddTask from './Add-task.js';
import TaskList from './TaskList.js';

class TaskArea extends Component {
    state = {
        tasks: [
        {task: "task 1", id: 1, style: {textDecoration: "none"}},
        {task: "task 2", id: 2, style: {textDecoration: "none"}}, 
        {task: "task 3", id: 3, style: {textDecoration: "none"}}, 
        {task: "task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4 task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4 task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4 task 4 task 4 task 4 task 4 task 4 task 4task 4 task 4", id: 4, style: {textDecoration: "none"}},
        ]
    }

    addTask = (task) => {
        //console.log(task);
        let tasks = [...this.state.tasks, task];
        this.setState( { tasks: tasks});
    }

    deleteTask = (id) => {
        //console.log("id: " ,id)
        const task = this.state.tasks.filter( task => {
            return task.id !== id
        })
        this.setState( {tasks: task} )
    }

    editTask = (innerText, id) => {
        console.log("inner: " , innerText)
        console.log("id: " , id)
        const newTask = this.state.tasks.map( task => {
            if (task.id === id) {
                task.task = innerText;
            }
            return task
        })
        this.setState( {tasks: newTask} )
        console.log("state: " ,this.state.tasks)
    }

    changeStyle = (checked, id) => {
        const taskStyle = this.state.tasks.map( task => {
            if (task.id === id) {
                if (checked) {
                    //console.log("checked ", checked);
                    task.style = {textDecoration: "line-through"}
                }
                if (!checked) {
                    //console.log("checked ", checked);
                    task.style = {textDecoration: "none"}
                }
                return task.style
            }
        })
        this.setState( {style: taskStyle} )
    }

    render() {
        return (
            <div className="task-area">
                <h4>Task Area:</h4>
                <AddTask addTask={this.addTask}/>
                <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} editTask={this.editTask} changeStyle={this.changeStyle}/>
            </div>
        )
    }
}

export default TaskArea;