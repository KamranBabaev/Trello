import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onClickAddItem = () => {
        const validTitle = title.trim()
        if (validTitle !== '') {
            props.addItem(validTitle)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() !== '') {
            if (e.key === 'Enter') {
                onClickAddItem()
                setTitle('')
            }
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                onBlur={() => setError(false)}
                label={"Title"}
                error={error}
                helperText={error && 'title is required'}
            />
            <IconButton onClick={onClickAddItem} color={"primary"} size={"small"}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm;