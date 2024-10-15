import Icon, {type IconName} from '@/components/Icon'

interface Props {
  type?: 'submit' | 'reset' | 'button'
  buttonClassName?: string
  iconClassName?: string
  iconName: IconName
  onClick?: () => void
}

const IconButton = ({
  iconName,
  buttonClassName,
  iconClassName,
  onClick,
  type = 'button',
}: Props) => {
  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      <Icon iconName={iconName} className={iconClassName} />
    </button>
  )
}

export default IconButton
