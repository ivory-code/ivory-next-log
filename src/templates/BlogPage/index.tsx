'use client'

import axios from 'axios'
import React, {useCallback, useEffect, useState} from 'react'

import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'
import {type Database} from '@/supabase/database.types'

const BlogPage = () => {
  const [blogsData, setBlogsData] = useState<
    Database['public']['Tables']['posts']['Row'][] | null
  >()

  const fetchBlogsData = useCallback(async () => {
    const res = await axios(`/api/Blog`)
    const data = await res.data

    setBlogsData(data.posts)
  }, [])

  useEffect(() => {
    void fetchBlogsData()
  }, [fetchBlogsData])

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
