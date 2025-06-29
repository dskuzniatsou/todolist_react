import type {TasksState} from '../App'
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";
import {v1} from "uuid";


export type deleteTaskAT = ReturnType<typeof deleteTaskAC>
export type createTaskAT = ReturnType<typeof createTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type TasksActions =
    CreateTodolistAT
    | DeleteTodolistAT
    | deleteTaskAT
    | createTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT

const initialState: TasksState = {}

export const tasksReducer = (tasks: TasksState = initialState, action: TasksActions): TasksState => {
    switch (action.type) {
        case "create_todolist": {
            const {id} = action.payload
            return {...tasks, [id]: []}
        }
        case "delete_todolist": {
            const {id} = action.payload
            const nextState: TasksState = {...tasks}
            delete nextState[id]
            return nextState
        }
        case "delete_tasks": {
            const {todolistId, taskId} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
            }
        }
        case "create_tasks": {
            const {todolistId, title} = action.payload
            const newTask = {id: v1(), title, isDone: false}
            return {
                ...tasks, [todolistId]: [newTask, ...tasks[todolistId]]
            }
        }
        case "changeStatus_tasks" : {
            const {todolistId, taskId, isDone} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)}
        }
        case "changeTitle_tasks" : {
            const {todolistId, taskId, title} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)}
        }

        default:
            return tasks
    }
}

export const deleteTaskAC = ({todolistId, taskId}: { todolistId: string; taskId: string }) => {
    return {
        type: "delete_tasks",
        payload: {
            todolistId,
            taskId,
        },
    } as const
}

export const createTaskAC = ({todolistId, title}: { todolistId: string; title: string }) => {
    return {
        type: "create_tasks",
        payload: {
            todolistId,
            title
        },
    } as const
}

export const changeTaskStatusAC = ({todolistId, taskId, isDone}: {
    todolistId: string,
    taskId: string,
    isDone: boolean
}) => {
    return {
        type: "changeStatus_tasks",
        payload: {
            todolistId,
            taskId,
            isDone
        },
    } as const
}

export const changeTaskTitleAC = ({todolistId, taskId, title}: {
    todolistId: string,
    taskId: string,
    title: string
}) => {
    return {
        type: "changeTitle_tasks",
        payload: {
            todolistId,
            taskId,
            title
        },
    } as const
}