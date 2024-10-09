'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {twMerge} from 'tailwind-merge'
import Image from '@/components/Image'

type NavigationType = {
  title: string
  url: string
  onClick?: () => void
}

interface Props {
  items: NavigationType[]
}

const Navigation = ({items}: Props) => {
  const pathname = usePathname()

  return (
    <div>
      {items.map((item, index) => (
        <Link
          className={twMerge(
            `flex items-center h-12 base2 font-semibold text-n-3/75 rounded-lg transition-colors hover:text-n-1 ${
              pathname === item.url &&
              'text-n-1 bg-gradient-to-l from-[#323337] to-[rgba(70,79,111,0.3)] shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)]'
            } px-3`,
          )}
          href={item.url}
          key={index}>
          <div className="relative w-10 h-10">
            <Image
              className="rounded-full object-cover"
              src="/images/smileHeart.png"
              fill
              alt="navigation"
            />
          </div>
          <div className="ml-5">{item.title}</div>
        </Link>
      ))}
    </div>
  )
}

export default Navigation
