'use client'

import React from 'react'

import BlogList from '@/components/BlogList'
import Layout from '@/components/Layout'

const FavoritePage = () => {
  return (
    <>
      <Layout>
        <BlogList url="/" />
        <BlogList url="/Blog" />
        <BlogList url="/Favorite" />
      </Layout>
    </>
  )
}

export default FavoritePage
