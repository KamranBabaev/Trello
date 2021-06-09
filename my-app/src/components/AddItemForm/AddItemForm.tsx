import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
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
            <Grid spacing={3}>
                <TextField variant={"outlined"}
                           size={"small"}
                           value={title}
                           onChange={onChangeTitle}
                           onKeyPress={onKeyPressEnter}
                           error={!!error}
                           label={"new task"}
                />
                <Button onClick={addNewTask}
                        color={"secondary"}
                        size={"small"}><AddBox /></Button>
                {error && <div className='error_message'>{error}</div>}
            </Grid>
        </div>
    )
}