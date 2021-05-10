import React from "react";
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    tasks: Array<tasksPropsType>
}
export type tasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
                <ul className={styles.rowsTodolist}>
                    <li><input type='checkbox' checked={props.tasks[0].isDone}/>
                        <span>{props.tasks[0].title}</span></li>
                    <li><input type='checkbox' checked={props.tasks[1].isDone}/>
                        <span>{props.tasks[1].title}</span></li>
                    <li><input type='checkbox' checked={props.tasks[2].isDone}/>
                        <span>{props.tasks[2].title}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Todolist;