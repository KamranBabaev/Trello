import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";


type ActionCreatorActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistID: string
}

type ActionCreatorActionType2 = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}

type ActionCreatorActionType3 = {
    type: 'CHANGE-TASK',
    id: string
    isDone: boolean
    todolistID: string
}

type ActionCreatorActionType4 = {
    type: 'CHANGE-TITLE'
    id: string
    todolistID: string
    title: string
}


type ActionType =
    ActionCreatorActionType
    | ActionCreatorActionType2
    | ActionCreatorActionType3
    | ActionCreatorActionType4
    | RemoveTodolistAT
    | AddTodolistAT


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {

    switch (action.type) {

        case 'REMOVE-TASK': {
            let todolistsTasks = state[action.todolistID]
            todolistsTasks = todolistsTasks.filter(t => t.id !== action.id)
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)
            }
        }

        case 'ADD-TASK': {
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        }

        case 'CHANGE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            }

        }

        case 'CHANGE-TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.id ? {...t, title: action.title} : t)
            }
        }

        case 'ADD-TODOLIST': {
            let todolistID = v1()

            return {...state, [todolistID]: []}
        }

        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.id]
            return newState
        }

        default:
            throw new Error('ошибочка')
    }
}

export const removeTaskAC = (id: string, todolistID: string): ActionCreatorActionType => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistID
    }
}

export const addTaskAC = (title: string, todolistID: string): ActionCreatorActionType2 => {
    return {
        type: 'ADD-TASK',
        title,
        todolistID,
    }
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistID: string): ActionCreatorActionType3 => {
    return {
        type: 'CHANGE-TASK',
        id,
        isDone,
        todolistID
    }
}

export const changeTaskTitleAC = (id: string, todolistID: string, title: string): ActionCreatorActionType4 => {
    return {
        type: 'CHANGE-TITLE',
        id,
        todolistID,
        title
    }
}


