'use client'

import {useParams} from 'next/navigation'
import {useState, useEffect, useCallback, type FormEvent} from 'react'
import {twMerge} from 'tailwind-merge'

import {addFavorite} from '@/app/api/addFavorite'
import {deleteFavorite} from '@/app/api/deleteFavorite'
import {getBlogFavorite} from '@/app/api/getFavorite'
import MarkdownView from '@/features/blog/components/MarkdownView'
import BlogDetailPageSkeleton from '@/pages/BlogDetailPage/ui/BlogDetailPageSkeleton'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import Image from '@/shared/components/Image'
import Typography from '@/shared/components/Typography'
import {type BlogData, type FavoriteData} from '@/shared/types'
import {useUser} from '@/store/user'
import Layout from '@/widgets/Layout/components'

export const runtime = 'experimental-edge'

const BlogDetailPage = () => {
  const params = useParams()
  const user = useUser(state => state.user)

  const [blogDetailData, setBlogDetailData] = useState<BlogData | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [blogContent, setBlogContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const blogId = `${params?.id}`

  const fetchBlogDetailData = useCallback(async () => {
    if (!blogId) return
    setIsLoading(true)
    try {
      const response = await fetch(`/api/blogDetail?id=${blogId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch blog detail')
      }
      const result = await response.json()
      setBlogDetailData(result.post)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch blog detail:', error)
    } finally {
      setIsLoading(false)
    }
  }, [blogId])

  const fetchFavoriteData = useCallback(async () => {
    if (!blogId || !user?.id) return

    setIsLoading(true)
    try {
      const data = await getBlogFavorite({blogId})
      if (data) {
        const favorite = data.find(
          (fav: FavoriteData) =>
            fav.post_id === blogId && fav.user_id === user.id,
        )
        setIsBookmarked(!!favorite)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching favorites:', error)
    } finally {
      setIsLoading(false)
    }
  }, [blogId, user?.id])

  const handleDeleteFavorite = useCallback(async () => {
    if (!blogId || !user?.id || !blogDetailData?.title) return

    try {
      if (isBookmarked) {
        await deleteFavorite({userId: user.id, blogId})
        setIsBookmarked(false)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error removing favorite:', error)
    }
  }, [blogDetailData?.title, blogId, isBookmarked, user?.id])

  const handleAddFavorite = useCallback(async () => {
    if (!user?.id || !blogDetailData?.title) return

    try {
      await addFavorite({
        userId: user.id,
        blogId,
        blogTitle: blogDetailData.title,
      })
      setIsBookmarked(true)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding favorite:', error)
    }
  }, [blogDetailData?.title, blogId, user?.id])

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()

      if (!user?.id || !blogDetailData?.title) return

      if (isBookmarked) {
        await handleDeleteFavorite()
      } else {
        await handleAddFavorite()
      }
    },
    [
      handleAddFavorite,
      blogDetailData?.title,
      handleDeleteFavorite,
      isBookmarked,
      user?.id,
    ],
  )

  useEffect(() => {
    if (blogId) {
      fetchBlogDetailData()
      fetchFavoriteData()
    }
  }, [blogId, fetchBlogDetailData, fetchFavoriteData])

  useEffect(() => {
    if (blogDetailData?.content) {
      setBlogContent(blogDetailData.content)
    }
  }, [blogDetailData?.content])

  return (
    <Layout>
      {isLoading ? (
        <BlogDetailPageSkeleton />
      ) : (
        <div>
          {blogDetailData?.titleImageUrl && (
            <div className="relative w-full aspect-[2.4] flex justify-center">
              <Image
                className="rounded-xl object-cover"
                src={blogDetailData.titleImageUrl}
                width={700}
                height={400}
                alt="blogDetailImage"
                priority
              />
            </div>
          )}
          <div>
            <div className="flex justify-between items-center">
              <Typography
                text={blogDetailData?.title ?? ''}
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
              content={blogContent}
              className="mt-4 body2 font-semibold text-n-6"
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default BlogDetailPage
