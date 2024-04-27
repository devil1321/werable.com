import React from 'react'
import Image from 'next/image';

interface AboutFeatureProps{
  isLeft:boolean;
  img:string;
  title:string;
  paragraph:string;
}

const AboutFeature:React.FC<AboutFeatureProps> = ({isLeft,img,title,paragraph}) => {
  return (
    <div className='about-feature my-12 flex justify-center items-center'>
      <Image className={`${isLeft ? "order-1" : 'order-2'} relative ${isLeft ? 'left-[10%]' : '-left-[10%]'} top-0`} src={img} alt='about-image' width={800} height={600} />
      <div className={`about-feature-details bg-neutral-700 text-white relative top-0 px-12 z-10 py-[50px] ${isLeft ? '-left-[15%]' : 'left-[15%]'} ${isLeft ? 'order-2' : "order-1"}`}>
        <h2 className="text-5xl mb-5 text-white">{title}</h2>
        <p className="text-sm text-white">{paragraph}</p>
      </div>
    </div>
  )
}

export default AboutFeature
