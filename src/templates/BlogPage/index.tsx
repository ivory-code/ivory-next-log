'use client'

import React from 'react'

import {MOCK_DATA} from '@/app/api/BlogDetail/route'
import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'

const BlogPage = () => {
  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
          {MOCK_DATA.map((data, index) => (
            <BlogCard
              key={index}
              id={data.id}
              title={data.title}
              content={data.content}
              image={data.image}
            />
          ))}
        </div>
      </Layout>
    </>
  )
}

export default BlogPage
