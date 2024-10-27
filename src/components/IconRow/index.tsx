import Icon, {type IconName} from '@/components/Icon'
import Typography from '@/components/Typography'

export interface IconRowProps {
  name: IconName
  bg: string
}

const IconRow = ({icons, title}: {icons: IconRowProps[]; title: string}) => (
  <div className="mt-6">
    <Typography text={title} className="base2" />
    <div className="flex justify-start gap-x-5">
      {icons.map(icon => (
        <div
          key={icon.name}
          className={`w-12 h-12 rounded ${icon.bg} flex justify-center items-center`}>
          <Icon iconName={icon.name} />
        </div>
      ))}
    </div>
  </div>
)

export default IconRow
