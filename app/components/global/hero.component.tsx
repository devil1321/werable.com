'use client'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import SplitTextJS from 'split-text-js'


interface HeroProps{
  img:string;
  title:string;
  paragraph:string;
}

const Hero:React.FC<HeroProps> = ({img,title,paragraph}) => {

  const imageWrapperRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleSknew = () =>{
    if(imageWrapperRef.current){
      const rect = imageWrapperRef.current.getBoundingClientRect()
      let offsetTop = rect.top
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
  }

  const handleAnimate = () =>{
    const heading = document.querySelector('h1') as HTMLHeadingElement
    const paragraph = document.querySelector('p') as HTMLParagraphElement
    const headingText = new SplitTextJS(heading)
    const paragraphText = new SplitTextJS(paragraph)

    const rubber = (chars:HTMLSpanElement[]) =>{
      let time = 0
      chars.forEach((t:HTMLSpanElement)=>{
        setTimeout(() => {
          t.classList.add('animate__animated')
          t.classList.add('animate__rubberBand')
          t.classList.add('animate__slow')
        }, time += 100);
      })
    } 

    gsap.fromTo(headingText.chars,{ opacity:0 }, { opacity:1,stagger:0.1,duration:0.5,onUpdate:(e:any)=>{
        rubber(headingText.chars)
    }})
    gsap.fromTo(paragraphText.chars,{ opacity:0 }, { opacity:1,delay:2})
  }

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      window.addEventListener('scroll',handleSknew)
    }
    handleAnimate()
    return () => window.removeEventListener('scroll',handleSknew)
  },[])

  return (
    <div className='hero relative top-0 left-0'>
      <div ref={imageWrapperRef} className="hero-image w-[100vw] overflow-hidden">
        <Image src={img} alt='hero-image' width={1920} height={768} />
      </div>
      <div className="hero-details absolute top-[40%] md:top-[60%] 2xl:top-[25%] left-[5%]">
        <h1 className='font-bold text-white text-xl md:text-4xl relative md:-top-5 left-0 xl:text-[70px] lg:w-[100%]'>{title}</h1>
        <p className="text-sm text-white">{paragraph}</p>
      </div>
    </div>
  )
}

export default Hero
