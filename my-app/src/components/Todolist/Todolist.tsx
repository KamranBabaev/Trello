import React from "react";

export type ValuePropsType = 'все' | 'активные' | 'выполненные'


type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskID: number) => void
    changeFilterTasks: (value: ValuePropsType) => void
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
                    <button onClick={() => props.changeFilterTasks("все")}>все</button>
                    <button onClick={() => props.changeFilterTasks("активные")}>активные</button>
                    <button onClick={() => props.changeFilterTasks("выполненные")}>выполненные</button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;