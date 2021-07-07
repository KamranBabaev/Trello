import React, {useReducer} from 'react';
// import './App.css';
// import TodoList, {TaskType} from "./TodoList";
// import {v1} from "uuid";
// import AddItemForm from "./AddItemForm";
// import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     addTodoListAC,
//     changeTodoListFilterAC,
//     changeTodoListTitleAC,
//     removeTodoListAC,
//     todoListsReducer
// } from "./state/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
//
// export type FilteredValuesType = "all" | "active" | "completed"
//
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilteredValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: TaskType[]
// }
//
// function AppWithReducers() {
//     //BLL
//     const todoListID_1 = v1()
//     const todoListID_2 = v1()
//
//     //useReducer hook
//     const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
//         {id: todoListID_1, title: 'What to learn', filter: "all"},
//         {id: todoListID_2, title: 'What to buy', filter: "all"}
//     ])
//
//     const [tasks, dispatchToTasks] =  useReducer(tasksReducer,{
//         [todoListID_1]: [
//             {id: v1(), title: "HTML", isDone: true},
//             {id: v1(), title: "CSS", isDone: true},
//             {id: v1(), title: "React", isDone: false},
//             {id: v1(), title: "Redux", isDone: false}
//         ],
//         [todoListID_2]: [
//             {id: v1(), title: "Money", isDone: true},
//             {id: v1(), title: "Mansions", isDone: true},
//             {id: v1(), title: "Cars", isDone: false},
//             {id: v1(), title: "Time", isDone: false}
//         ],
//     })
//
//     //todolist actions
//     function changeTodoListFilter(filter: FilteredValuesType, todoListID: string) {
//         let action = changeTodoListFilterAC(filter, todoListID)
//         dispatchToTodoLists(action)
//     }
//     function removeTodoList(todoListID: string) {
//         let action = removeTodoListAC(todoListID)
//         dispatchToTodoLists(action)
//         dispatchToTasks(action)
//     }
//     function addTodoList(title: string) {
//         let action = addTodoListAC(title)
//         dispatchToTodoLists(action)
//         dispatchToTasks(action)
//     }
//     function changeTodoListTitle(title: string, todoListID: string) {
//         let action = changeTodoListTitleAC(title, todoListID)
//         dispatchToTodoLists(action)
//     }
//
//     //task actions
//     function addTask(title: string, todoListID: string) {
//         dispatchToTasks(addTaskAC(title, todoListID))
//     }
//     function removeTask(taskID: string, todoListID: string) {
//         dispatchToTasks(removeTaskAC(taskID, todoListID))
//     }
//     function changeTaskStatus(taskId: string, isDone: boolean, todoListID: string) {
//         dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListID))
//     }
//     function changeTaskTitle(taskId: string, title: string, todoListID: string) {
//         dispatchToTasks(changeTaskTitleAC(taskId, title, todoListID))
//     }
//
//     //UI
//     function getFilteredTasks(tl: TodoListType) {
//         switch (tl.filter) {
//             case "active":
//                 return tasks[tl.id].filter(t => !t.isDone)
//             case "completed":
//                 return tasks[tl.id].filter(t => t.isDone)
//             default:
//                 return tasks[tl.id]
//         }
//     }
//
//     //variable for todolist jsx
//     const todoListComponents = todoLists.map(tl => {
//         const tasksForTodoList = getFilteredTasks(tl)
//         return (
//             <Grid item xs={3} key={tl.id} style={{textAlign: 'center', wordBreak: 'break-word'}}>
//                 <Paper elevation={5} style={{padding: '5px'}}>
//                     <TodoList
//                         todoListID={tl.id}
//                         title={tl.title}
//                         tasks={tasksForTodoList}
//                         filter={tl.filter}
//                         removeTask={removeTask}
//                         changeTodoListFilter={changeTodoListFilter}
//                         addTask={addTask}
//                         changeTaskStatus={changeTaskStatus}
//                         removeTodoList={removeTodoList}
//                         changeTaskTitle={changeTaskTitle}
//                         changeTodoListTitle={changeTodoListTitle}
//                     />
//                 </Paper>
//             </Grid>
//         )
//     })
//
//     return (
//         <div className="App">
//             <AppBar position={"static"}>
//                 <Toolbar style={{justifyContent: "space-between"}}>
//                     <IconButton color={"inherit"}>
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant={"h6"}>
//                         Todolists
//                     </Typography>
//                     <Button
//                         color={"inherit"}
//                         variant={"outlined"}
//                     >Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: '20px 0 10px 0'}} justify={"center"}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {todoListComponents}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducers;
