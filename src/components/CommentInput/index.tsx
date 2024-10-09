import {useState} from 'react'

import Icon from '@/components/Icon'
import Input from '@/components/Input'

const CommentInput = () => {
  const [commentValue, setCommentValue] = useState('')

  return (
    <div className="relative md:w-full md:mr-0">
      <div className="group absolute top-3 left-4 text-0 w-5 h-5">
        <Icon
          className="w-5 h-5 fill-n-4/50 transition-colors group-hover:fill-n-7 dark:group-hover:fill-n-3"
          iconName="search"
        />
      </div>
      <Input
        value={commentValue}
        onChange={e => setCommentValue(e.target.value)}
        placeholder="댓글을 입력해주세요."
      />
    </div>
  )
}

export default CommentInput
