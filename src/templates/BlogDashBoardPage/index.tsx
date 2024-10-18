'use client'

import axios from 'axios'
import Link from 'next/link'
import React, {useCallback, useEffect, useState} from 'react'

import BlogList from '@/components/BlogList'
import Icon from '@/components/Icon'
import Layout from '@/components/Layout'
import Typography from '@/components/Typography'
import {type Database} from '@/supabase/database.types'

const BlogDashBoardPage = () => {
  const [blogsData, setBlogsData] = useState<
    Database['public']['Tables']['posts']['Row'][]
  >([])

  const fetchBlogsData = useCallback(async () => {
    const res = await axios(`/api/BlogDashBoard`)
    const data = await res.data.blogsData

    setBlogsData(data)
  }, [])

  useEffect(() => {
    void fetchBlogsData()
  }, [fetchBlogsData])

  return (
    <>
      <Layout>
        <Link
          className="group w-1/2 h-15 flex justify-center items-center m-3 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5"
          href="/EditProfile">
          <>
            <Icon
              className="relative z-1"
              iconName="blog"
              fill="fill-accent-3"
            />
            <Typography text="홈 추가/수정" className="base2 " />
          </>
        </Link>
        {blogsData.length > 0
          ? blogsData.map(data => (
              <div
                key={`${data.id}`}
                className="flex justify-between items-center">
                <BlogList
                  url={`/BlogDetail/${data.id}`}
                  title={data.title}
                  isAdmin
                />
                <Icon
                  className="ml-4 fill-accent-1 transition-colors items-center"
                  iconName="delete"
                />
              </div>
            ))
          : null}
      </Layout>
    </>
  )
}

export default BlogDashBoardPage
