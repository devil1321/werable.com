import React, { MutableRefObject, useEffect, useRef } from 'react'
import Layout from '../layout'
import Hero from '@/app/components/global/hero.component'
import Title from '@/app/components/global/title.component'
import Form from '@/app/components/payment-methods-settings/form.component'
import Nav from '@/app/components/profile/nav.component'

const Page = () => {
  return (
    <Layout>
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
