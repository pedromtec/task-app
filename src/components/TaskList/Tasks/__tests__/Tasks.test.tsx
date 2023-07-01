import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, it, vi } from 'vitest'
import { Tasks, TasksProps } from '..'

const props: TasksProps = {
  tasks: [
    {
      id: 'task-id-1',
      description: 'Task one',
      isCompleted: false,
    },
    {
      id: 'task-id-2',
      description: 'Task two',
      isCompleted: true,
    },
  ],
  onUpdateTask: vi.fn(),
  onDeleteTask: vi.fn(),
}

describe('<Tasks />', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should render all tasks', () => {
    render(<Tasks {...props} />)

    expect(screen.getAllByRole('checkbox')).toHaveLength(props.tasks.length)

    for (const task of props.tasks) {
      expect(
        screen.getByRole('checkbox', { name: task.description }),
      ).toBeVisible()
    }
  })

  it('should display an empty state message when has no task', () => {
    render(<Tasks {...props} tasks={[]} />)
    const emptyStateMessages = {
      title: 'Você ainda não tem tarefas cadastradas',
      subtitle: 'Crie tarefas o organize seus itens a fazer',
    }
    expect(screen.getByText(emptyStateMessages.title)).toBeVisible()
    expect(screen.getByText(emptyStateMessages.subtitle)).toBeVisible()
  })

  it('should display the number of tasks', () => {
    render(<Tasks {...props} />)
    const message = `${props.tasks.length}`
    expect(screen.getByText(message)).toBeVisible()
  })

  it('should display the number of completed tasks', () => {
    render(<Tasks {...props} />)
    const completedTasks = props.tasks.filter((task) => task.isCompleted).length
    const message = `${completedTasks} de ${props.tasks.length}`
    expect(screen.getByText(message)).toBeVisible()
  })

  it('should call onUpdateTask with the correct task clicked', () => {
    const taskTarget = props.tasks[0]
    render(<Tasks {...props} />)
    const task = screen.getByTestId(`task-${taskTarget.id}`)
    fireEvent.click(task)
    expect(props.onUpdateTask).toHaveBeenCalledTimes(1)
    expect(props.onUpdateTask).toHaveBeenCalledWith(taskTarget.id)
  })

  it('should call onDeleteTask with the correct task clicked', () => {
    const taskTarget = props.tasks[0]
    render(<Tasks {...props} />)
    const deleteButton = screen.getByTestId(`delete-task-${taskTarget.id}`)
    fireEvent.click(deleteButton)
    expect(props.onDeleteTask).toHaveBeenCalledTimes(1)
    expect(props.onDeleteTask).toHaveBeenCalledWith(taskTarget.id)
  })
})
