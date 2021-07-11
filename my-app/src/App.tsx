import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Backdrop, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'План обучения на сегодня', filter: 'ALL'},
        {id: todolistID2, title: 'Список покупок', filter: 'ALL'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'конфеты', isDone: false},
            {id: v1(), title: 'молоко', isDone: false},
            {id: v1(), title: 'хлеб', isDone: false},
        ]
    })

    const removeTask = (id: string, todolistID: string) => {
        let tasksCopy = tasks[todolistID]
        tasks[todolistID] = tasksCopy.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistID: string) => {
        let newTask = {id: v1(), title, isDone: false}
        let tasksCopy = tasks[todolistID]
        tasks[todolistID] = [newTask, ...tasksCopy]
        setTasks({...tasks})
    }

    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
        let task = tasks[todolistID].find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const removeTodolist = (todolistID: string) => {
        let todolistCopy = todolists.filter(tl => tl.id !== todolistID)
        setTodolists(todolistCopy)
        delete tasks[todolistID]
        setTasks(tasks)
    }

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "ALL",
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    const changeTaskTitle = (id: string, value: string, todolistID: string) => {
        let task = tasks[todolistID].find(t => t.id === id)
        if (task) {
            task.title = value
            setTasks({...tasks})
        }
    }

    const changeTodolistTitle = (id: string, value: string) => {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = value
            setTodolists([...todolists])
        }
    }

    return (
        <div className='appWrapper'>
            <AppBar position="static">
                <Toolbar className='header'>
                    <IconButton edge="start" color="inherit" aria-label="меню">
                        <Menu/>
                    </IconButton>

                    <Typography variant="h5">
                        TODOLIST
                    </Typography>

                    <Button color="inherit">LOGIN</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === 'ACTIVE') {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'DONE') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }

                            return <Grid item>
                                <Paper elevation={7} style={{padding: '20px', border: '2px solid gray'}}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              tasks={tasksForTodolist}
                                              title={tl.title}
                                              filter={tl.filter}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeStatus={changeStatus}
                                              removeTodolist={removeTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>

        </div>
    )
}

export default App;
