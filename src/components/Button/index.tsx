import {type ReactElement} from 'react'

interface Props {
  type?: 'submit' | 'reset' | 'button'
  className?: string
  onClick?: (event: React.FormEvent) => void | Promise<void>
  children: ReactElement
}

const Button = ({className, onClick, type = 'button', children}: Props) => {
  return (
    <button
      className={`btn-dark btn-small ${className}`}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  )
}

export default Button
