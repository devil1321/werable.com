import React, { MutableRefObject, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

interface TitleProps{
  className?:string;
  isLeft:boolean;
  title:string;
}

const Title:React.FC<TitleProps> = ({className,isLeft,title}) => {

  const titleRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleAnimate = () =>{
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(titleRef.current,{ opacity:0 },{
      opacity:1,
      duration:1,
      scrollTrigger:{
        trigger:titleRef.current,
        start:'-=200px',
        end:'-=200px'
      }
    })
  }

  useEffect(()=>{
    handleAnimate()
  },[])

  return (
    <div ref={titleRef} className={`title mx-auto relative top-0 left-0 my-12 w-[300px] md:w-[500px] ${className}`}>
      {isLeft
      ? <Image src="/assets/title-right.png" alt='title-background' width={500} height={300} />
      : <Image className="-translate-x-[5%]" src="/assets/title-left.png" alt='title-background' width={500} height={300} />}
      <h2 className={`text-2xl md:text-5xl absolute w-2/3 top-[30%] left-1/2 ${isLeft ? '-translate-x-[60%]' : '-translate-x-[55%]'} font-bold text-white text-center`}>{title}</h2>
    </div>
  )
}

export default Title
