'use client'

import {useRouter} from 'next/navigation'
import React, {useCallback, useEffect, useState} from 'react'

import {getBlogsFavorites} from '@/app/api/getFavorite'
import BlogList from '@/components/BlogList'
import Layout from '@/components/Layout'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

export type FavoriteData = Database['public']['Tables']['favorites']['Row']

const FavoritePage = () => {
  const router = useRouter()
  const user = useUser(state => state.user)

  const [favoritesData, setFavoritesData] = useState<FavoriteData[]>([])

  const handleRouter = useCallback(
    (id: string) => {
      router.push(`/blogDetail/${id}`)
    },
    [router],
  )

  const fetchFavoritesData = useCallback(async () => {
    if (user?.id) {
      const data = await getBlogsFavorites({userId: user.id})
      setFavoritesData(data ?? [])
    }
  }, [user?.id])

  useEffect(() => {
    if (user?.id) {
      void fetchFavoritesData()
    }
  }, [fetchFavoritesData, user?.id])

  return (
    <div>
      <Layout>
        {favoritesData.length > 0 ? (
          favoritesData.map(data => (
            <div key={data.id} className="flex justify-center items-center">
              <BlogList
                onClick={() => handleRouter(data.post_id ?? '')}
                title={data.post_title ?? ''}
              />
            </div>
          ))
        ) : (
          <Typography text="No favorites found." />
        )}
      </Layout>
    </div>
  )
}

export default FavoritePage
