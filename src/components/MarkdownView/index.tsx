interface Props {
  content: string
  className?: string
}

const MarkdownView = ({content, className}: Props) => {
  return (
    <div
      className={`${className}`}
      dangerouslySetInnerHTML={{__html: content.replace(/\n/g, '<br />')}}
    />
  )
}

export default MarkdownView
