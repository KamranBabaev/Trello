import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValuesType, tasksPropsType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

function App() {

    const [filter, setFilter] = useState<FilterValuesType>('все');
    const [tasks, setTasks] = useState<Array<tasksPropsType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: true},
        {id: v1(), title: 'Node.js', isDone: false},
    ]);

    let changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    let addTask = (titleTask: string) => {
        const newTask: tasksPropsType = {
            id: v1(),
            title: titleTask,
            isDone: false
        }
        const newArrayTasks = [newTask, ...tasks]
        setTasks(newArrayTasks)
    }

    let changeTaskStatus = (taskID: string, isDone: boolean) => {
        
    }

    let getFilterTasks = () => {
        switch (filter) {
            case 'активные':
                return tasks.filter(t => t.isDone === false)
            case 'выполненные':
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    return (
        <div className="App-wrapper">
            <Todolist
                filter={filter}
                title='Что будем учить?'
                tasks={getFilterTasks()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
