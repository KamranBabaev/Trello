import {TasksStateType} from '../App';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType
} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}
export type AddTaskActionType = {
  type: 'ADD-TASK',
  task: TaskType
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS',
  todolistId: string
  taskId: string
  status: TaskStatuses
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  todolistId: string
  taskId: string
  title: string
}
export type SetTasksActionType = {
  type: 'SET-TASKS'
  tasks: Array<TaskType>
  todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {

    case 'SET-TODOLISTS': {
      const stateCopy = {...state}
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy;
    }

    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.task.todoListId]
      const newTasks = [action.task, ...tasks]
      stateCopy[action.task.todoListId] = newTasks
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
          .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
          .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
  return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todoID: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todoID)
        .then(res => {
              dispatch(setTasksAC(res.data.items, todoID))
            }
        )
  }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(taskId, todolistId)
        .then((res) => {
              dispatch(removeTaskAC(taskId, todolistId))
            }
        )
  }
}
export const addTaskTC = (title: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTask(title, todolistId)
        .then((res) => {
              dispatch(addTaskAC(res.data.data.item))
            }
        )
  }
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)
    if (task) {
      todolistsAPI.updateTask(todolistId, taskId, {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: status
      })
          .then(() => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
              }
          )
    }
  }

}



