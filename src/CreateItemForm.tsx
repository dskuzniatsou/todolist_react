import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    createItem: (title: string) => void,
}


const CreateItemForm = ({createItem}:Props) => {
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

            <input value={title}
                   onChange= {changeItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}
                   className = {error? 'error' : ''}/>

            <Button title={'+'} onClickHandler={createItemHandler}/>
            {error &&   <div className = 'error-message'> {error}</div>}
        </div>
    );
};

export default CreateItemForm;