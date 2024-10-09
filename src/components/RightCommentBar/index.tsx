import {twMerge} from 'tailwind-merge'

import Button from '@/components/Button'
import Profile from '@/components/Profile'
import CommentBox from '@/components/RightCommentBar/CommentBox'

const MOCK_DATA = [
  {
    username: 'khs',
    content:
      'content content content content content content content content content content',
    time: new Date().toDateString(),
    url: '/Blog',
    image: '/images/smileHeart.png',
  },
  {
    username: 'kwon',
    content: 'kwon kwon kwon kwon kwon kwon kwon kwon kwon',
    time: new Date().toDateString(),
    url: '/Blog',
    image: '/images/smileHeart.png',
  },
  {
    username: 'han',
    content: 'han han han han han',
    time: new Date().toDateString(),
    url: '/Blog',
    image: '/images/smileHeart.png',
  },
  {
    username: 'sung',
    content: 'sung sung sung sung sung sung sung',
    time: new Date().toDateString(),
    url: '/Blog',
    image: '/images/smileHeart.png',
  },
  {
    username: 'ivory-code',
    content:
      'ivory-code ivory-code ivory-code ivory-code ivory-code ivory-code ivory-code',
    time: new Date().toDateString(),
    url: '/Blog',
    image: '/images/smileHeart.png',
  },
  {
    username: 'khs-log',
    content: 'khs-log khs-log khs-log khs-log khs-log',
    time: new Date().toDateString(),
    url: '/Blog',
    image: '/images/smileHeart.png',
  },
]

interface Props {
  className?: string
}

const RightCommentBar = ({className}: Props) => {
  return (
    <div
      className={twMerge(
        `absolute top-0 right-0 bottom-0 flex flex-col w-[22.5rem] pt-[8rem] pb-24 bg-n-1 rounded-r-[1.25rem] border-l border-n-3 shadow-[inset_0_1.5rem_3.75rem_rgba(0,0,0,0.1)] 2xl:w-80 lg:rounded-[1.25rem] lg:invisible lg:opacity-0 lg:transition-opacity lg:z-20 lg:border-l-0 lg:shadow-2xl md:fixed md:w-[calc(100%-4rem)] md:border-l md:rounded-none ${className}`,
      )}>
      <div className="absolute top-0 left-0 right-0 flex justify-end items-center h-18 px-9 border-b border-n-3 lg:pr-18 md:pr-16">
        <Profile position="right" />
        <Button
          name="Login"
          onClick={() => console.log('click login button')}
        />
      </div>
      <div className="absolute top-24 left-0 right-0 flex items-center px-9 md:px-6">
        <div className="base2 text-n-4/75">Comment Length</div>
        <div className="ml-3 px-2 bg-n-3 rounded-lg caption1 text-n-4">
          {MOCK_DATA.length}
        </div>
      </div>
      <div className="grow overflow-y-auto scroll-smooth px-6 md:px-3">
        {MOCK_DATA.map((data, index) => {
          return <CommentBox key={index} item={data} />
        })}
      </div>
    </div>
  )
}

export default RightCommentBar
