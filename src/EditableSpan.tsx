import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }
    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {isEditMode ? (
                    <TextField variant="standard"
                               value={title}
                               onChange={changeTitle}
                               onBlur={turnOffEditMode}
                               autoFocus/>
                // <input value={title} onChange={changeTitle} onBlur={turnOffEditMode} autoFocus/>
                ) : (
                <span onDoubleClick={turnOnEditMode} >{value}</span>
    )
}
</>
)
}