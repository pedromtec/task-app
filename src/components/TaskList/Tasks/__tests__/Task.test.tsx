import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, it, vi } from 'vitest'
import { Task } from '../Task'

const props = {
  task: {
    id: 'id-task',
    description: 'Task example',
    isCompleted: false,
  },
  onUpdateTask: vi.fn(),
  onDeleteTask: vi.fn(),
}

describe('<Task />', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should render the task description correctly', () => {
    render(<Task {...props} />)

    expect(screen.getByText(props.task.description)).toBeInTheDocument()
  })

  it('should render the task completed when isCompleted=true', () => {
    render(<Task {...props} task={{ ...props.task, isCompleted: true }} />)

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('should render the task not completed when isCompleted=false', () => {
    render(<Task {...props} />)

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('should call onUpdateTask when the task is clicked', () => {
    render(<Task {...props} />)
    const task = screen.getByRole('checkbox')
    fireEvent.click(task)
    expect(props.onUpdateTask).toHaveBeenCalledTimes(1)
    expect(props.onUpdateTask).toHaveBeenCalledWith(props.task.id)
  })

  it('should call onDeleteTask when delete button is clicked', () => {
    render(<Task {...props} />)
    const deleteButton = screen.getByRole('button')
    fireEvent.click(deleteButton)
    expect(props.onDeleteTask).toHaveBeenCalledTimes(1)
    expect(props.onDeleteTask).toHaveBeenCalledWith(props.task.id)
  })
})
