import React from 'react'
import Image from 'next/image'

const Feature = () => {
  return (
    <div className='about-feature px-[100px]'>
      <Image src="/assets/sweter.jpg" width={1920} height={500} alt='sweter-image' />
      <div className="about-feature-details w-[80%] relative -top-[200px] left-1/2 -translate-x-1/2 text-white bg-neutral-600 p-12">
        <h2 className="font-bold text-5xl md:text-[80px]">Wellness Worldwide</h2>
        <p className="text-sm my-5">Our Wearable Health Tracking technology is revolutionizing how individuals monitor and manage their well-being. With real-time data collection and personalized insights, we empower users to take proactive steps towards healthier lifestyles.</p>
        <p className="text-sm my-5">From tracking fitness metrics to monitoring vital signs, our global health tracking system provides invaluable support to individuals and healthcare professionals alike. Join us in shaping the future of health and wellness with Wearable Health Tracking.</p>
      </div>
    </div>
  )
}

export default Feature
