'use client'

import React from 'react'

import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'

const BlogPage = () => {
  return (
    <>
      <Layout>
        <BlogCard url="/" />
        <BlogCard url="/" />
      </Layout>
    </>
  )
}

export default BlogPage
