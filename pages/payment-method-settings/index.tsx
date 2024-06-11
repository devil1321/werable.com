import React, { MutableRefObject, useEffect, useRef } from 'react'
import Layout from '../layout'
import Hero from '@/app/components/global/hero.component'
import Title from '@/app/components/global/title.component'
import Form from '@/app/components/payment-methods-settings/form.component'
import Nav from '@/app/components/profile/nav.component'
import { useRouter } from 'next/navigation'

const Page:React.FC<{jwt:string}> = ({jwt}) => {

  const router = useRouter()

  const handleInit = () =>{
    if(!jwt){
      router.push('/login')
    }
  }

  useEffect(()=>{
    handleInit()
  },[jwt])

  return (
    <Layout jwt={jwt}>
      <div className="profile">
        <Hero 
          img='/assets/about.jpg'
          title='Flexible Payment Options'
          paragraph='Enjoy a seamless shopping experience at our wearable clothes store with a variety of secure and convenient payment methods tailored to suit your preferences'
        />
        <Title 
          isLeft={true}
          title='Pay Methods'
        />
        <Nav />
        <Form />
      </div>
    </Layout>
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