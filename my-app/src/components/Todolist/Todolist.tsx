import React, {ChangeEvent} from "react";
import {TaskType} from "../../App";
import style from './Todolist.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type FilterPropsType = 'all' | 'active' | 'completed'

export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterPropsType, todolistID: string) => void
    addNewTask: (title: string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTitle: (id: string, newTitle: string, todolistID: string) => void
    filter: FilterPropsType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (title: string, newTitle: string) => void
}


export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = () => props.removeTodolist(props.id)
    const onClickAll = () => props.changeFilter("all", props.id)
    const onClickActive = () => props.changeFilter("active", props.id)
    const onClickCompleted = () => props.changeFilter("completed", props.id)
    const addTask = (title: string) => {
        props.addNewTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div className={style.todolists}>

            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} color={"primary"}>
                    <Delete style={{width: '17px', color: 'gray'}}/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>


            <div>
                {
                    props.tasks
                        .map(t => {
                            const onClickRemoveTask = () => props.removeTask(t.id, props.id)

                            const onChangeStatusTask = (event: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = event.currentTarget.checked
                                props.changeStatus(t.id, newIsDoneValue, props.id)
                            }

                            // debugger
                            const onChangeTitleTask = (newValue: string) => {
                                props.changeTitle(t.id, newValue, props.id)
                            }

                            return <div key={t.id}
                                        className={t.isDone ? 'is_Done' : ''}>
                                <Checkbox onChange={onChangeStatusTask}
                                          checked={t.isDone}
                                          color={'primary'}
                                          size={'small'}
                                />
                                <EditableSpan title={t.title}
                                              onChange={onChangeTitleTask}
                                />
                                <IconButton onClick={onClickRemoveTask} color={"primary"}>
                                    <Delete style={{width: '17px', color: 'gray'}}/>
                                </IconButton>
                            </div>
                        })
                }
            </div>

            <div>
                <Button variant={props.filter === 'all' ? "contained" : "outlined"}
                        style={{margin: "5px", color: "black", fontWeight: "bold", fontSize: "11px"}}
                        color={"primary"}
                        size={"small"}
                        onClick={onClickAll}>все
                </Button>
                <Button variant={props.filter === 'active' ? "contained" : "outlined"}
                        style={{margin: "5px", color: "black", fontWeight: "bold", fontSize: "11px"}}
                        color={"primary"}
                        size={"small"}
                        onClick={onClickActive}>активные
                </Button>
                <Button variant={props.filter === 'completed' ? "contained" : "outlined"}
                        style={{margin: "5px", color: "black", fontWeight: "bold", fontSize: "11px"}}
                        color={"primary"}
                        size={"small"}
                        onClick={onClickCompleted}>выполненные
                </Button>
            </div>
        </div>
    )
}