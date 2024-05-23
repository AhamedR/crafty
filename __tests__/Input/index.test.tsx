import { render, screen, fireEvent } from '@testing-library/react'
import Input from '@/components/atoms/Input'

describe('Input component', () => {
  test('renders with correct label and placeholder', () => {
    const label = 'Username'
    const placeholder = 'Enter your username'
    const onChange = jest.fn()

    const component = render(
      <Input
        label={label}
        value=""
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    )

    const inputElement = screen.getByPlaceholderText(placeholder)
    expect(screen.getByLabelText(label)).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(component).toMatchSnapshot()
  })

  test('calls onChange callback when input value changes', () => {
    const onChange = jest.fn()

    const component = render(
      <Input
        label="Email"
        value=""
        type="email"
        placeholder="Enter your email"
        onChange={onChange}
      />
    )

    const inputElement = screen.getByPlaceholderText('Enter your email')
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('test@example.com')
    expect(component).toMatchSnapshot()
  })

  test('displays invalid feedback when isInvalid prop is true', () => {
    const label = 'Password'
    const invalidMessage = 'Please enter a valid password.'

    const component = render(
      <Input
        label={label}
        value=""
        type="password"
        placeholder="Enter your password"
        onChange={() => {return}}
        isInvalid
      />
    )

    const invalidFeedback = screen.getByText(invalidMessage)
    expect(invalidFeedback).toBeInTheDocument()
    expect(component).toMatchSnapshot()
  })
})
