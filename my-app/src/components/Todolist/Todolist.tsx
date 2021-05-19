import React, {useState, ChangeEvent, KeyboardEvent} from "react";

export type ValuePropsType = 'все' | 'активные' | 'выполненные'


type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskID: string) => void
    changeFilterTasks: (value: ValuePropsType) => void
    addNewTask: (title: string) => void
}

const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Enter') {props.addNewTask(title)}}
    const onClickAllHandler = () => props.changeFilterTasks("все")
    const onClickActiveHandler = () => props.changeFilterTasks("активные")
    const onClickCompletedHandler = () => props.changeFilterTasks("выполненные")

    // @ts-ignore
    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={() => props.addNewTask(title)}>+</button>
                <ul>
                    {props.tasks.map(t => {
                        const onClickHandler = () => {props.removeTask(t.id)}

                            return <li key={t.id}>
                            <input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })}
                </ul>
                <div>
                    <button onClick={onClickAllHandler}>все</button>
                    <button onClick={onClickActiveHandler}>активные</button>
                    <button onClick={onClickCompletedHandler}>выполненные</button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;