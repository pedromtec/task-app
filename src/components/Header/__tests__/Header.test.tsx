import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { Header } from '..'

describe('<Header />', () => {
  it('should render correctly', () => {
    render(<Header />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
