import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='success w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <Image src="/assets/sign-up.svg" alt='success-image' width={600} height={600} />
      <h1 className="text-5xl font-bold text-red-500 text-center">Your Transaction Cannot Be Realized. Try Again</h1>
      <Link href="/cart"><button className='block text-white font-bold px-12 rounded-md my-5 py-2 hover:opacity-50'>Return To Cart</button></Link>
    </div>
  )
}

export default Page
