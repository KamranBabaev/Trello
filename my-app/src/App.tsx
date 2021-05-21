import React, {useState} from "react";
import './App.css'
import Todolist, {ValuePropsType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

const App = () => {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Node', isDone: false},
    ])
    let [filter, setFilter] = useState<ValuePropsType>('все')

    //
    const removeTask = (taskID: string) => {
        let filteredTask = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTask)
    }

    const tasksForTodolist = () => {
        switch (filter) {
            case 'активные':
                return tasks.filter(t => !t.isDone)
            case 'выполненные':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const changeFilterTasks = (value: ValuePropsType) => {
        setFilter(value)
    }

    const addNewTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    const changeCheckedStatus = (idTask: string, isDone: boolean) => {
        let task = tasks.find( t => t.id === idTask)
        if (task) {
            task.isDone = isDone
        }
        let copyTasks = [...tasks]
        setTasks(copyTasks)
    }


    return (
        <div className='App-wrapper'>
            <Todolist
                title='Что будем учить?'
                tasks={tasksForTodolist()}
                removeTask={removeTask}
                changeFilterTasks={changeFilterTasks}
                addNewTask={addNewTask}
                changeCheckedStatus={changeCheckedStatus}
                filter={filter}
            />
        </div>
    )
}

export default App;