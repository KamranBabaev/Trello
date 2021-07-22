import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistApi} from "./api/todolist-api";


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'new title'
        todolistApi.createTodo(title)
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '14e007d4-e550-486c-9f5e-eab601f946aa'
        const title = 'update todolist'

        todolistApi.updateTodo(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '68d77e64-4e60-436c-8504-900e69be5fe0'
        todolistApi.deleteTodo(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export default {
    title: 'API'
}
