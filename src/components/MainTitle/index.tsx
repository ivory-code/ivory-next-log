import Link from 'next/link'

import Image from '@/components/Image'
import Typography from '@/components/Typography'

interface Props {
  title: string
  isLogin: boolean
}

const MainTitle = ({title, isLogin}: Props) => (
  <Link className="flex text-n-3 font-extrabold text-2xl" href="/">
    <div className="mb-6">
      <div className="flex items-center justify-center">
        <div className="relative w-10 h-10 flex items-center">
          <Image
            className="rounded-full object-cover"
            src={isLogin ? '/images/smileHeart.png' : '/images/sleepyFace.png'}
            width={30}
            height={30}
            alt="mainTitle"
          />
        </div>
        <Typography text={title} />
      </div>
    </div>
  </Link>
)

export default MainTitle
