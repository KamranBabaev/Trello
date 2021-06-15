import {TodolistType} from "../App";
import {v1} from "uuid";
import {FilterPropsType} from "../components/Todolist/Todolist";


type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterPropsType
    todolistID: string
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    newTitle: string
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType


export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType) => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(td => td.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolistID = v1()
            const newTodolist: TodolistType = {
                id: newTodolistID, filter: "all", title: action.title
            }
            return [...todolists, newTodolist]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(td => td.id === action.todolistID ? {...td, filter: action.filter} : todolists)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(td => td.title === action.id ? {...td, filter: action.newTitle} : todolists)
        default:
            return todolists
    }

}

export const RemoveTodolistActionCreator = (id: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: id,
    }
}

export const AddTodolistActionCreator = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title
    }
}

export const ChangeTodolistFilterActionCreator = (filter: FilterPropsType, id: string): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter: filter,
        todolistID: id
    }
}

export const ChangeTodolistTitleActionCreator = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        newTitle: title,
        id: id
    }
}