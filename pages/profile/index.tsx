import React, { MutableRefObject, useEffect, useRef } from 'react'
import Layout from '../layout'
import Hero from '@/app/components/global/hero.component'
import Title from '@/app/components/global/title.component'
import Form from '@/app/components/profile/form.component'
import Nav from '@/app/components/profile/nav.component'

const Page = () => {
  return (
    <Layout>
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
