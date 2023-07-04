import { act, renderHook } from '@testing-library/react'
import { describe, it } from 'vitest'
import { TasksProvider, useTasks } from '.'

describe('useTasks()', () => {
  it('should return an empty list of tasks', () => {
    const { result } = renderHook(() => useTasks(), { wrapper: TasksProvider })

    expect(result.current.tasks).toStrictEqual([])
  })

  it('should add a new task', () => {
    const { result } = renderHook(() => useTasks(), { wrapper: TasksProvider })
    const taskDescription = 'new task'
    act(() => {
      result.current.addTask(taskDescription)
    })
    expect(result.current.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: taskDescription,
          isCompleted: false,
        }),
      ]),
    )
  })
})
