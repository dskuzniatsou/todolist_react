import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import CreateItemForm from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {NavButton} from './NavButton'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import {Box, Paper} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {amber, yellow} from '@mui/material/colors';

export type TasksState = {
    [key: string]: Task[]
}

export type Todolist = {
    id: string
    title: string
    filter: TypeFilters

}

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type TypeFilters = 'all' | 'active' | 'completed'
type ThemeMode = 'dark' | 'light'

export const App = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            // primary: {
            //     main: '#7bc1d8',
            //
            // },
            primary: yellow,
            secondary: amber,
        },
    })


    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })


    const deleteTask = (todolistId: string, taskId: string) => {
        const newTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId),
        }
        setTasks(newTasks)
    }


    const changeFilter = (todolistId: string, filter: TypeFilters) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }


    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTasks)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
    }

// @ts-ignore
    // @ts-ignore
    return (

            <div className="app">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth="lg"
                                   sx={{display: "flex", flexDirection: "row", justifyContent: 'space-between'}}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
                            </Box>

                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={"lg"}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm createItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={10}>
                        {todolists.map(todolist => {
                            const todolistTasks = tasks[todolist.id]
                            let filteredTasks = todolistTasks
                            if (todolist.filter === 'active') {
                                filteredTasks = todolistTasks.filter(task => !task.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = todolistTasks.filter(task => task.isDone)
                            }
                            return (<Grid key={todolist.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}} elevation={7}>

                                        <TodolistItem key={todolist.id}
                                                      todolist={todolist}
                                                      tasks={filteredTasks}
                                                      deleteTask={deleteTask}
                                                      changeFilter={changeFilter}
                                                      createTask={createTask}
                                                      changeTaskStatus={changeTaskStatus}
                                                      deleteTodolist={deleteTodolist}
                                                      changeTaskTitle={changeTaskTitle}
                                                      changeTodolistTitle={changeTodolistTitle}
                                        />

                                    </Paper>
                                </Grid>

                            )
                        })}
                    </Grid>
                </Container>
                </ThemeProvider>
            </div>

    )
}


