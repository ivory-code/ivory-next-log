import {twMerge} from 'tailwind-merge'

import Navigation, {
  type NavigationType,
} from '@/components/LeftSideBar/Navigation'
import MainTitle from '@/components/MainTitle'
import Profile from '@/components/Profile'
import {useUser} from '@/store/user'

const NAVIGATION: NavigationType[] = [
  {
    title: '홈',
    url: '/',
    icon: 'home',
    iconClass: 'fill-accent-1',
  },
  {
    title: '게시글',
    url: '/Blog',
    icon: 'blog',
    iconClass: 'fill-accent-2',
  },
  {
    title: '즐겨찾기',
    url: '/Favorite',
    icon: 'favorite',
    iconClass: 'fill-accent-5',
  },
  {
    title: '글 작성하기',
    url: '/BlogCreate',
    icon: 'create',
    iconClass: 'fill-primary-2',
  },
]

interface Props {
  isLeftSideBarVisible?: boolean
}

const LeftSideBar = ({isLeftSideBarVisible}: Props) => {
  const user = useUser(state => state.user)

  const isLogin = user !== null

  return (
    <div
      className={twMerge(
        `fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-30 px-4 bg-n-7 md:invisible md:opacity-0 md:transition-opacity ${
          isLeftSideBarVisible
            ? 'w-24 pb-38 md:w-16 md:px-0 md:pb-30'
            : 'w-80 pb-58'
        }`,
      )}>
      <div
        className={`absolute top-0 right-0 left-0 flex items-center h-30 pl-7 pr-6 ${
          isLeftSideBarVisible ? 'justify-center md:px-4' : 'justify-between'
        }`}>
        {!isLeftSideBarVisible && (
          <MainTitle title="khs-log" isLogin={isLogin} />
        )}
      </div>
      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        <Navigation
          isSideBarVisible={isLeftSideBarVisible}
          items={NAVIGATION}
        />
      </div>
      <div className="absolute left-0 bottom-0 right-0 pb-6 px-4 bg-n-7 before:absolute before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)] before:pointer-events-none md:px-3">
        <Profile
          isSideBarVisible={isLeftSideBarVisible}
          isLogin={isLogin}
          nickname={user?.nickname ?? ''}
        />
      </div>
    </div>
  )
}

export default LeftSideBar
