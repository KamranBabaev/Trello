import React from 'react';
import './App.css';
import Todolist from "./components/Todolist/Todolist";

function App() {

    const tasks = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JavaScript', isDone: true},
        {id: 4, title: 'React', isDone: true},
        {id: 5, title: 'Redux', isDone: true},
        {id: 6, title: 'Node.js', isDone: true},
    ]

    return (
        <div className="App-wrapper">
            <Todolist title='Что будем учить?' tasks={tasks}/>
        </div>
    );
}

export default App;
