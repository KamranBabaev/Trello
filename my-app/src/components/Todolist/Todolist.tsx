import React from "react";
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    tasks: Array<tasksPropsType>
    removeTask: (id: number) => void;
    changeFilter: (value: FilterValuesType) => void;
}
export type tasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'все' | 'активные' | 'выполненные'


const Todolist = (props: TodolistPropsType) => {

    let tasksElements = props.tasks
        .map(t => <li>
            <input type='checkbox' checked={t.isDone}/>
            <span>{t.title}</span>
            <button className={styles.buttTasks} onClick={() => props.removeTask(t.id)}>x</button>
        </li>)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
                <ul className={styles.rowsTodolist}>
                    {tasksElements}
                </ul>
                <div className={styles.buttTodolist}>
                    <button onClick={ () => props.changeFilter('все')}>все</button>
                    <button onClick={ () => props.changeFilter('активные')}>активные</button>
                    <button onClick={ () => props.changeFilter('выполненные')}>выполненные</button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;