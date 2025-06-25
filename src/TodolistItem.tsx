import {Task, Todolist, TypeFilters} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import CreateItemForm from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";


export type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filterValue: TypeFilters) => void
    createTask: (todolistId: string, title: string,) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem =
    ({
         todolist: {id, title, filter},
         tasks,
         deleteTask,
         changeFilter,
         createTask,
         changeTaskStatus,
         deleteTodolist,
         changeTaskTitle,
         changeTodolistTitle
     }: Props) => {


        const createTaskHandler = (title: string) => {
            createTask(id, title)
        }
        const changeTodolistTitleHandler = (title: string) => {
            changeTodolistTitle(id, title)
        }


        const changeFilterHandler = (filter: TypeFilters) => {
            changeFilter(id, filter)
        }
        const deleteTodolistHandler = () => {
            deleteTodolist(id)
        }


        return (

            <div>
                <div className={'container'}>
                    <h3>
                        <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                    </h3>
                    <Button title={'x'} onClickHandler={deleteTodolistHandler}/>
                </div>

                <CreateItemForm createItem={createTaskHandler}/>

                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {tasks.map(task => {
                            const deleteTaskHandler = () => deleteTask(id, task.id)
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(id, task.id, e.currentTarget.checked)
                            }
                            const changeTaskTitleHandler = (title: string) => {
                                changeTaskTitle(id, task.id, title)
                            }
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input type="checkbox"
                                           onChange={changeTaskStatusHandler}
                                           checked={task.isDone}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                    <Button title={'X'} onClickHandler={deleteTaskHandler}/>

                                </li>
                            )
                        })}
                    </ul>
                )}
                <div>
                    <Button filterClassName={filter === 'all' ? 'active-filter' : ''} title={'All'}
                            onClickHandler={() => {
                                changeFilterHandler('all')
                            }}/>
                    <Button filterClassName={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                            onClickHandler={() => {
                                changeFilterHandler('active')
                            }}/>
                    <Button filterClassName={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                            onClickHandler={() => {
                                changeFilterHandler('completed')
                            }}/>
                </div>

            </div>
        )
    }