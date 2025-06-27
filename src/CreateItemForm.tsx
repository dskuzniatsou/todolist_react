// import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import AddBoxIcon from '@mui/icons-material/AddBox'
import {IconButton, TextField} from "@mui/material";

type Props = {
    createItem: (title: string) => void,
}


const CreateItemForm = ({createItem}: Props) => {
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }
    return (
        <div>

            <TextField variant="outlined"
                       size="small"
                       value={title}
                       error={!!error}
                       placeholder="Title is required"
                       onChange={changeItemTitleHandler}
                       onKeyDown={createItemOnEnterHandler}
                       className={error ? 'error' : ''}/>
            <IconButton onClick={createItemHandler}
                        disabled={!Boolean(title) || title.length > 10}
                        color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
            {/*<Button title={'+'} onClickHandler={createItemHandler}/>*/}
            {error && <div className='error-message'> {error}</div>}
        </div>
    );
};

export default CreateItemForm;