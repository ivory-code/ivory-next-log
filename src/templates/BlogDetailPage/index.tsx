'use client'

import {useParams} from 'next/navigation'
import React, {Suspense, useCallback, useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

import Image from '@/components/Image'
import Layout from '@/components/Layout'
import MarkdownView from '@/components/MarkdownView'
import Typography from '@/components/Typography'
import {type Database} from '@/supabase/database.types'

const BlogDetailPage = () => {
  const params = useParams()
  const [blogDetailData, setBlogDetailData] = useState<
    Database['public']['Tables']['posts']['Row'] | null
  >(null)
  const [htmlContent, setHtmlContent] = useState('')

  const convertMarkdownToHtml = useCallback(async (markdownBody: string) => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [])

  const fetchBlogDetailData = useCallback(async () => {
    const res = await fetch(`/api/BlogDetail?id=${params.id}`)
    const data = await res.json()

    setBlogDetailData(data)
  }, [params.id])

  useEffect(() => {
    if (params.id) {
      void fetchBlogDetailData()
    }
  }, [fetchBlogDetailData, params.id])

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
              <Typography
                text={blogDetailData.title}
                className="mt-4 h3 leading-[4rem] 2xl:mb-2 2xl:h4 font-black"
              />
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
