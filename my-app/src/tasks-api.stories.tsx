import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistApi} from "./api/todolist-api";
import {tasksApi} from "./api/tasks-api";
import {log} from "util";


export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    tasksApi.getTasks('ac7d4938-f6f2-48ce-8350-04feb9065b0f')
        .then((res) => {
          setState(res.data);
          console.log(res.data)
        })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'new title'
    tasksApi.createTask('ac7d4938-f6f2-48ce-8350-04feb9065b0f', title)
        .then(res => {
          setState(res.data.data)
        })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'ac7d4938-f6f2-48ce-8350-04feb9065b0f'
    const taskId = 'c8d2e62e-9db2-4e7f-bdb6-fa4d9d73a1e5'
    tasksApi.updateTask(todolistId, taskId, 'новый тайтл')
        .then(res => {
          setState(res.data)
          console.log(res.data)
        })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'ac7d4938-f6f2-48ce-8350-04feb9065b0f'
    const taskId = 'c8d2e62e-9db2-4e7f-bdb6-fa4d9d73a1e5'
    tasksApi.deleteTask(todolistId,taskId)
        .then(res => {
          setState(res.data)
        })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}


export default {
  title: 'taskAPI'
}
