import React from "react";
import Todolist from "./components/Todolist/Todolist";

const App = () => {

    let tasks = [
        {id: 1, title: 'HTML', isDone: false},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'React', isDone: false},
        {id: 5, title: 'Node', isDone: false},
    ]

    let removeTask = (taskID: number) => {
        tasks = tasks.filter(t => t.id !== taskID)
    }


    return (
        <div className='App-wrapper'>
            <Todolist
                title='Что будем учить?'
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    )
}

export default App;