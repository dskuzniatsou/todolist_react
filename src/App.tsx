import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

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
export type TypeFilters = 'all'|'active'|'completed'

export const App = () =>  {
  

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
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
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist))
  }


  const createTask = (todolistId: string, title: string) => {
    const newTask = {id: v1(), title, isDone: false}
    const newTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
    setTasks(newTasks)
  }
  const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const newTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task),
    }
    setTasks(newTasks)
  }
  // const changeStatus = (taskId: string, isDone: boolean)=>{
  //   let task= tasks.find(t=> t.id===taskId);
  //   if (task) {
  //     task.isDone = isDone;
  //   }
  //
  //   setTasks([...tasks])
  // }
  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

return (
      <div className="app">
        {todolists.map(todolist => {
          const todolistTasks = tasks[todolist.id]
          let filteredTasks = todolistTasks
          if (todolist.filter === 'active') {
            filteredTasks = todolistTasks.filter(task => !task.isDone)
          }
          if (todolist.filter === 'completed') {
            filteredTasks = todolistTasks.filter(task => task.isDone)
          }
          return (
              <TodolistItem key={todolist.id}
                            todolist={todolist}
                            tasks={filteredTasks}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            createTask={createTask}
                            changeStatus={changeStatus}
                            deleteTodolist={deleteTodolist}
              />
          )
        })}
      </div>
  )
}


