import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        if(title.trim() !== "") {
            setEditMode(false)
            props.changeTitle(title)
            setTempTitle(title)
        } else {
            setTitle(tempTitle)
            setEditMode(false)
        }
    }

    const [title, setTitle] = useState<string>(props.title)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnterOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            offEditMode()
        }
    }

    //make onBlur or Enter press return last title if empty field submitted
    const [tempTitle, setTempTitle] = useState<string>(title)

    return (
        editMode
            ? <TextField
                value={title}
                onChange={onChangeTitle}
                onBlur={offEditMode}
                onKeyPress={onEnterOffEditMode}
                autoFocus
            />
            : <span
                onDoubleClick={onEditMode}
            >{props.title}</span>
    )
}