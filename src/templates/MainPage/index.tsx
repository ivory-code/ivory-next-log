'use client'

import Image from 'next/image'
import React from 'react'

import Icon, {type IconName} from '@/components/Icon'
import Layout from '@/components/Layout'
import Typography from '@/components/Typography'

interface IconProps {
  name: IconName
  bg: string
  fill?: string
}

const ICONS_TOP_ROW: IconProps[] = [
  {name: 'javascript', bg: 'bg-accent-6'},
  {name: 'react', bg: 'bg-accent-7'},
  {name: 'nextjs', bg: 'bg-n-2'},
  {name: 'graphql', bg: 'bg-accent-8', fill: 'white'},
]

const ICONS_BOTTOM_ROW: IconProps[] = [
  {name: 'github', bg: 'bg-n-2'},
  {name: 'googleAnalytics', bg: 'bg-accent-9', fill: 'white'},
  {name: 'firebase', bg: 'bg-accent-10'},
  {name: 'figma', bg: 'bg-accent-11', fill: 'white'},
]

const IconRow = ({icons, title}: {icons: IconProps[]; title: string}) => (
  <div className="mt-6">
    <Typography text={title} className="base2" />
    <div className="flex justify-start gap-x-5">
      {icons.map(icon => (
        <div
          key={icon.name}
          className={`w-12 h-12 rounded ${icon.bg} flex justify-center items-center`}>
          <Icon iconName={icon.name} fill={icon.fill} />
        </div>
      ))}
    </div>
  </div>
)

const MainPage = () => {
  return (
    <>
      <Layout isMainPage>
        <Typography
          text="안녕하세요!! 반갑습니다! 👋🏻"
          className="mb-4 h2 md:pr-16 md:h3 font-black text-n-7"
        />
        <Typography
          text="dev-khs, Frontend-Developer 💻"
          className="mb-12 body1 text-n-4 md:mb-6"
        />
        <div className="flex py-8 border-t border-n-3 lg:block md:py-8 dark:border-n-5">
          <div className="shrink-0 w-[21rem] pr-20 2xl:w-72 2xl:pr-12 lg:w-full lg:mb-10 lg:pr-0">
            <Typography
              text={`새로 경험한 일들을 상대와 공감하고 공유하는 것을 좋아하며, 표현하는 것을 좋아합니다.

                경험을 통한 과정으로 사용자들에 대한 공감과 소통의 중요성이 증대되는 시대에서, 모두가 공감할 수 있는 UI/UX를 고민하고 서비스를 개발하기 위해 끊임없이 노력하는 FrontEnd 개발자입니다.
                
                사용자들의 경험을 듣고, 코드로 공감시킬 수 있는 서비스를 개발하고 싶습니다.`}
              className="mt-4 base2 text-n-4 whitespace-pre-line"
            />
            <IconRow icons={ICONS_TOP_ROW} title="Skills" />
            <IconRow icons={ICONS_BOTTOM_ROW} title="Tools" />
          </div>
          <div className="grow">
            <Image
              className="w-full h-[500px] object-cover rounded-3xl md:rounded-xl"
              src="/images/avatar.png"
              alt="avatar"
              width={600}
              height={500}
            />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MainPage
