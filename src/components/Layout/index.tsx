import axios from 'axios'
import {useParams, usePathname} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

import {createComment} from '@/app/api/createComment'
import LeftSideBar from '@/components/LeftSideBar'
import RightCommentBar from '@/components/RightCommentBar'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

interface Props {
  children: React.ReactNode
  isMainView?: boolean
}

const Layout = ({children, isMainView = false}: Props) => {
  const params = useParams()
  const pathname = usePathname()

  const user = useUser(state => state.user)

  const [isSideBarVisible, setIsSideBarVisible] = useState(false)
  const [isRightSideBarVisible, setIsRightSideBarVisible] = useState(true)
  const [commentsData, setCommentsData] = useState<
    Database['public']['Tables']['comments']['Row'][] | []
  >([])
  const [blogCommentData, setBlogCommentData] = useState<
    Database['public']['Tables']['comments']['Row'][] | []
  >([])

  const isBlogDetailPage = pathname.includes('Blog') && params.id !== undefined

  const handleResize = () => {
    if (window.innerWidth <= 1179) {
      setIsSideBarVisible(true)
    } else {
      setIsSideBarVisible(false)
    }

    if (window.innerWidth <= 1024) {
      setIsRightSideBarVisible(false)
    } else {
      setIsRightSideBarVisible(true)
    }
  }

  const fetchBlogCommentData = useCallback(async () => {
    const res = await axios(`/api/BlogDetail?id=${params.id}`)
    const data = await res.data

    setBlogCommentData(data.comments)
  }, [params.id])

  const fetchCommentsData = useCallback(async () => {
    const res = await axios(`/api/Blog`)
    const data = await res.data

    setCommentsData(data.comments)
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
      await createComment({username, userId, blogId: `${params.id}`, content})
    },
    [params.id],
  )

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isBlogDetailPage) {
      void fetchBlogCommentData()

      return
    }
    void fetchCommentsData()
  }, [fetchBlogCommentData, fetchCommentsData, isBlogDetailPage])

  return (
    <div>
      <div
        className={`pr-6 bg-n-7 md:p-0 md:bg-n-1 md:overflow-hidden ${
          isSideBarVisible ? 'pl-24 md:pl-0' : 'pl-80 xl:pl-24 md:pl-0'
        }`}>
        <LeftSideBar user={user} isLeftSideBarVisible={isSideBarVisible} />
        <div className="flex py-6 md:py-0 h-screen">
          <div
            className={`relative flex grow max-w-full bg-n-1 rounded-[1.25rem] ${isMainView || !isRightSideBarVisible ? 'pr-0' : 'pr-[22.5rem] 2xl:pr-80 lg:pr-0'}`}>
            <div className="relative z-2 grow p-10 space-y-10 overflow-y-auto scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
              <div className="relative flex flex-col grow max-w-full md:pt-18">
                {children}
              </div>
            </div>
            {isMainView ||
              (isRightSideBarVisible && (
                <RightCommentBar
                  data={isBlogDetailPage ? blogCommentData : commentsData}
                  user={user}
                  className={`${!isSideBarVisible && 'md:translate-x-64 md:before:absolute md:before:z-30 md:before:inset-0'}`}
                  createComment={handleCreateComment}
                  isBlogDetailPage={isBlogDetailPage}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
