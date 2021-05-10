import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValuesType, tasksPropsType} from "./components/Todolist/Todolist";

function App() {

    let [tasks, setTasks] = useState<Array<tasksPropsType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JavaScript', isDone: true},
        {id: 4, title: 'React', isDone: false},
        {id: 5, title: 'Redux', isDone: false},
        {id: 6, title: 'Node.js', isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>();

    let changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
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
            />
        </div>
    );
}

export default App;
