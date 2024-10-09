import Link from 'next/link'
import {usePathname} from 'next/navigation'

import Image from '@/components/Image'
import Typography from '@/components/Typography'

interface Props {
  id: number
  title: string
  content: string
  image: string
}

const BlogCard = ({id, title, content, image}: Props) => {
  const pathname = usePathname()

  const isBlogPage = pathname.includes('Blog')

  return (
    <div className="w-full max-w-[30rem] mx-auto">
      <div className="pt-6 px-6 pb-6 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-5">
        <div className={`relative w-full aspect-[2.4]`}>
          <Image
            className="rounded-xl object-cover"
            src={image}
            fill
            alt="blogContent"
            priority
          />
        </div>
        <div
          className={`mt-4 h3 leading-[4rem] 2xl:mb-2 2xl:h4 font-black ${isBlogPage && 'truncate'}`}>
          {title}
        </div>
        <div
          className={`mt-4 body2 font-semibold text-n-6 ${isBlogPage && 'truncate'}`}>
          {content}
        </div>
        <div className="flex flex-wrap">
          <Link href={`/BlogDetail/${id}`} className="btn-dark btn-small">
            <Typography text="View More" className="base2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
