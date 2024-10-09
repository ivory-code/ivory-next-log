import Link from 'next/link'

import Image from '@/components/Image'

interface Props {
  url: string
}

const BlogCard = ({url}: Props) => {
  return (
    <div className="w-full max-w-[30rem] mx-auto">
      <div className="pt-6 px-6 pb-6 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-14">
        <div className="relative aspect-[2.4] w-full">
          <Image
            className="rounded-xl object-cover"
            src="/images/ogu.webp"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1499px) 50vw, 33.33vw"
            alt="blogContent"
          />
        </div>
        <div className="mt-4 base1">블로그 제목입니다.</div>
        <div className="mt-4 truncate">
          블로그 게시글 예시입니다. 블로그 게시글 예시입니다. 블로그 게시글
          예시입니다. 블로그 게시글 예시입니다. 블로그 게시글 예시입니다. 블로그
          게시글 예시입니다. 블로그 게시글 예시입니다.
        </div>
        <div className="flex flex-wrap">
          <Link href={url} className="btn-dark btn-small mr-4">
            View More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
