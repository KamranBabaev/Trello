import React, {ChangeEvent} from 'react';
import {FilteredValuesType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type PropsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilteredValuesType
    changeTodoListFilter: (filterValue: FilteredValuesType, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: PropsTodoListType) {
    const tasksJSXElements = props.tasks.map(task => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
        const removeTask = () => props.removeTask(task.id, props.todoListID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListID)
        return (
            <li key={task.id}>
                <span className={task.isDone ? "is-done" : ""}>
                    <Checkbox
                    size={"small"}
                    color={"primary"}
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton onClick={removeTask} size={"small"} style={{color: 'black'}}>
                    <Delete/>
                </IconButton>
            </li>
        )
    });

    //Filters
    const onClickSetAllFilter = () => {
        props.changeTodoListFilter("all", props.todoListID)
    }
    const onClickSetActiveFilter = () => {
        props.changeTodoListFilter("active", props.todoListID)
    }
    const onClickSetCompletedFilter = () => {
        props.changeTodoListFilter("completed", props.todoListID)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.todoListID)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    return (
        <div className="TodoList">
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <IconButton onClick={removeTodoList} size={"small"} style={{color: 'black'}}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul style={{listStyle: 'none', paddingLeft: '0', alignContent: 'flex-start'}}>
                    {tasksJSXElements}
                </ul>
                <div>
                    <Button
                        style={{marginLeft: '1px', marginRight: '1px'}}
                        size={"small"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onClickSetAllFilter}>All
                    </Button>
                    <Button
                        style={{marginLeft: '1px', marginRight: '1px'}}
                        size={"small"}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onClickSetActiveFilter}>Active
                    </Button>
                    <Button
                        style={{marginLeft: '1px', marginRight: '1px'}}
                        size={"small"}
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onClickSetCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;