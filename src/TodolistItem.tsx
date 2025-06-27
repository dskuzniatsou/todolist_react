import {Task, Todolist, TypeFilters} from "./App.tsx";
// import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import CreateItemForm from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {getBoxSx, getListItemSx} from "./TodolistItem.styles.ts";


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
                    <IconButton onClick={deleteTodolistHandler}>
                        <DeleteOutlineIcon/>
                    </IconButton>
                    {/*<Button title={'x'} onClickHandler={deleteTodolistHandler}/>*/}
                </div>

                <CreateItemForm createItem={createTaskHandler}/>

                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List>
                        {tasks.map(task => {
                            const deleteTaskHandler = () => deleteTask(id, task.id)
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(id, task.id, e.currentTarget.checked)
                            }
                            const changeTaskTitleHandler = (title: string) => {
                                changeTaskTitle(id, task.id, title)
                            }
                            return (
                                <ListItem key={task.id}  disablePadding
                                          sx={getListItemSx(task.isDone)}>
                                    {/*<input type="checkbox"*/}
                                    {/*       onChange={changeTaskStatusHandler}*/}
                                    {/*       checked={task.isDone}/>*/}

                                    <Box >

                                            <Checkbox checked={task.isDone}
                                                      onChange={changeTaskStatusHandler}
                                                      size="small"/>
                                            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>

                                    </Box>


                                    <IconButton onClick={deleteTaskHandler}
                                                size="small">
                                        <HighlightOffIcon/>
                                    </IconButton>
                                    {/*<Button title={'X'} onClickHandler={deleteTaskHandler}/>*/}

                                </ListItem>
                            )
                        })}
                    </List>
                )}
                <Box sx={getBoxSx}>
                    <Button
                        onClick={() => {
                            changeFilterHandler('all')
                        }}
                        color={filter === 'all' ? 'secondary' : 'primary'}
                        variant="contained"
                        disableElevation
                        size="small">
                        All
                    </Button>
                    <Button
                        onClick={() => {
                            changeFilterHandler('active')
                        }}
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        variant="contained"
                        disableElevation
                        size="small">
                        Active
                    </Button>
                    <Button
                        onClick={() => {
                            changeFilterHandler('completed')
                        }}
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        variant="contained"
                        disableElevation
                        size="small">
                        Completed
                    </Button>

                    {/* <Button filterClassName={filter === 'all' ? 'active-filter' : ''} title={'All'}*/}
                    {/*//         onClickHandler={() => {*/}
                    {/*//             changeFilterHandler('all')*/}
                    {/*//         }}/>*/}
                    {/*<Button filterClassName={filter === 'active' ? 'active-filter' : ''} title={'Active'}*/}
                    {/*        onClickHandler={() => {*/}
                    {/*            changeFilterHandler('active')*/}
                    {/*        }}/>*/}
                    {/*<Button filterClassName={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}*/}
                    {/*        onClickHandler={() => {*/}
                    {/*            changeFilterHandler('completed')*/}
                    {/*        }}/>*/}
                </Box>

            </div>
        )
    }