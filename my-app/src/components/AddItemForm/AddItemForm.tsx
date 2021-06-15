import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    let [error, setError] = useState<boolean | null>(null)
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
            setError(false)
        }
    }

    return (
        <div>
            <TextField onChange={onChangeTitle}
                       onKeyPress={onKeyPressEnter}
                       variant={"outlined"}
                       size={"small"}
                       value={title}
                       label={"add new"}
                       multiline
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addNewTask}
                        color={"primary"}
                        size={"small"}>
                <AddBox/>
            </IconButton>
        </div>
    )
}