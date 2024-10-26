import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {twMerge} from 'tailwind-merge'

import Image from '@/components/Image'
import Typography from '@/components/Typography'

interface Props {
  id: string
  title: string
  imageUrl: string
  content: string
}

const BlogCard = ({id, title, imageUrl, content}: Props) => {
  const pathname = usePathname()
  const isBlogPage = pathname.includes('Blog')

  return (
    <div className="w-full max-w-[30rem] mx-auto">
      <div className="pt-6 px-6 pb-6 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-5">
        <div className="relative w-full aspect-[2.4]">
          <Image
            className="rounded-xl object-cover"
            src={imageUrl}
            fill
            alt="blogContent"
            priority
          />
        </div>
        <Typography
          className={twMerge(
            'mt-4 h3 leading-[4rem] 2xl:mb-2 2xl:h4 font-black',
            isBlogPage && 'truncate',
          )}
          text={title}
        />
        <Typography
          className={twMerge(
            'mt-4 body2 font-semibold text-n-6',
            isBlogPage && 'truncate',
          )}
          text={content}
        />
        <div className="flex flex-wrap">
          <Link
            href={`/BlogDetail/${id}`}
            className="btn-dark btn-small"
            prefetch={false}>
            <Typography className="base2" text="View More" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
