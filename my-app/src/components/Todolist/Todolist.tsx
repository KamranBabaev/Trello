import React, {ChangeEvent} from "react";
import styles from './Todolist.module.css'
import AddItemForm from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../Editable/Editable";

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
    changeTaskTitle: (idTask: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => props.addNewTask(title, props.todolistID)

    const tasksTSXElements = props.tasks.map(t => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeCheckedStatus(t.id, e.currentTarget.checked, props.todolistID)

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todolistID)
        }

        return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
            <input type='checkbox'
                   onChange={onChangeHandler}
                   checked={t.isDone}/>

            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>

            <button className={styles.removeButt} onClick={() => {
                props.removeTask(t.id, props.todolistID)
            }}>x
            </button>
        </li>
    })

    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todolistID)

    const onClickAllHandler = () => props.changeFilterTasks("all", props.todolistID)
    const onClickActiveHandler = () => props.changeFilterTasks("active", props.todolistID)
    const onClickCompletedHandler = () => props.changeFilterTasks("completed", props.todolistID)

    return (
        <div className={styles.wrapper}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={() => props.removeTodolist(props.todolistID)}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div className={styles.mainInput}>
                <ul>
                    {tasksTSXElements}
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