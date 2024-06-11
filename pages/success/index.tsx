import React, { use, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useRouter } from 'next/navigation'

const Page:React.FC<{jwt:string}> = ({jwt}) => {

  const router = useRouter()
  const dispatch = useDispatch()
  const shopActions = bindActionCreators(ShopActions,dispatch)

  const handleInit  = () =>{
    if(!jwt){
      router.push('/login')
    }
  }
  
  useEffect(()=>{
    handleInit()
  },[jwt])

  useEffect(()=>{
    shopActions.setCart([])
  },[])

  return (
    <div className='success w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <Image src="/assets/sign-up.svg" alt='success-image' width={600} height={600} />
      <h1 className="text-5xl font-bold text-green-300 text-center">It`s Done! Your Payment Is Complete</h1>
      <Link href="/products"><button className='block text-white font-bold px-12 rounded-md my-5 py-2 hover:opacity-50'>Return Shopping</button></Link>
    </div>
  )
}

export default Page

export const getServerSideProps = async(context:any) =>{
  let wearableJwtCookie
  if (context.req.headers.cookie) {
    const cookies = context.req.headers.cookie.split(';').reduce((prev:any, current:any) => {
      const [name, value] = current.trim().split('=');
      prev[name] = value;
      return prev;
    }, {});
    wearableJwtCookie = cookies['wearable-jwt'];
    
  }
  return {
    props:{
      jwt:wearableJwtCookie ? wearableJwtCookie : null
    }
  }
}