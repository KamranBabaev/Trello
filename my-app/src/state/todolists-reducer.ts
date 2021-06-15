import {TodolistType} from "../App";
import {v1} from "uuid";
import {FilterPropsType} from "../components/Todolist/Todolist";


type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterPropsType
    todolistID: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    newTitle: string
}

type ActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistFilterAT
    | ChangeTodolistTitleAT


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

export const RemoveTodolistActionCreator = (id: string): RemoveTodolistAT => {
    return {
        type: 'REMOVE-TODOLIST',
        id: id,
    }
}

export const AddTodolistActionCreator = (title: string): AddTodolistAT => {
    return {
        type: "ADD-TODOLIST",
        title: title
    }
}

export const ChangeTodolistFilterActionCreator = (filter: FilterPropsType, id: string): ChangeTodolistFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter: filter,
        todolistID: id
    }
}

export const ChangeTodolistTitleActionCreator = (title: string, id: string): ChangeTodolistTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        newTitle: title,
        id: id
    }
}