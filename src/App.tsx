import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";


export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type TypeFilters = 'all'|'active'|'completed'

export const App = () =>  {
  

  // let tasks: Task[] = [
  //   { id: 1, title: 'HTML&CSS', isDone: true },
  //   { id: 2, title: 'JS', isDone: true },
  //   { id: 3, title: 'ReactJS', isDone: false },
  //   { id: 4, title: 'Redux', isDone: false },
  //   { id: 5, title: 'Typescript', isDone: false },
  //   { id: 6, title: 'RTK query', isDone: false },
  // ]

  const [tasks, setTasks] = useState([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ])
    console.log(tasks)
  const deleteTask = (taskId:string) => {
    setTasks(tasks.filter(t=>t.id !== taskId))
  }

  const [filter, setFilter] = useState<TypeFilters>('all')
  let filteredTasks: Task[] = tasks
  if(filter==='active'){
    filteredTasks = filteredTasks.filter(t=> !t.isDone )
  }
  if(filter==='completed'){
    filteredTasks = filteredTasks.filter(t=> t.isDone )
  }
  const changeFilter = (filterValue:TypeFilters)=>{
    setFilter(filterValue)
  }

  const createTask = (title:string) => {
      const newTask: Task = {id: v1(), title, isDone: false}
      const newTasks = [newTask,...tasks]
      setTasks(newTasks)
  }

  return (
      <div className="app">

        <TodolistItem title="What to learn"
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilters={changeFilter}
                      createTask={createTask} />


      </div>
  )
}


