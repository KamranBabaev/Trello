import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    tasks: Array<tasksPropsType>
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

    const onClickAddTask = () => {
        props.addTask(titleTask)
        setTitle('')
    }


    let tasksElements = props.tasks
        .map(t => <li>
            <input type='checkbox' checked={t.isDone}/>
            <span>{t.title}</span>
            <button className={styles.buttTasks} onClick={() => props.removeTask(t.id)}>x</button>
        </li>)

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
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
                    value={titleTask}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
                <ul className={styles.rowsTodolist}>
                    {tasksElements}
                </ul>
                <div className={styles.buttTodolist}>
                    <button onClick={onClickAllFilter}>все</button>
                    <button onClick={onClickActiveFilter}>активные</button>
                    <button onClick={onClickCompletedFilter}>выполненные</button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;