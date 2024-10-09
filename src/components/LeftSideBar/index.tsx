import Navigation from '@/components/LeftSideBar/Navigation'
import Profile from '@/components/LeftSideBar/Profile'
import MainTitle from '@/components/MainTitle'

const LeftSideBar = () => {
  const navigation = [
    {
      title: '게시글',
      url: '/Blog',
    },
    {title: '즐겨찾기', url: '/Favorites'},
  ]

  return (
    <div className="fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-30 px-4 bg-n-7 md:invisible md:opacity-0 md:transition-opacity w-80 pb-58">
      <div className="absolute top-0 right-0 left-0 flex items-center h-30 pl-7 pr-6 justify-between">
        <MainTitle />
      </div>
      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        <Navigation items={navigation} />
      </div>
      <div className="absolute left-0 bottom-0 right-0 pb-6 px-4 bg-n-7 before:absolute before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)] before:pointer-events-none md:px-3">
        <Profile />
      </div>
    </div>
  )
}

export default LeftSideBar
