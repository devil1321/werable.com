'use client'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

interface HeroProps{
  img:string;
  title:string;
  paragraph:string;
}

const Hero:React.FC<HeroProps> = ({img,title,paragraph}) => {

  const imageWrapperRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleSknew = () =>{
    const rect = imageWrapperRef.current.getBoundingClientRect()
    let offsetTop = rect.top
    console.log(offsetTop,rect.top)
    if(window.innerWidth >= 768){
      offsetTop = 450 - rect.top
      if(offsetTop > 200 && rect.top < -250){
        gsap.to(imageWrapperRef.current,{ clipPath:`polygon(0 0, 100% 0, 100% ${(offsetTop) / 10}%, 0% 100%)`})
      }
    }else{
      offsetTop = 550 - rect.top
      if(offsetTop > 550 && rect.top < -80){
        gsap.to(imageWrapperRef.current,{ clipPath:`polygon(0 0, 100% 0, 100% ${(offsetTop) / 9}%, 0% 100%)`})
      }
    }
  }

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      window.addEventListener('scroll',handleSknew)
    }
    return () => window.removeEventListener('scroll',handleSknew)
  },[])

  return (
    <div className='hero relative top-0 left-0'>
      <div ref={imageWrapperRef} className="hero-image w-[100vw] lg:h-[140vh] overflow-hidden">
        <Image src={img} alt='hero-image' width={1920} height={768} />
      </div>
      <div className="hero-details absolute top-[45%] left-[5%]">
        <h1 className='font-bold text-white text-5xl md:text-[80px] lg:w-[100%] xl:w-2/3'>{title}</h1>
        <p className="text-sm text-white">{paragraph}</p>
      </div>
    </div>
  )
}

export default Hero
