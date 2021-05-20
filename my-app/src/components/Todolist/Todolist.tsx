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
    changeCheckedStatus: (idTask: string, isDone: boolean) => void
    filter: 'все' | 'активные' | 'выполненные'
}

const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const addNewTask = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addNewTask(validatedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.key === 'Enter') {
            props.addNewTask(title)
        }
    }
    const onClickAllHandler = () => props.changeFilterTasks("все")
    const onClickActiveHandler = () => props.changeFilterTasks("активные")
    const onClickCompletedHandler = () => props.changeFilterTasks("выполненные")

    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addNewTask}>+</button>
                {error && <div className='error-message'>не корректный ввод</div>}

                <ul>
                    {props.tasks.map(t => {
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeCheckedStatus(t.id, e.currentTarget.checked)

                        return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <input type='checkbox'
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>x
                            </button>
                        </li>
                    })}
                </ul>

                <div>
                    <button className={props.filter === 'все' ? 'active-filter' : ''} onClick={onClickAllHandler}>все</button>
                    <button className={props.filter === 'активные' ? 'active-filter' : ''} onClick={onClickActiveHandler}>активные</button>
                    <button className={props.filter === 'выполненные' ? 'active-filter' : ''} onClick={onClickCompletedHandler}>выполненные</button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;