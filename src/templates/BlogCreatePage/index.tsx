'use client'

import React from 'react'

import Layout from '@/components/Layout'
import MarkdownEditor from '@/components/MarkdownEditor'

const BlogCreatePage = () => {
  return (
    <>
      <Layout isMainView>
        <MarkdownEditor />
      </Layout>
    </>
  )
}

export default BlogCreatePage
