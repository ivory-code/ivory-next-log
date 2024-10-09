import {useEffect, useState} from 'react'

import LeftSideBar from '@/components/LeftSideBar'
import RightCommentBar from '@/components/RightCommentBar'

interface Props {
  children: React.ReactNode
  isMainView?: boolean
}

const Layout = ({children, isMainView = false}: Props) => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false)
  const [isRightSideBarVisible, setIsRightSideBarVisible] = useState(true)

  const handleResize = () => {
    if (window.innerWidth <= 1179) {
      setIsSideBarVisible(true)
    } else {
      setIsSideBarVisible(false)
    }

    if (window.innerWidth <= 1024) {
      setIsRightSideBarVisible(false)
    } else {
      setIsRightSideBarVisible(true)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      <div
        className={`pr-6 bg-n-7 md:p-0 md:bg-n-1 md:overflow-hidden ${
          isSideBarVisible ? 'pl-24 md:pl-0' : 'pl-80 xl:pl-24 md:pl-0'
        }`}>
        <LeftSideBar isLeftSideBarVisible={isSideBarVisible} />
        <div className="flex py-6 md:py-0 h-screen">
          <div
            className={`relative flex grow max-w-full bg-n-1 rounded-[1.25rem] ${isMainView || !isRightSideBarVisible ? 'pr-0' : 'pr-[22.5rem] 2xl:pr-80 lg:pr-0'}`}>
            <div className="relative z-2 grow p-10 space-y-10 overflow-y-auto scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
              <div className="relative flex flex-col grow max-w-full md:pt-18">
                {children}
              </div>
            </div>
            {isMainView ||
              (isRightSideBarVisible && (
                <RightCommentBar
                  className={`${!isSideBarVisible && 'md:translate-x-64 md:before:absolute md:before:z-30 md:before:inset-0'}`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
