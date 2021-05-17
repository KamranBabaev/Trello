import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    tasks: Array<tasksPropsType>
    filter: FilterValuesType
    removeTask: (id: string) => void;
    addTask: (titleTask: string) => void;
    changeFilter: (value: FilterValuesType) => void;
}

export type tasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'все' | 'активные' | 'выполненные'


const Todolist = (props: TodolistPropsType) => {

    const [titleTask, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onClickAddTask = () => {
        const validatedTitle = titleTask.trim()
        if (validatedTitle) {
            props.addTask(validatedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }


    let tasksElements = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type='checkbox' checked={t.isDone}/>
                <span className={t.isDone ? 'is-done' : ''}>{t.title}</span>
                <button className={styles.buttTasks} onClick={removeTask}>x</button>
            </li>)
    })

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickAddTask()
        }
    }
    const onClickAllFilter = () => props.changeFilter('все')
    const onClickActiveFilter = () => props.changeFilter('активные')
    const onClickCompletedFilter = () => props.changeFilter('выполненные')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={titleTask}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={ {color: 'red', fontSize: '14px'} }>ошибочка!</div>}
                <ul className={styles.rowsTodolist}>
                    {tasksElements}
                </ul>
                <div className={styles.buttTodolist}>
                    <button className={props.filter === 'все' ? 'active-filter' : ''} onClick={onClickAllFilter}>все</button>
                    <button onClick={onClickActiveFilter}
                            className={props.filter === 'активные' ? 'active-filter' : ''}>активные</button>
                    <button onClick={onClickCompletedFilter}
                            className={props.filter === 'выполненные' ? 'active-filter' : ''}>выполненные</button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;