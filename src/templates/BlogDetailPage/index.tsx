'use client'

import axios from 'axios'
import {useParams} from 'next/navigation'
import {Suspense, useCallback, useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'
import {twMerge} from 'tailwind-merge'

import {addFavorite} from '@/app/api/addFavorite'
import {deleteFavorite} from '@/app/api/deleteFavorite'
import {getBlogFavorite} from '@/app/api/getFavorite'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Image from '@/components/Image'
import Layout from '@/components/Layout'
import MarkdownView from '@/components/MarkdownView'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

import type React from 'react'

const BlogDetailPage = () => {
  const params = useParams()
  const user = useUser(state => state.user)

  const [blogDetailData, setBlogDetailData] = useState<
    Database['public']['Tables']['posts']['Row'] | null
  >(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [htmlContent, setHtmlContent] = useState('')

  const convertMarkdownToHtml = useCallback(async (markdownBody: string) => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [])

  const fetchBlogDetailData = useCallback(async () => {
    const res = await axios(`/api/BlogDetail?id=${params.id}`)
    const data = await res.data

    setBlogDetailData(data.post)
  }, [params.id])

  const fetchFavoriteData = useCallback(async () => {
    if (params.id.length === 0) {
      return
    }

    const data = await getBlogFavorite({blogId: `${params.id}`})

    if (data?.length !== 0) {
      setIsBookmarked(true)
    }
  }, [params.id])

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()

      if (!user?.id || !blogDetailData?.title || params.id.length === 0) {
        return
      }

      if (isBookmarked) {
        await deleteFavorite({userId: user.id, blogId: `${params.id}`})
        setIsBookmarked(false)
        return
      }

      await addFavorite({
        userId: user.id,
        blogId: `${params.id}`,
        blogTitle: blogDetailData.title,
      })
      setIsBookmarked(true)
    },
    [blogDetailData?.title, isBookmarked, params.id, user?.id],
  )

  useEffect(() => {
    if (params.id) {
      void fetchBlogDetailData()

      void fetchFavoriteData()
    }
  }, [fetchBlogDetailData, fetchFavoriteData, params.id])

  useEffect(() => {
    if (blogDetailData?.content) {
      void convertMarkdownToHtml(blogDetailData.content)
    }
  }, [blogDetailData?.content, convertMarkdownToHtml])

  return (
    <Layout>
      <Suspense fallback={<Typography text="Loading..." />}>
        {blogDetailData ? (
          <>
            {blogDetailData.titleImageUrl && (
              <div className="relative w-full aspect-[2.4]">
                <Image
                  className="rounded-xl object-cover"
                  src={blogDetailData.titleImageUrl}
                  fill
                  alt="blogDetailImage"
                  priority
                />
              </div>
            )}
            <div>
              <div className="flex justify-between items-center">
                <Typography
                  text={blogDetailData.title}
                  className="mt-4 h3 leading-[4rem] 2xl:mb-2 2xl:h4 font-black"
                />
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className={twMerge('btn-small hover:bg-accent-2')}>
                  <Icon
                    iconName={isBookmarked ? 'favoriteFilled' : 'favorite'}
                    className="fill-accent-6 w-8 h-8"
                  />
                </Button>
              </div>
              <MarkdownView
                content={htmlContent}
                className="mt-4 body2 font-semibold text-n-6"
              />
            </div>
          </>
        ) : (
          <Typography text="No blog data found." />
        )}
      </Suspense>
    </Layout>
  )
}

export default BlogDetailPage
