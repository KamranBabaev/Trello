import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '02a4a0fe-ec8b-4871-b0ad-555f3e353528'
  }
})

export type TodoType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
}
export type CreateTodoResType = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: {
    item: TodoType
  }
}
export type UpdateDeleteResType = {
  resultCode: number
  messages: string[],
  data: TodoType
}


export const todolistApi = {
  getTodos() {
    return instance.get<Array<TodoType>>(`todo-lists`)
  },

  createTodo(title: string) {
    return instance.post<CreateTodoResType>(`todo-lists`, {title})
  },

  updateTodo(todolistId: string, title: string) {
    return instance.put<UpdateDeleteResType>(`todo-lists/${todolistId}`,
        {title})
  },

  deleteTodo(todolistId: string) {
    return instance.delete<UpdateDeleteResType>(`todo-lists/${todolistId}`)
  }
}