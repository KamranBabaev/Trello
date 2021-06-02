import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskType} from "../../App";

export type ValuePropsType = 'all' | 'active' | 'completed'

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: ValuePropsType) => void
    addNewTask: (title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('')

    const tasksTSXElements = props.tasks.map(t => {
        const onClickRemoveTask = () => props.removeTask(t.id)

        return (<li key={t.id}>
            return (
            <input type='checkbox' checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickRemoveTask}>x</button>
        </li>)
    })

    const addNewTask = () => {
        props.addNewTask(title)
        setTitle('')
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' ? addNewTask() : null
    const onClickAll = () => props.changeFilter("all")
    const onClickActive = () => props.changeFilter("active")
    const onClickCompleted = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressEnter}
                />
                <button onClick={addNewTask}>+</button>
            </div>
            <ul>
                {tasksTSXElements}
            </ul>
            <div>
                <button onClick={onClickAll}>все</button>
                <button onClick={onClickActive}>активные</button>
                <button onClick={onClickCompleted}>выполненные</button>
            </div>
        </div>
    )
}