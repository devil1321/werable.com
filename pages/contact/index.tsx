import React from 'react'
import AboutFeature from '@/app/components/global/about-feature.component'
import Form from '@/app/components/contact/form.component'
import Foot from '@/app/components/global/foot.component'
import Layout from '../layout'

const Page = () => {
  return (
  <Layout>
    <div className="contact md:pt-[150px]">
      <AboutFeature 
        className='mt-0 mb-12'
        opacity="0.9"
        isLeft={false}
        img='/assets/people.jpg'
        title='Get in Touch with Wearable'
        paragraph="Whether you have a question about our products, want to provide feedback, or simply want to say hello, we're here to help! Reach out to us via email, phone, or our contact form below. Our dedicated team is committed to providing you with exceptional service and assistance every step of the way. We can't wait to hear from you!"
      />
      <Form />
      <AboutFeature 
        opacity="0.9"
        isLeft={false}
        img='/assets/about-1.png'
        title='Connect with Wearable!'
        paragraph="Ready to take the next step? Contact us today to explore our latest collections, inquire about sizing, or discuss any special requests. Our friendly team is standing by to assist you in finding the perfect wearable pieces for your wardrobe. Whether you prefer email, phone, or social media, we're here to make your shopping experience seamless and enjoyable. Let's start the conversation!"
      />
      <Foot />
    </div>
  </Layout>
  )
}

export default Page
