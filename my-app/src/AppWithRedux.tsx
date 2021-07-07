import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilteredValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilteredValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    //BLL

    //useSelector - getting data from store
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    //useDispatch - getting dispatch from store
    const dispatch = useDispatch()

    //todolist actions
    function changeTodoListFilter(filter: FilteredValuesType, todoListID: string) {
        let action = changeTodoListFilterAC(filter, todoListID)
        dispatch(action)
    }
    function removeTodoList(todoListID: string) {
        let action = removeTodoListAC(todoListID)
        dispatch(action)
    }
    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatch(action)
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        let action = changeTodoListTitleAC(title, todoListID)
        dispatch(action)
    }

    //task actions
    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }
    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    function changeTaskStatus(taskId: string, isDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListID))
    }
    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskId, title, todoListID))
    }

    //UI
    function getFilteredTasks(tl: TodoListType) {
        switch (tl.filter) {
            case "active":
                return tasks[tl.id].filter(t => !t.isDone)
            case "completed":
                return tasks[tl.id].filter(t => t.isDone)
            default:
                return tasks[tl.id]
        }
    }

    //variable for todolist jsx
    const todoListComponents = todoLists.map(tl => {
        const tasksForTodoList = getFilteredTasks(tl)
        return (
            <Grid item xs={3} key={tl.id} style={{textAlign: 'center', wordBreak: 'break-word'}}>
                <Paper elevation={5} style={{padding: '5px'}}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button
                        color={"inherit"}
                        variant={"outlined"}
                    >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0 10px 0'}} justify={"center"}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
