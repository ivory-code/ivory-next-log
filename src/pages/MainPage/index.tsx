'use client'

import Image from 'next/image'
import React from 'react'

import LoginForm from '@/features/auth/components/LoginForm'
import IconRow, {type IconsType} from '@/shared/components/IconRow'
import Typography from '@/shared/components/Typography'
import {type ProfileData} from '@/shared/types'
import Layout from '@/widgets/Layout/components'

interface Props {
  profileData: ProfileData
}

const Page = ({profileData}: Props) => {
  const {
    mainTitle = 'Default Title',
    subTitle = 'Default Subtitle',
    contents = 'Default Contents',
    skills = [],
    tools = [],
    imageUrl = '',
  } = profileData

  return (
    <Layout isMainView>
      <LoginForm className="flex justify-end items-center h-10 mb-6 selection:border-b" />
      <Typography text={mainTitle} className="mb-4 h2 md:h3 font-black" />
      <Typography text={subTitle} className="mb-12 body1 text-n-4 md:mb-6" />
      <div className="flex py-8 border-t lg:block md:py-8 dark:border-n-5">
        <div className="shrink-0 w-[21rem] lg:w-full lg:mb-10 lg:pr-0">
          <Typography
            text={contents}
            className="mt-4 base2 text-n-4 whitespace-pre-line"
          />
          <div className="lg:flex lg:justify-around md:flex-col md:justify-normal">
            {skills && (
              <IconRow
                icons={skills as unknown as IconsType}
                title="Skills"
                className="min-w-[160px]"
              />
            )}
            {tools && (
              <IconRow
                icons={tools as unknown as IconsType}
                title="Tools"
                className="min-w-[160px]"
              />
            )}
          </div>
        </div>
        {imageUrl && (
          <div className="grow px-5 justify-center">
            <Image
              className="w-full max-h-[500px] object-cover rounded-3xl md:rounded-xl"
              src={imageUrl}
              alt="avatar"
              width={580}
              height={500}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

const MainPage = ({profileData}: Props) => {
  if (!profileData) {
    return (
      <div className="text-center text-red-500">
        Error: Profile data is unavailable. Please try again later.
      </div>
    )
  }

  return <Page profileData={profileData} />
}

export default MainPage
