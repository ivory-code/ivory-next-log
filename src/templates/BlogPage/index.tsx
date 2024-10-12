'use client'

import React, {useEffect, useState} from 'react'

import {getBlogs} from '@/app/api/getBlog'
import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'
import {type Database} from '@/supabase/database.types'

const BlogPage = () => {
  const [blogsData, setBlogsData] = useState<
    Database['public']['Tables']['posts']['Row'][] | null
  >()

  useEffect(() => {
    getBlogs().then(res => {
      if (res) {
        setBlogsData(res)
      }
    })
  }, [])

  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
          {blogsData?.map((data, index) => (
            <BlogCard
              key={index}
              id={data.id}
              title={data.title}
              imageUrl={data.titleImageUrl}
              content={data.content}
            />
          ))}
        </div>
      </Layout>
    </>
  )
}

export default BlogPage
