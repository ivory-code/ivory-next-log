import Link from 'next/link'

import Image from '@/components/Image'

type CommentType = {
  username: string
  content: string
  time: string
  url: string
  image: string
}

interface Props {
  item: CommentType
}

const CommentBox = ({item}: Props) => {
  return (
    <div className="relative mt-2">
      <div className="flex items-center space-x-3">
        <div className="relative w-10 h-10 border-2 border-n-4/50 rounded-md overflow-hidden bg-primary-1">
          <Image
            className="object-cover"
            alt="check"
            src="/images/smileHeart.png"
            fill
          />
        </div>
        <div className="truncate base1 font-semibold text-n-6">
          {item.username}
        </div>
      </div>
      <Link className="block mt-2 pl-3" href={item.url}>
        <div className="group py-3 px-3 rounded-xl transition-colors hover:bg-n-3/75">
          <div className="mt-1 base2 text-n-5">{item.content}</div>
          <div className="flex justify-between items-center mt-2">
            <div className="caption2 text-n-4/75">{item.time}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CommentBox
