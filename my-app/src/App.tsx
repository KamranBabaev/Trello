import React, {useState} from "react";
import {Todolist, ValuePropsType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const App = () => {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'ok', isDone: false},
        {id: v1(), title: 'ok', isDone: false},
        {id: v1(), title: 'ok', isDone: false},
    ])
    let [filter, setFilter] = useState<ValuePropsType>('all')

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: ValuePropsType) => {
        setFilter(value)
    }

    const addNewTask = (title: string) => {
        let task = {id: v1(), title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    } if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    return (
        <div className='App-wrapper'>
            <Todolist
                tasks={tasksForTodolist}
                title='start'
                removeTask={removeTask}
                changeFilter={changeFilter}
                addNewTask={addNewTask}
            />
        </div>
    )
}