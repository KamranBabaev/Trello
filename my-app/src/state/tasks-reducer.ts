import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {AddTodoListActionType, RemoveTodoListActionType, todoListID_1, todoListID_2} from "./todolists-reducer";

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todoListID: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListID: string
}
export type TasksReducerActionsType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListActionType
    | RemoveTodoListActionType

//initial state for tasks
const initState: TasksStateType = {
    [todoListID_1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ],
    [todoListID_2]: [
        {id: v1(), title: "Money", isDone: true},
        {id: v1(), title: "Mansions", isDone: true},
        {id: v1(), title: "Cars", isDone: false},
        {id: v1(), title: "Time", isDone: false}
    ],
}

//reducer for all actions on Tasks
export const tasksReducer = (tasks = initState, action: TasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].filter(t => t.id !== action.taskID)
            }
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...tasks,
                [action.todoListID]: [newTask, ...tasks[action.todoListID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        case "ADD-TODOLIST":
            return {...tasks, [action.todoListId]: []}
        case 'REMOVE-TODOLIST':
            const newTasks = {...tasks}
            delete newTasks[action.todoListID]
            return newTasks
        default:
            return tasks
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return { type: 'REMOVE-TASK', taskID: taskID, todoListID: todoListID }
}
export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return { type: 'ADD-TASK', title, todoListID }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListID }
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): ChangeTaskTitleAT => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListID }
}
