import React, {useState} from "react";
import Todolist, {ValuePropsType} from "./components/Todolist/Todolist";

const App = () => {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'React', isDone: false},
        {id: 5, title: 'Node', isDone: false},
    ])
    let [filter, setFilter] = useState<ValuePropsType>('все')

    // удаляются таски, при нажатии на кнопку мы получаем taskID, далее фильтр идет,
    // в новый массив попадают все таски, кроме того, на чью кнопку нажали (то есть чей айди пришел к нам)
    const removeTask = (taskID: number) => {
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


    return (
        <div className='App-wrapper'>
            <Todolist
                title='Что будем учить?'
                tasks={tasksForTodolist()}
                removeTask={removeTask}
                changeFilterTasks={changeFilterTasks}
            />
        </div>
    )
}

export default App;