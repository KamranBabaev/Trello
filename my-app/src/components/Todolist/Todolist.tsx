import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskType} from "../../App";
import style from './Todolist.module.css'

export type ValuePropsType = 'all' | 'active' | 'completed'

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: ValuePropsType, todolistID: string) => void
    addNewTask: (title: string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    filter: ValuePropsType
    removeTodolist: (todolistID: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addNewTask = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            props.addNewTask(newTitle, props.id)
            setTitle('')
        } else {
            setError('не корректный ввод')
        }
    }

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addNewTask()
        }
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onClickAll = () => props.changeFilter("all", props.id)
    const onClickActive = () => props.changeFilter("active", props.id)
    const onClickCompleted = () => props.changeFilter("completed", props.id)

    return <div className={style.todolists}>
        <h3>{props.title}
            <button onClick={removeTodolist}>x</button>
        </h3>

        <div>
            <input value={title}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressEnter}
                   className={error ? 'error' : ''}
            />
            <button onClick={addNewTask}>+</button>
            {error && <div className='error_message'>{error}</div>}
        </div>

        <ul>
            {props.tasks.map(t => {
                const onClickRemoveTask = () => props.removeTask(t.id, props.id)
                const onChangeStatusTask = (event: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = event.currentTarget.checked
                    props.changeStatus(t.id, newIsDoneValue, props.id)
                }

                return <li key={t.id} className={t.isDone ? 'is_Done' : ''}>
                    <input type='checkbox' onChange={onChangeStatusTask} checked={t.isDone}/>
                    <span>{t.title}</span>
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