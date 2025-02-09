import {useParams, usePathname} from 'next/navigation'
import {type ReactNode, useCallback, useEffect, useState} from 'react'

import {createComment} from '@/app/api/createComment'
import {deleteComment} from '@/app/api/deleteComment'
import {COMMENT_BAR_BREAKPOINT, SIDE_BAR_BREAKPOINT} from '@/shared/constants'
import {type CommentData} from '@/shared/types'
import {throttle} from '@/shared/utils/throttle'
import {useUser} from '@/store/user'
import HeaderBar from '@/widgets/HeaderBar'
import LeftSideBar from '@/widgets/LeftSideBar/components'
import RightSideBar from '@/widgets/RIghtSideBar/components'

interface Props {
  children: ReactNode
  isMainView?: boolean
}

const Layout = ({children, isMainView = false}: Props) => {
  const params = useParams()
  const pathname = usePathname()
  const user = useUser(state => state.user)

  const [isLeftSideMiniBarVisible, setIsLeftSideMiniBarVisible] =
    useState(false)
  const [isRightSideBarVisible, setIsRightSideBarVisible] = useState(true)
  const [commentsData, setCommentsData] = useState<CommentData[] | null>(null)
  const [blogCommentData, setBlogCommentData] = useState<CommentData[] | null>(
    null,
  )

  const hasValidPathname = pathname !== null && pathname.includes('blog')
  const hasValidParams = params !== null && params.id !== undefined
  const isBlogDetailPage = hasValidPathname && hasValidParams

  // throttle을 통한 리사이즈 이벤트 최적화
  const handleResize = throttle(() => {
    setIsLeftSideMiniBarVisible(window.innerWidth <= SIDE_BAR_BREAKPOINT)
    setIsRightSideBarVisible(window.innerWidth > COMMENT_BAR_BREAKPOINT)
  }, 200)

  // 댓글 데이터 불러오기
  const fetchBlogCommentData = useCallback(async () => {
    try {
      const response = await fetch(`/api/blogDetail?id=${params?.id}`)
      if (!response.ok) throw new Error('Failed to fetch blog comments')

      const result = await response.json()
      setBlogCommentData(result.comments)
    } catch (error) {
      setBlogCommentData([])
    }
  }, [params])

  const fetchCommentsData = useCallback(async () => {
    try {
      const response = await fetch(`/api/blog`)
      if (!response.ok) throw new Error('Failed to fetch comments')

      const result = await response.json()
      setCommentsData(result.comments)
    } catch (error) {
      setCommentsData([])
      // eslint-disable-next-line no-console
      console.error('Error fetching comments:', error)
    }
  }, [])

  const handleCreateComment = useCallback(
    async ({
      username,
      userId,
      content,
    }: {
      username: string
      userId: string
      content: string
    }) => {
      try {
        const newComment = await createComment({
          username,
          userId,
          postId: `${params?.id}`,
          content,
          userRole: user?.role ?? '',
        })

        if (newComment) {
          isBlogDetailPage
            ? setBlogCommentData(prevData =>
                prevData ? [newComment, ...prevData] : [newComment],
              )
            : setCommentsData(prevData =>
                prevData ? [newComment, ...prevData] : [newComment],
              )
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error creating comment:', error)
      }
    },
    [isBlogDetailPage, params, user?.role],
  )

  const handleDeleteComment = useCallback(
    async ({
      userId,
      commentId,
      role,
    }: {
      userId: string
      commentId: string
      role?: string
    }) => {
      try {
        await deleteComment({userId, commentId, role})

        isBlogDetailPage
          ? setBlogCommentData(
              prevData =>
                prevData?.filter(comment => comment.id !== commentId) ?? null,
            )
          : setCommentsData(
              prevData =>
                prevData?.filter(comment => comment.id !== commentId) ?? null,
            )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error deleting comment:', error)
      }
    },
    [isBlogDetailPage],
  )

  const renderRightSideBar = useCallback(() => {
    if (isMainView) return null

    if (isRightSideBarVisible) {
      return (
        <RightSideBar
          data={isBlogDetailPage ? blogCommentData : commentsData}
          user={user}
          className={`${
            !isLeftSideMiniBarVisible &&
            'md:translate-x-64 md:before:absolute md:before:z-30 md:before:inset-0'
          }`}
          createComment={handleCreateComment}
          deleteComment={handleDeleteComment}
          isBlogDetailPage={isBlogDetailPage}
        />
      )
    }

    return null
  }, [
    isMainView,
    isRightSideBarVisible,
    isBlogDetailPage,
    blogCommentData,
    commentsData,
    user,
    isLeftSideMiniBarVisible,
    handleCreateComment,
    handleDeleteComment,
  ])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useEffect(() => {
    if (isBlogDetailPage) {
      fetchBlogCommentData()
      return
    }
    fetchCommentsData()
  }, [fetchBlogCommentData, fetchCommentsData, isBlogDetailPage])

  return (
    <div>
      <div
        className={`pr-6 bg-n-7 md:p-0 md:bg-n-1 md:overflow-hidden ${
          isLeftSideMiniBarVisible ? 'pl-24 md:pl-0' : 'pl-80 xl:pl-24 md:pl-0'
        }`}>
        <LeftSideBar
          user={user}
          isLeftSideBarVisible={isLeftSideMiniBarVisible}
        />
        <HeaderBar user={user} />
        <div className="flex py-6 md:py-0 h-screen">
          <div
            className={`relative flex grow max-w-full bg-n-1 rounded-[1.25rem] ${
              isMainView || !isRightSideBarVisible
                ? 'pr-0'
                : 'pr-[22.5rem] 2xl:pr-80 lg:pr-0'
            }`}>
            <div className="relative z-2 grow p-10 space-y-10 overflow-y-auto scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
              <div className="relative flex flex-col grow max-w-full md:pt-18">
                {children}
              </div>
            </div>
            {renderRightSideBar()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
