'use client'

import React, {useCallback, useEffect, useState} from 'react'

import {getBlogsFavorites} from '@/app/api/getFavorite'
import BlogList from '@/components/BlogList'
import Layout from '@/components/Layout'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

const FavoritePage = () => {
  const user = useUser(state => state.user)

  const [favoritesData, setFavoritesData] = useState<
    Database['public']['Tables']['favorites']['Row'][]
  >([])

  const fetchFavoritesData = useCallback(async () => {
    if (!user?.id) {
      return
    }

    const data = await getBlogsFavorites({userId: user.id})

    setFavoritesData(data ?? [])
  }, [user?.id])

  useEffect(() => {
    void fetchFavoritesData()
  }, [fetchFavoritesData])

  return (
    <>
      <Layout>
        {favoritesData.length > 0
          ? favoritesData.map(data => (
              <div
                key={`${data.id}`}
                className="flex justify-center items-center">
                <BlogList
                  url={`/BlogDetail/${data.post_id}`}
                  title={data.post_title}
                />
              </div>
            ))
          : null}
      </Layout>
    </>
  )
}

export default FavoritePage
