import React, {useReducer, useState} from "react";
import {FilterPropsType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import './App.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterActionCreator,
    ChangeTodolistTitleActionCreator, RemoveTodolistActionCreator,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TodolistType = {
    id: string
    title: string
    filter: FilterPropsType
}

export const AppWithReducers = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'first?', filter: 'all'},
        {id: todolistID2, title: 'second?', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        const action = removeTaskAC(id, todolistID)
        dispatchTasks(action)
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const action = ChangeTodolistTitleActionCreator(id, newTitle)
        dispatchTodolists(action)
    }

    const addNewTask = (title: string, todolistID: string) => {
        const action = addTaskAC(title, todolistID)
        dispatchTasks(action)
    }

    const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistID)
        dispatchTasks(action)
    }

    const changeTitle = (id: string, newTitle: string, todolistID: string) => {
        dispatchTasks(changeTaskTitleAC(id, todolistID, newTitle))
    }

    const changeFilter = (filter: FilterPropsType, todolistID: string) => {
        const action = ChangeTodolistFilterActionCreator(filter, todolistID)
        dispatchTodolists(action)
    }

    const removeTodolist = (id: string) => {
        const action = RemoveTodolistActionCreator(id)
        dispatchTodolists(action)
    }

    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchTasks(action)
        dispatchTodolists(action)
    }


    return (
        <div className='App-wrapper'>

            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography>
                        news
                    </Typography>
                    <Button color={"inherit"}>login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "25px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todolists.map(td => {
                            let tasksForTodolist = tasks[td.id];
                            if (td.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }
                            if (td.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }

                            return <Grid item style={{margin: "10px"}}>
                                <Paper style={{padding: "20px"}}>
                                    <Todolist
                                        key={td.id}
                                        id={td.id}
                                        title={td.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addNewTask={addNewTask}
                                        changeStatus={changeStatus}
                                        changeTitle={changeTitle}
                                        filter={td.filter}
                                        removeTodolist={removeTodolist}
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