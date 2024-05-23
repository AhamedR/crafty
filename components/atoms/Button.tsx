import { ButtonHTMLAttributes } from "react"
import { Button as BootstrapButton } from 'react-bootstrap'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger"
  customClass?: ""
}

const Button = ({
  children,
  variant = "primary",
  customClass,
  ...props
}: ButtonProps) => (
    <BootstrapButton variant={`outline-${variant}`} className={customClass} {...props}>
      {children}
    </BootstrapButton>
  )

export default Button
