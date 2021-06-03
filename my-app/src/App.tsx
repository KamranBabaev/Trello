import React, {useState} from "react";
import {Todolist, ValuePropsType} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import './App.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: ValuePropsType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'first?', filter: 'all'},
        {id: todolistID2, title: 'second?', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'first', isDone: false},
            {id: v1(), title: 'first', isDone: false},
            {id: v1(), title: 'first', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'second', isDone: false},
            {id: v1(), title: 'second', isDone: false},
            {id: v1(), title: 'second', isDone: false},
        ]
    })


    const removeTask = (id: string, todolistID: string) => {
        let copyTasks = tasks[todolistID]
        tasks[todolistID] = copyTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const addNewTask = (title: string, todolistID: string) => {
        debugger
        let task = {id: v1(), title: title, isDone: false}
        let copyTasks = tasks[todolistID]
        tasks[todolistID] = [task, ...copyTasks]
        debugger
        setTasks({...tasks})
    }

    const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
        let copyTasks = tasks[todolistID]
        let task = copyTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeFilter = (value: ValuePropsType, todolistID: string) => {
        let todolist = todolists.find(td => td.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(td => td.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(), filter: "all", title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    return (
        <div className='App-wrapper'>

            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(td => {
                    let tasksForTodolist = tasks[td.id];
                    if (td.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    if (td.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }

                    return <Todolist
                        key={td.id}
                        id={td.id}
                        title={td.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addNewTask={addNewTask}
                        changeStatus={changeStatus}
                        filter={td.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    )
}