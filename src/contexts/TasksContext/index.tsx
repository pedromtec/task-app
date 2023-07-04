import { ReactNode, createContext, useContext, useState } from 'react'
import { Task } from '../../types'
import { generateId } from '../../helpers'

type TasksContextType = {
  tasks: Task[]
  addTask: (taskDescription: string) => void
  deleteTask: (taskId: string) => void
  updateTask: (taskId: string) => void
}

const TasksContext = createContext({} as TasksContextType)

type TasksProviderProps = {
  children: ReactNode
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (taskDescription: string): void => {
    const newTask = {
      id: generateId(),
      description: taskDescription,
      isCompleted: false,
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const deleteTask = (taskId: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const updateTask = (taskId: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        }
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }),
    )
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks(): TasksContextType {
  const context = useContext(TasksContext)

  return context
}
