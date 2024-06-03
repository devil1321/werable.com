import React, { use, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const Page = () => {

  const dispatch = useDispatch()
  const shopActions = bindActionCreators(ShopActions,dispatch)

  useEffect(()=>{
    shopActions.setCart([])
  },[])

  return (
    <div className='success w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <Image src="/assets/sign-up.svg" alt='success-image' width={600} height={600} />
      <h1 className="text-5xl font-bold text-orange-300 text-center">We Are Recive Your Order And It`s Pending</h1>
      <Link href="/products"><button className='block text-white font-bold px-12 rounded-md my-5 py-2 hover:opacity-50'>Return Shopping</button></Link>
    </div>
  )
}

export default Page
