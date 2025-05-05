import {Task, TypeFilters} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId:string) => void
    changeFilters: (filterValue:TypeFilters) => void
    createTask: (title:string) => void
}

export const TodolistItem = ({ title, tasks,deleteTask, changeFilters, createTask }: Props) => {
    // const inputRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitle] = useState('')

    function onChangeInputHandler(e: ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.target.value)
    }
    const onKeyDownHandler = (event:KeyboardEvent ) => {
        if (event.key === 'Enter') {
            createTask(taskTitle)
            setTaskTitle('')
    }
        }

    return (

        <div>

            <h3>{title}</h3>
            <div>
                {/* используем хук useRef -  У подхода с useRef есть минус: нельзя получить значение после каждого введенного символа.*/}
                {/*<input ref={inputRef}/>*/}
                {/*<Button title={'+'} onClickHandler={ ()=> {*/}
                {/*    if (inputRef.current) {*/}
                {/*       createTask(inputRef.current.value)*/}
                {/*        inputRef.current.value = ''*/}
                {/*}*/}
                {/*}} />*/}

                <input value={taskTitle}
                       onChange= {onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}/>
                <Button title={'+'} onClickHandler={() => {
                    createTask(taskTitle)
                    setTaskTitle('')
                }}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const onClickHandlerDelete = () => deleteTask(task.id)
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button title={'X'} onClickHandler={onClickHandlerDelete}/>

                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClickHandler={()=>{changeFilters('all')}}/>
                <Button title={'Active'} onClickHandler={()=>{changeFilters('active')}}/>
                <Button title={'Completed'} onClickHandler={()=>{changeFilters('completed')}} />
            </div>

        </div>
    )
}