'use client'

import axios from 'axios'
import Image from 'next/image'
import React, {useCallback, useEffect, useState} from 'react'

import IconRow, {type IconRowProps} from '@/components/IconRow'
import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import Typography from '@/components/Typography'
import {type Database} from '@/supabase/database.types'

export type ProfileData = Database['public']['Tables']['profile']['Row']

const MainPage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  const fetchProfileData = useCallback(async () => {
    try {
      const {data} = await axios.get<{profileData: ProfileData[]}>(
        '/api/EditProfile',
      )
      setProfileData(data.profileData[0] || null)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching profile data:', error)
    }
  }, [])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  return (
    <div>
      <Layout isMainView>
        <LoginForm className="flex justify-end items-center h-18 mb-6 selection:border-b border-n-3" />
        <Typography
          text={profileData?.mainTitle ?? ''}
          className="mb-4 h2 md:h3 font-black text-n-7"
        />
        <Typography
          text={profileData?.subTitle ?? ''}
          className="mb-12 body1 text-n-4 md:mb-6"
        />
        <div className="flex py-8 border-t border-n-3 lg:block md:py-8 dark:border-n-5">
          <div className="shrink-0 w-[21rem] pr-20 2xl:w-72 2xl:pr-12 lg:w-full lg:mb-10 lg:pr-0">
            <Typography
              text={profileData?.contents ?? ''}
              className="mt-4 base2 text-n-4 whitespace-pre-line"
            />
            {profileData?.skills && (
              <IconRow
                icons={profileData.skills as unknown as IconRowProps[]}
                title="Skills"
              />
            )}
            {profileData?.tools && (
              <IconRow
                icons={profileData.tools as unknown as IconRowProps[]}
                title="Tools"
              />
            )}
          </div>
          {profileData?.imageUrl && (
            <div className="grow">
              <Image
                className="w-full h-[500px] object-cover rounded-3xl md:rounded-xl"
                src={profileData.imageUrl}
                alt="avatar"
                width={600}
                height={500}
              />
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default MainPage
