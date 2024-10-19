import {format, parseISO} from 'date-fns'
import {toZonedTime} from 'date-fns-tz'
import Link from 'next/link'
import {useCallback, useState} from 'react'

import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import TooltipModal from '@/components/TooltipModal'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

interface Props {
  isDisabled?: boolean
  isTooltipVisible?: boolean
  item: Database['public']['Tables']['comments']['Row']
  onClickPositiveButton?: () => void
  onClickNegativeButton?: () => void | Promise<void>
}

const CommentBox = ({
  item,
  isDisabled = false,
  onClickPositiveButton,
  onClickNegativeButton,
}: Props) => {
  const user = useUser(state => state.user)

  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const isDeleteButtonVisible =
    user?.id === item.user_id || user?.role === 'admin'

  const timeZone = 'Asia/Seoul'
  const createdAt = parseISO(item.created_at) // ISO 문자열을 파싱하여 Date 객체로 변환
  const createdAtKST = toZonedTime(createdAt, timeZone) // UTC 시간을 KST로 변환
  const formattedDate = format(createdAtKST, 'yyyy-MM-dd HH:mm:ss') // 원하는 형식으로 포맷팅

  const handleTooltipVisible = useCallback(() => {
    setIsTooltipVisible(!isTooltipVisible)
  }, [isTooltipVisible])

  const handlePositiveButton = useCallback(() => {
    onClickPositiveButton?.()
    setIsTooltipVisible(false)
  }, [onClickPositiveButton])

  const handleNegativeButton = useCallback(() => {
    onClickNegativeButton?.()
    setIsTooltipVisible(false)
  }, [onClickNegativeButton])

  return (
    <div>
      <div className="relative flex flex-row justify-between items-center">
        <Link
          className={`block mt-2 ${isDisabled && 'cursor-default'}`}
          href={isDisabled ? '' : `/BlogDetail/${item.post_id}`}
          onClick={event => isDisabled && event.preventDefault()}>
          <div
            className={`group py-3 px-3 rounded-xl transition-colors ${!isDisabled && 'hover:bg-n-3/75'}`}>
            <div className="truncate base1 font-semibold text-n-6">
              {item.username}
            </div>
            <div className="mt-1 base2 text-n-5">{item.content}</div>
            <div className="flex justify-between items-center mt-2">
              <div className="caption2 text-n-4/75">{formattedDate}</div>
            </div>
          </div>
        </Link>
        {isDeleteButtonVisible && (
          <div>
            <IconButton
              onClick={handleTooltipVisible}
              iconName="delete"
              iconClassName="cursor-pointer fill-accent-1"
              buttonClassName="bg-transparent hover:bg-accent-1/25"
            />
            <TooltipModal
              isModalVisible={isTooltipVisible}
              title="댓글을 삭제하시겠습니까?">
              <Button onClick={handlePositiveButton}>
                <Typography text="예" />
              </Button>
              <Button onClick={handleNegativeButton}>
                <Typography text="아니오" />
              </Button>
            </TooltipModal>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentBox
