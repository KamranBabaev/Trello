import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const activateEditMode = () => setEditMode(true)
    const activateViewMode = () => setEditMode(false)

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return editMode
        ? <input value={title} onChange={onChangeTitle} onBlur={activateViewMode} autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}