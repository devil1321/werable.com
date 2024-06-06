'use client'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import SplitTextJS from 'split-text-js'

interface ItemProps{
    itemRef:MutableRefObject<HTMLDivElement>
    img:string;
    title:string;
    paragraph:string;
    count:number;
}

const Item:React.FC<ItemProps> = ({itemRef,img,title,paragraph,count}) => {

  const headingRef = useRef() as MutableRefObject<HTMLHeadingElement>
  const paragraphRef = useRef() as MutableRefObject<HTMLParagraphElement>

  const handleAnimate = () =>{
    const headingText = new SplitTextJS(headingRef.current)
    const paragraphText = new SplitTextJS(paragraphRef.current)

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
    handleAnimate()
  },[count])

  return (
    <div className='home-carousel-item relative min-w-[100vw] top-0 left-0' ref={itemRef}>
      <Image className='min-w-[100vw]' src={img} alt="carousel-image" width={1920} height={768} />
      <div className="home-carousel-item-details absolute top-[20%] xl:top-[50%] md:top-[60%] left-[5%]">
        <h1 ref={headingRef} className="home-carousel-title w-fit text-4xl lg:text-[60px] font-bold text-white">{title}</h1>
        <p ref={paragraphRef} className="text-sm mt-5 text-white">{paragraph}</p>
      </div>
    </div>
  )
}

export default Item
