import React, {useState} from "react";
import './App.css'
import Todolist, {TaskPropsType, FilterPropsType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

type TodolistType = {
    id: string
    title: string
    filter: FilterPropsType
}

type TasksStateType = {
    [key: string]: Array<TaskPropsType>
}

const App = () => {

    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistID_1, title: 'Что будем учить?', filter: 'all'},
            {id: todolistID_2, title: 'Что нужно купить?', filter: 'all'},
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolistID_1]: [
                {id: v1(), title: 'HTML', isDone: false},
                {id: v1(), title: 'CSS', isDone: false},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Node', isDone: false},
            ],
            [todolistID_2]: [
                {id: v1(), title: 'Конфеты', isDone: false},
                {id: v1(), title: 'Рис', isDone: false},
                {id: v1(), title: 'Апельсины', isDone: false},

            ],
        }
    )

    const changeFilterTasks = (filter: FilterPropsType, todolistID: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl))
    }

    const removeTask = (taskID: string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    const addNewTask = (title: string, todolistID: string) => {
        const newTask: TaskPropsType = {
            id: v1(), title: title, isDone: false
        }
        const copyTasks = {...tasks}
        copyTasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks(copyTasks)
    }

    const changeCheckedStatus = (idTask: string, isDone: boolean, todolistID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].map(t => t.id === idTask ? {...t, isDone} : t)
        setTasks(copyTasks)
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        const copyTasks = {...tasks}
        delete tasks[todolistID]
        setTasks(copyTasks)
    }

    const getFilteredTasks = (tl: TodolistType) => {
        switch (tl.filter) {
            case "active":
                return tasks[tl.id].filter(t => t.isDone)
            case "completed":
                return tasks[tl.id].filter(t => t.isDone)
            default:
                return tasks[tl.id]
        }
    }


    const todolistComponents = todolists.map(tl => {
        const tasksForTodolist = getFilteredTasks(tl)

        return (
            <Todolist
                key={tl.id}
                todolistID={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                filter={tl.filter}
                removeTask={removeTask}
                changeFilterTasks={changeFilterTasks}
                addNewTask={addNewTask}
                changeCheckedStatus={changeCheckedStatus}
                removeTodolist={removeTodolist}
            />
        )
    })
    return (
        <div className='App-wrapper'>
            {todolistComponents}
        </div>
    )
}

export default App;