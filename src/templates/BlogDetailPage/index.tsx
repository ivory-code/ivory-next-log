'use client'

import {useParams} from 'next/navigation'
import React, {Suspense, useEffect, useState} from 'react'

import Image from '@/components/Image'
import Layout from '@/components/Layout'
import Typography from '@/components/Typography'

interface Blog {
  id: number
  title: string
  content: string
  image: string
}

const BlogDetailPage = () => {
  const params = useParams()
  const [blogs, setBlogs] = useState<Blog[]>([])

  const selectedBlog = blogs.find(blog => blog.id === Number(params.id))

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/BlogDetail')
      const data: Blog[] = await response.json()
      setBlogs(data)
    }

    void fetchBlogs()
  }, [])

  return (
    <Layout>
      <Suspense fallback={<Typography text="Loading..." />}>
        {selectedBlog && (
          <>
            <div className="relative w-full aspect-[2.4]">
              <Image
                className="rounded-xl object-cover"
                src={selectedBlog.image}
                fill
                alt="blogDetailImage"
                priority
              />
            </div>
            <div>
              <Typography
                text={selectedBlog.title}
                className="mt-4 h3 leading-[4rem] 2xl:mb-2 2xl:h4 font-black"
              />
              <Typography
                text={selectedBlog.content}
                className="mt-4 body2 font-semibold text-n-6"
              />
            </div>
          </>
        )}
      </Suspense>
    </Layout>
  )
}

export default BlogDetailPage
