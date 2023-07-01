import classnames from 'classnames'
import { Trash } from 'phosphor-react'
import type { Task as TaskType } from '../types'
import styles from './styles.module.css'

type TaskProps = {
  task: TaskType
  onUpdateTask: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
}

export function Task({ task, onDeleteTask, onUpdateTask }: TaskProps) {
  return (
    <div className={styles.task}>
      <div className={styles.taskContent}>
        <input
          data-testid={`task-${task.id}`}
          checked={task.isCompleted}
          onChange={() => {
            onUpdateTask(task.id)
          }}
          id={task.id}
          type="checkbox"
        />
        <label
          htmlFor={task.id}
          className={classnames({ [styles.taskCompleted]: task.isCompleted })}
        >
          {task.description}
        </label>
      </div>

      <button
        data-testid={`delete-task-${task.id}`}
        className={styles.deleteTask}
        onClick={() => {
          onDeleteTask(task.id)
        }}
      >
        <Trash color="#808080" size={18} />
      </button>
    </div>
  )
}
