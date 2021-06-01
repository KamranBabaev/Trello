import React, {useState, ChangeEvent, KeyboardEvent} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [title, setTitle] = useState<string>(props.title)

    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onEnterOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }


    return (
        editMode
            ? <input
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeTitle}
                onKeyPress={onEnterOffEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

