import React from 'react'
import { generateId } from '../../helpers'
import { TaskForm } from './components/TaskForm'
import { Tasks } from './components/Tasks'
import styles from './styles.module.css'
import type { Task } from './types'

export function TaskList() {
  const [tasks, setTasks] = React.useState<Task[]>([])

  const handleCreateNewTask = (taskDescription: string): void => {
    const newTask = {
      id: generateId(),
      description: taskDescription,
      isCompleted: false,
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const handleDeleteTask = (taskId: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const handleUpdateTask = (taskId: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          }
        }
        return task
      }),
    )
  }

  return (
    <div className={styles.taskListContainer}>
      <TaskForm onCreateNewTask={handleCreateNewTask} />
      <Tasks
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  )
}
