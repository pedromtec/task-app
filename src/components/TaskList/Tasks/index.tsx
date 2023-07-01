import React from 'react'
import { Task as TaskType } from '../types'
import { EmptyTasks } from './EmptyTasks'
import styles from './styles.module.css'
import { Task } from './Task'

export type TasksProps = {
  tasks: TaskType[]
  onDeleteTask: (taskId: string) => void
  onUpdateTask: (taskId: string) => void
}

export function Tasks({ tasks, onDeleteTask, onUpdateTask }: TasksProps) {
  const tasksQuantity = tasks.length
  const completedTasks = React.useMemo(
    () => tasks.filter((task) => task.isCompleted).length,
    [tasks],
  )

  return (
    <div className={styles.tasksContainer}>
      <header>
        <div className={styles.info}>
          <p className={styles.createdTasks}>Todas criadas</p>
          <span>{tasksQuantity}</span>
        </div>

        <div className={styles.info}>
          <p className={styles.completedTasks}>Concluídas</p>
          <span>
            {completedTasks} de {tasksQuantity}
          </span>
        </div>
      </header>

      {!tasksQuantity && <EmptyTasks />}

      {!!tasksQuantity && (
        <div className={styles.tasks}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}
