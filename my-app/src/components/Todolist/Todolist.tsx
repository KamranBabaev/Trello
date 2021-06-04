import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskType} from "../../App";
import style from './Todolist.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

export type ValuePropsType = 'all' | 'active' | 'completed'

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: ValuePropsType, todolistID: string) => void
    addNewTask: (title: string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTitle: (id: string, newTitle: string, todolistID: string) => void
    filter: ValuePropsType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (title: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = () => props.removeTodolist(props.id)
    const onClickAll = () => props.changeFilter("all", props.id)
    const onClickActive = () => props.changeFilter("active", props.id)
    const onClickCompleted = () => props.changeFilter("completed", props.id)
    const addTask = (title: string) => {
        props.addNewTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return <div className={style.todolists}>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>

        <AddItemForm addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickRemoveTask = () => props.removeTask(t.id, props.id)
                    const onChangeStatusTask = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }
                    const onChangeTitleTask = (newValue: string) => {
                        props.changeTitle(t.id, newValue, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? 'is_Done' : ''}>
                        <input type='checkbox' onChange={onChangeStatusTask} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleTask}
                        />
                        <button onClick={onClickRemoveTask}>x</button>
                    </li>
                })}
        </ul>
        <div>
            <button onClick={onClickAll}
                    className={props.filter === 'all' ? 'active_filter' : ''}>все
            </button>
            <button onClick={onClickActive}
                    className={props.filter === 'active' ? 'active_filter' : ''}>активные
            </button>
            <button onClick={onClickCompleted}
                    className={props.filter === 'completed' ? 'active_filter' : ''}>выполненные
            </button>
        </div>
    </div>
}