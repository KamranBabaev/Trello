import axios from "axios";
import {UpdateDeleteResType} from "./todolist-api";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '02a4a0fe-ec8b-4871-b0ad-555f3e353528'
  }
})

type TaskType = {
  addedDate: string
  deadline: null | string
  description: null | string
  id: string
  order: number
  priority: number
  startDate: null | string
  status: number
  title: string
  todoListId: string
}
type CreateTaskResType = {
  resultCode: number
  messages: string[],
  data: {
    item: TaskType
  }
}



export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<Array<TaskType>>(`todo-lists/${todolistId}/tasks`)
  },

  createTask(todolistId: string, title: string) {
    return instance.post<CreateTaskResType>(`todo-lists/${todolistId}/tasks`, {title})
  },

  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<CreateTaskResType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<any>(`todo-lists/${todolistId}/tasks/${taskId}`)
  }

}