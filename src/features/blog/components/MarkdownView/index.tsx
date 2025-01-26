import MDEditor from '@uiw/react-md-editor'
import {twMerge} from 'tailwind-merge'

interface Props {
  content: string
  className?: string
}

const MarkdownView = ({content, className}: Props) => {
  return (
    <div className={twMerge(className)}>
      <MDEditor.Markdown
        source={content}
        style={{background: 'transparent', padding: 10, color: 'GrayText'}}
      />
    </div>
  )
}

export default MarkdownView
