import React from 'react'
import Image from 'next/image'

const Banner = () => {
  return (
    <Image className="block my-[100px]" src="/assets/banner.png" alt="banner" width={1920} height={300} />
  )
}

export default Banner
