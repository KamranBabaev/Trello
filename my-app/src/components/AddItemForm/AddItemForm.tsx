import React, {useState, ChangeEvent, KeyboardEvent} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.key === 'Enter') {
            props.addItem(title)
        }
    }

    const addNewTask = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addItem(validatedTitle)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const errorMessage = error ? <div className='error-message'>не корректный ввод</div> : null


    return (
        <div>
            <input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                className={error ? 'error' : ''}
            />
            <button onClick={addNewTask}>+</button>
            {errorMessage}
        </div>
    )
}

export default AddItemForm;