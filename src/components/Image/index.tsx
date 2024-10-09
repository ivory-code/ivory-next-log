'use client'

import {default as NextImage, type ImageProps} from 'next/image'
import {useState} from 'react'

const Image = ({className, ...props}: ImageProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <NextImage
      className={`inline-block align-top opacity-0 transition-opacity ${
        loaded && 'opacity-100'
      } ${className}`}
      onLoad={() => setLoaded(true)}
      sizes="500px"
      {...props}
    />
  )
}

export default Image
