import Link from 'next/link'

import Image from '@/components/Image'

const MainTitle = () => (
  <Link className="flex w-[11.88rem] text-n-3 font-extrabold text-2xl" href="/">
    <div className="mb-6">
      <div className="flex items-center justify-center">
        <div className="relative w-10 h-10">
          <Image
            className="rounded-full object-cover"
            src="/images/smileHeart.png"
            fill
            alt="mainTitle"
          />
        </div>
        <div>khs-log</div>
      </div>
    </div>
  </Link>
)

export default MainTitle
