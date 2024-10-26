import {useCallback, useState} from 'react'

import Icon from '@/components/Icon'
import Input from '@/components/Input'

interface Props {
  onClick: (content: string) => Promise<void>
}

const CommentInput = ({onClick}: Props) => {
  const [commentValue, setCommentValue] = useState('')

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      await onClick(commentValue)
      setCommentValue('') // 제출 후 입력 필드 초기화
    },
    [commentValue, onClick],
  )

  return (
    <div className="relative md:w-full md:mr-0">
      <div className="group absolute top-3 left-4 text-0 w-5 h-5">
        <Icon
          className="w-5 h-5 fill-n-4/50 transition-colors group-hover:fill-n-7 dark:group-hover:fill-n-3"
          iconName="search"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          value={commentValue}
          onChange={e => setCommentValue(e.target.value)}
          placeholder="댓글을 입력해주세요."
        />
      </form>
    </div>
  )
}

export default CommentInput
