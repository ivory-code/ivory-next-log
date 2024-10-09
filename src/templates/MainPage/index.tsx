'use client'

import React from 'react'

import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'

const MainPage = () => {
  return (
    <>
      <Layout>
        <BlogCard url="/" />
        <BlogCard url="/" />
      </Layout>
    </>
  )
}

export default MainPage
