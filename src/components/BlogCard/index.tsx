import Link from 'next/link'
import {usePathname} from 'next/navigation'

import Image from '@/components/Image'

interface Props {
  url?: string
}

const BlogCard = ({url}: Props) => {
  const pathname = usePathname()
  const isBlogPage = pathname.includes('Blog')

  return (
    <div className="w-full max-w-[30rem] mx-auto">
      <div className="pt-6 px-6 pb-6 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-14">
        <div
          className={`relative w-full ${isBlogPage ? 'aspect-[1]' : 'aspect-[2.4]'} `}>
          <Image
            className="rounded-xl object-cover"
            src="/images/ogu.webp"
            fill
            alt="blogContent"
            priority
          />
        </div>
        <div className="mt-4 base1">블로그 제목입니다.</div>
        <div className={`mt-4 ${!isBlogPage && 'truncate'}`}>
          블로그 게시글 예시입니다. 블로그 게시글 예시입니다. 블로그 게시글
          예시입니다. 블로그 게시글 예시입니다. 블로그 게시글 예시입니다. 블로그
          게시글 예시입니다. 블로그 게시글 예시입니다.
        </div>
        {url && (
          <div className="flex flex-wrap">
            <Link href={url} className="btn-dark btn-small mr-4">
              View More
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogCard
