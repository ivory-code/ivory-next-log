'use client'

import axios from 'axios'
import React, {useCallback, useEffect, useState} from 'react'

import {deleteBlog} from '@/app/api/deleteBlog'
import BlogEdit from '@/components/BlogEdit'
import BlogList from '@/components/BlogList'
import Button from '@/components/Button'
import EditProfile from '@/components/EditProfile'
import Icon from '@/components/Icon'
import IconButton from '@/components/IconButton'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import TooltipModal from '@/components/TooltipModal'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

const BlogDashBoardPage = () => {
  const user = useUser(state => state.user)

  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false)
  const [isBlogDetailVisible, setIsBlogDetailVisible] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [blogsData, setBlogsData] = useState<
    Database['public']['Tables']['posts']['Row'][]
  >([])
  const [selectedBlog, setSelectedBlog] = useState<
    Database['public']['Tables']['posts']['Row'] | null
  >(null)

  const handleEditProfile = useCallback(() => {
    setIsEditProfileVisible(!isEditProfileVisible)
  }, [isEditProfileVisible])

  const handleBlogDetail = useCallback(
    (blog: Database['public']['Tables']['posts']['Row']) => {
      setSelectedBlog(blog)
      setIsBlogDetailVisible(true)
    },
    [],
  )

  const closeBlogDetailModal = useCallback(() => {
    setIsBlogDetailVisible(false)
  }, [])

  const fetchBlogsData = useCallback(async () => {
    const res = await axios(`/api/BlogDashBoard`)
    const data = await res.data.blogsData

    setBlogsData(data)
  }, [])

  const handleTooltipVisible = useCallback(() => {
    setIsTooltipVisible(!isTooltipVisible)
  }, [isTooltipVisible])

  const handleDeleteBlog = useCallback(
    async (blogId: string) => {
      await deleteBlog({
        userId: user?.id ?? '',
        blogId,
        role: user?.role ?? '',
      })

      setBlogsData(prevData => prevData.filter(blog => blog.id !== blogId))
      setIsTooltipVisible(false)
    },
    [user?.id, user?.role],
  )

  useEffect(() => {
    void fetchBlogsData()
  }, [fetchBlogsData])

  return (
    <div>
      <Layout>
        <Button
          onClick={handleEditProfile}
          className="group w-1/2 h-15 flex justify-center items-center m-3 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5">
          <div>
            <Icon
              className="relative z-1"
              iconName="blog"
              fill="fill-accent-3"
            />
            <Typography text="홈 추가/수정" className="base2 " />
          </div>
        </Button>
        {blogsData.length > 0
          ? blogsData.map(data => (
              <div
                key={`${data.id}`}
                className="flex justify-between items-center">
                <BlogList
                  onClick={() => handleBlogDetail(data)}
                  title={data.title}
                  isAdmin
                />
                <IconButton
                  buttonClassName="ml-4 fill-accent-1 transition-colors items-center bg-transparent"
                  iconName="delete"
                  onClick={handleTooltipVisible}
                />
                <TooltipModal
                  isModalVisible={isTooltipVisible}
                  title="게시글을 삭제하시겠습니까?">
                  <Button onClick={() => handleDeleteBlog(data.id)}>
                    <Typography text="예" />
                  </Button>
                  <Button onClick={handleTooltipVisible}>
                    <Typography text="아니오" />
                  </Button>
                </TooltipModal>
              </div>
            ))
          : null}
      </Layout>
      <Modal
        classWrap="max-w-[48rem] md:min-h-screen-ios md:rounded-none"
        isVisible={isEditProfileVisible}
        onClose={handleEditProfile}>
        <EditProfile />
      </Modal>
      {selectedBlog && (
        <Modal
          classWrap="max-w-[48rem] md:min-h-screen-ios md:rounded-none"
          isVisible={isBlogDetailVisible}
          onClose={closeBlogDetailModal}>
          {selectedBlog && (
            <BlogEdit
              blogData={selectedBlog}
              onClose={() => setIsBlogDetailVisible(false)}
              refreshBlogs={fetchBlogsData}
            />
          )}
        </Modal>
      )}
    </div>
  )
}

export default BlogDashBoardPage
