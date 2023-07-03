import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { TaskForm, TaskFromProps } from '..'

const props: TaskFromProps = {
  onCreateNewTask: vi.fn(),
}

const createTaskPlaceHolder = 'Adicione uma nova tarefa'
describe('<TaskForm/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  it('should render the task form', () => {
    render(<TaskForm {...props} />)

    expect(screen.getByPlaceholderText(createTaskPlaceHolder)).toBeVisible()
  })

  it('should be possible to create a new task', () => {
    render(<TaskForm {...props} />)
    const newTaskText = 'new task'
    const createTaskInput = screen.getByPlaceholderText(createTaskPlaceHolder)

    fireEvent.change(createTaskInput, { target: { value: newTaskText } })

    const createTaskButton = screen.getByRole('button')

    fireEvent.click(createTaskButton)
    expect(props.onCreateNewTask).toHaveBeenCalledTimes(1)
    expect(props.onCreateNewTask).toHaveBeenCalledWith(newTaskText)

    expect(createTaskInput).toHaveValue('')
  })

  it('should not be possible to create a new task if the input is empty', () => {
    render(<TaskForm {...props} />)
    const createTaskButton = screen.getByRole('button')
    fireEvent.click(createTaskButton)
    expect(props.onCreateNewTask).not.toHaveBeenCalled()
  })
})
