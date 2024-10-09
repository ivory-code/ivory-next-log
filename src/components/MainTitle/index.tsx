import Link from 'next/link'

import Image from '@/components/Image'
import Typography from '@/components/Typography'

interface Props {
  title: string
}

const MainTitle = ({title}: Props) => (
  <Link className="flex text-n-3 font-extrabold text-2xl" href="/">
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
        <Typography text={title} />
      </div>
    </div>
  </Link>
)

export default MainTitle
