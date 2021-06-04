import React, {ChangeEvent, useState, KeyboardEvent} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onEnterOffEditMode = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            offEditMode()
        }
    }

    return editMode
        ? <input value={title}
                 onChange={onChangeTitle}
                 onBlur={offEditMode}
                 autoFocus={true}
                 onKeyPress={onEnterOffEditMode}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}