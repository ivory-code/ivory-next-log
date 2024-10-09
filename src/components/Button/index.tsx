interface Props {
  name: string
  className?: string
  onClick: () => void
}

const Button = ({name, className, onClick}: Props) => {
  return (
    <button className={`btn-dark btn-small ${className}`} onClick={onClick}>
      {name}
    </button>
  )
}

export default Button
