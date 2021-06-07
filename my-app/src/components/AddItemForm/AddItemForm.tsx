import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState<string>('')

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addNewTask()
        }
    }
    const addNewTask = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            props.addItem(newTitle)
            setTitle('')
        } else {
            setError('не корректный ввод')
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressEnter}
                   className={error ? 'error' : ''}
            />
            <button onClick={addNewTask}>+</button>
            {error && <div className='error_message'>{error}</div>}
        </div>
    )
}