import {usePathname} from 'next/navigation'
import {useCallback} from 'react'
import {twMerge} from 'tailwind-merge'

import CommentInput from '@/components/CommentInput'
import LoginForm from '@/components/LoginForm'
import CommentBox from '@/components/RightCommentBar/CommentBox'
import {type User} from '@/store/user'
import {type Database} from '@/supabase/database.types'

interface Props {
  data: Database['public']['Tables']['comments']['Row'][] | []
  user: User | null
  className?: string
  createComment?: ({
    username,
    userId,
    content,
  }: {
    username: string
    userId: string
    content: string
  }) => Promise<void>
  isBlogDetailPage?: boolean
}

const RightCommentBar = ({
  data,
  user,
  className,
  createComment,
  isBlogDetailPage = true,
}: Props) => {
  const pathname = usePathname()

  const isBlogPage = pathname === '/Blog'

  const handleInput = useCallback(
    async (content: string) => {
      if (createComment) {
        await createComment({
          username: user?.nickname ?? '',
          userId: user?.id ?? '',
          content,
        })
      }
    },
    [createComment, user?.id, user?.nickname],
  )

  return (
    <div
      className={twMerge(
        `absolute top-0 right-0 bottom-0 flex flex-col w-[22.5rem] pt-[8rem] ${!isBlogPage && 'pb-24'}  bg-n-1 rounded-r-[1.25rem] border-l border-n-3 shadow-[inset_0_1.5rem_3.75rem_rgba(0,0,0,0.1)] 2xl:w-80 lg:rounded-[1.25rem] lg:invisible lg:opacity-0 lg:transition-opacity lg:z-20 lg:border-l-0 lg:shadow-2xl md:fixed md:w-[calc(100%-4rem)] md:border-l md:rounded-none ${className}`,
      )}>
      <LoginForm className="absolute top-0 left-0 right-0 flex justify-end items-center h-18 px-9 border-b border-n-3 lg:pr-18 md:pr-16" />
      <div className="absolute top-24 left-0 right-0 flex items-center px-9 md:px-6">
        <div className="base2 text-n-4/75">Comment Length</div>
        <div className="ml-3 px-2 bg-n-3 rounded-lg caption1 text-n-4">
          {data?.length}
        </div>
      </div>
      <div className="grow overflow-y-auto scroll-smooth items-center px-6 md:px-3">
        {data?.map((data, index) => {
          return (
            <CommentBox key={index} item={data} isDisabled={isBlogDetailPage} />
          )
        })}
      </div>
      {!isBlogPage && (
        <div className="absolute left-0 right-0 bottom-0 p-6">
          <CommentInput onClick={handleInput} />
        </div>
      )}
    </div>
  )
}

export default RightCommentBar
