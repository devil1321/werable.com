import React, { MutableRefObject, useEffect, useRef } from 'react'
import Layout from '../layout'
import Hero from '@/app/components/global/hero.component'
import Title from '@/app/components/global/title.component'
import Form from '@/app/components/profile/form.component'
import Nav from '@/app/components/profile/nav.component'
import { useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
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
          img='/assets/banner-people.jpg'
          title='Innovators in Wearable Fashion'
          paragraph='Welcome to our profile page, where we blend technology and style to revolutionize your wardrobe with smart, wearable clothing that enhances both your lifestyle and fashion sense'
        />
        <Title 
          isLeft={true}
          title='Your Profile'
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