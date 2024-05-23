import { Form } from 'react-bootstrap'

interface SelectProps {
  label: string,
  value: string,
  options: Array<{ value: string; label: string; }>,
  onChange: (value: string) => void
}

const Select = ({ label, value, onChange, options }: SelectProps) => {
  return (
    <Form.Group className="mb-3" controlId={`formBasic${label}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Select value={value} onChange={(e) => onChange(e.target.value)}>
        {
          options.map(option =>
            <option key={option.value} value={option.value}>{option.label}</option>
          )
        }
      </Form.Select>
    </Form.Group>
  )
}

export default Select
