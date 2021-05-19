import React, {useState} from "react";
import Todolist, {ValuePropsType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

const App = () => {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Node', isDone: false},
    ])
    let [filter, setFilter] = useState<ValuePropsType>('все')

    // удаляются таски, при нажатии на кнопку мы получаем taskID, далее фильтр идет,
    // в новый массив попадают все таски, кроме того, на чью кнопку нажали (то есть чей айди пришел к нам)
    const removeTask = (taskID: string) => {
        let filteredTask = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTask)
    }

    // фильтры отображения, в filter сидит значение, которое получили от changeFilterTasks,
    // после чего срабатывает нужный case
    const tasksForTodolist = () => {
        switch (filter) {
            case 'активные':
                return tasks.filter(t => !t.isDone)
            case 'выполненные':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    // получаем значение от кнопки и передаем значение в setFilter
    const changeFilterTasks = (value: ValuePropsType) => {
        setFilter(value)
    }

    const addNewTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }


    return (
        <div className='App-wrapper'>
            <Todolist
                title='Что будем учить?'
                tasks={tasksForTodolist()}
                removeTask={removeTask}
                changeFilterTasks={changeFilterTasks}
                addNewTask={addNewTask}
            />
        </div>
    )
}

export default App;