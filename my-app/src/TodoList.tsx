import React, {ChangeEvent} from "react";
import {TaskType} from "../../App";
import styles from './Todolist.module.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type FilterValuesType = 'ALL' | 'ACTIVE' | 'DONE'

export type TodolistPropsType = {
    tasks: Array<TaskType>
    title: string
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, value: string, todolistID: string) => void
    changeTodolistTitle: (id: string, value: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (value: string) => {
        props.changeTodolistTitle(props.id, value)
    }

    const onClickAll = () => props.changeFilter(props.id, 'ALL')
    const onClickActive = () => props.changeFilter(props.id, 'ACTIVE')
    const onClickDone = () => props.changeFilter(props.id, 'DONE')
    const removeTodolist = () => props.removeTodolist(props.id)

    const tasksElements = props.tasks
        .map(t => {
            const onClickHandler = () => props.removeTask(t.id, props.id)
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(t.id, e.currentTarget.checked, props.id)
            }
            const onChangeTaskTitleHandler = (value: string) => {
                props.changeTaskTitle(t.id, value, props.id)
            }

            return <div key={t.id} className={styles.tasksBlock}>
                <Checkbox onChange={onChangeStatusHandler}
                          checked={t.isDone}
                />
                <EditableSpan title={t.title}
                              onChange={onChangeTaskTitleHandler}
                />
                <Button onClick={onClickHandler}
                        variant="contained"
                        color="primary"
                        size="small">x</Button>
            </div>
        })

    return (
        <div className={styles.todolists}>
            <p>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </p>

            <AddItemForm addItem={addTask}/>

            <div>
                {tasksElements}
            </div>

            <div className={styles.filterBTN}>
                <Button onClick={onClickAll}
                        variant={props.filter === 'ALL' ? "contained" : "outlined"}>all</Button>
                <Button onClick={onClickActive}
                        variant={props.filter === 'ACTIVE' ? "contained" : "outlined"}>active</Button>
                <Button onClick={onClickDone}
                        variant={props.filter === 'DONE' ? "contained" : "outlined"}>done</Button>
            </div>
        </div>
    )
}

