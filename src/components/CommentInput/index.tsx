import {useState} from 'react'

import Icon from '@/components/Icon'

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
      <input
        className="w-full h-11 pl-11 pr-4 bg-transparent shadow-[inset_0_0_0_0.0625rem_#DADBDC] rounded-full outline-none caption1 text-n-5 transition-shadow focus:shadow-[inset_0_0_0_0.125rem_#0084FF] placeholder:text-n-4"
        type="text"
        name="search"
        placeholder="댓글을 입력해주세요."
        value={commentValue}
        onChange={e => setCommentValue(e.target.value)}
      />
    </div>
  )
}

export default CommentInput
