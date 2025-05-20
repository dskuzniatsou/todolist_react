import {Task, Todolist, TypeFilters} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string,taskId:string) => void
    changeFilter: (todolistId: string,filterValue:TypeFilters) => void
    createTask: (todolistId: string, title:string,) => void
    changeStatus: (todolistId: string,taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void

}

export const TodolistItem =
    ({ todolist: {id, title, filter}, tasks,deleteTask, changeFilter,createTask, changeStatus,deleteTodolist }: Props) => {
    // const inputRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (taskTitle.trim() !== "") {
            createTask(id, taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Field is empty')
        }

 }
    function onChangeInputHandler(e: ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.target.value)
    }
        const deleteTodolistHandler = () => {
            deleteTodolist(id)
        }

    const onKeyDownHandler = (event:KeyboardEvent ) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
    }
        }
        const changeFilterHandler = (filter: TypeFilters) => {
            changeFilter(id, filter)
        }

        return (

        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClickHandler={deleteTodolistHandler} />
            </div>
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
                       onKeyDown={onKeyDownHandler}
                       className = {error? 'error' : ''}/>

                <Button title={'+'} onClickHandler={addTask}/>
                {error &&   <div className = 'error-message'> {error}</div>}
            </div>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const onClickHandlerDelete = () => deleteTask(id, task.id)
                        const onChangeInputHandlerStatus = (e:ChangeEvent<HTMLInputElement>) => {
                          changeStatus(id, task.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done':''}>
                                <input type="checkbox"
                                       onChange={onChangeInputHandlerStatus}
                                       checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button title={'X'} onClickHandler={onClickHandlerDelete}/>

                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button filterClassName={filter==='all'? 'active-filter' : ''} title={'All'} onClickHandler={()=>{changeFilterHandler('all')}}/>
                <Button filterClassName={filter==='active'? 'active-filter' : ''} title={'Active'} onClickHandler={()=>{changeFilterHandler('active')}}/>
                <Button filterClassName={filter==='completed'? 'active-filter' : ''} title={'Completed'} onClickHandler={()=>{changeFilterHandler('completed')}} />
            </div>

        </div>
    )
}