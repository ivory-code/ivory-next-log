interface Props {
  buttonName: string
  type?: 'submit' | 'reset' | 'button'
  className?: string
  onClick?: () => void
}

const Button = ({buttonName, className, onClick, type = 'button'}: Props) => {
  return (
    <button
      className={`btn-dark btn-small ${className}`}
      onClick={onClick}
      type={type}>
      {buttonName}
    </button>
  )
}

export default Button
