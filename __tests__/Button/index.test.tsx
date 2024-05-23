import Button from '@/components/atoms/Button'
import { render, screen } from '@testing-library/react'


test('renders a button with correct variant and text', () => {
  const component = render(<Button variant="secondary">Click me</Button>)

  const buttonElement = screen.getByText('Click me')

  expect(buttonElement).toBeInTheDocument()
  expect(buttonElement).toHaveClass('btn-outline-secondary')
  expect(component).toMatchSnapshot()
})

test('renders a button with custom class', () => {
  const component = render(<Button className="custom-button">Click me</Button>)

  const buttonElement = screen.getByText('Click me')

  expect(buttonElement).toBeInTheDocument()
  expect(buttonElement).toHaveClass('custom-button')
  expect(component).toMatchSnapshot()
})
