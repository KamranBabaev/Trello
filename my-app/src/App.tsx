import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValuesType, tasksPropsType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

function App() {


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
