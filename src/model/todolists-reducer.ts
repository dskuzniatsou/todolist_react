import {Todolist, TypeFilters} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

export type DeleteTodolistAT = ReturnType<typeof DeleteTodolistAC>
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>


type ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (todolists: Todolist[] = initialState, action: ActionType): Todolist[] => {

    switch (action.type) {
        case "delete_todolist": {
            const {id} = action.payload
            return todolists.filter(todolist => todolist.id !== id)
        }
        case "create_todolist": {
            const {title, id} = action.payload
            const newTodolist: Todolist = {id: id, title, filter: 'all'}
            return [...todolists, newTodolist]
        }
        case "changeTitle_todolist": {
            const {id, title} = action.payload
            return todolists.map(todolist => todolist.id === id ? {...todolist, title} : todolist)
        }
        case "changeFilter_todolist": {
            const {id, filter} = action.payload
            return todolists.map(todolist => todolist.id === id ? {...todolist, filter} : todolist)
        }
        default:
            return todolists;
    }
}
export const DeleteTodolistAC = (id: string) => {
    return {
        type: "delete_todolist",
        payload: {
            id: id // можно поменять на {id}
        }
    } as const
}
export const createTodolistAC = (title: string) => {
    return {
        type: "create_todolist",
        payload: {
            title,
            id: v1() // можно поменять на {title}
        },
    } as const
}

export const changeTodolistTitleAC = ({id, title}: { id: string, title: string }) => {

    return {
        type: "changeTitle_todolist",
        payload: {
            id: id,
            title: title
        },
    } as const
}

export const changeTodolistFilterAC = ({id, filter}: { id: string, filter: TypeFilters }) => {
    return {
        type: "changeFilter_todolist",
        payload: {
            id: id,
            filter: filter
        } ,
    } as const
}