import React from "react";

type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskID: number) => void
}

const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input/>
                <button>+</button>
                <ul>
                    {props.tasks.map(t => <li key={t.id}>
                        <input type='checkbox' checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={ () => {props.removeTask(t.id)}}>x</button>
                    </li>)}
                </ul>
                <div>
                    <button>все</button>
                    <button>активные</button>
                    <button>выполненные</button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;