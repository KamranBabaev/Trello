import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import styles from './Todolist.module.css'

export type FilterPropsType = 'all' | 'active' | 'completed'

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilterTasks: (value: FilterPropsType, todolistID: string) => void
    addNewTask: (title: string, todolistID: string) => void
    changeCheckedStatus: (idTask: string, isDone: boolean, todolistID: string) => void
    filter: 'all' | 'active' | 'completed'
    removeTodolist: (todolistID: string) => void
}

const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const addNewTask = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addNewTask(validatedTitle, props.todolistID)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.key === 'Enter') {
            props.addNewTask(title, props.todolistID)
        }
    }
    const onClickAllHandler = () => props.changeFilterTasks("all", props.todolistID)
    const onClickActiveHandler = () => props.changeFilterTasks("active", props.todolistID)
    const onClickCompletedHandler = () => props.changeFilterTasks("completed", props.todolistID)

    return (
        <div className={styles.wrapper}>
            <h3>{props.title}<button onClick={() => props.removeTodolist(props.todolistID)}>x</button></h3>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addNewTask}>+</button>
            {error && <div className='error-message'>не корректный ввод</div>}

            <div className={styles.mainInput}>
                <ul>
                    {props.tasks.map(t => {
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeCheckedStatus(t.id, e.currentTarget.checked, props.todolistID)

                        return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <input type='checkbox'
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span className={styles.title}>{t.title}</span>
                            <button className={styles.removeButt} onClick={() => {
                                props.removeTask(t.id, props.todolistID)
                            }}>x
                            </button>
                        </li>
                    })}
                </ul>
            </div>

            <div className={styles.filterButt}>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onClickAllHandler}>все
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onClickActiveHandler}>активные
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickCompletedHandler}>выполненные
                </button>
            </div>
        </div>
    )
}

export default Todolist;