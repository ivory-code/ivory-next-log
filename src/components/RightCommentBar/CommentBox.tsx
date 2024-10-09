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
        <div className="truncate caption1 text-pastelBlue font-bold">
          {item.username}
        </div>
      </div>
      <Link className="block mt-2 pl-3" href={item.url}>
        <div className="group py-3 px-3 rounded-xl transition-colors hover:bg-n-3/75 dark:hover:bg-n-5">
          <div className="mt-1 caption1 text-pastelYellow font-medium">
            {item.content}
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="caption2 text-n-4">{item.time}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CommentBox
