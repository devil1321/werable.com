'use client'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

interface AboutFeatureProps{
  isLeft:boolean;
  img:string;
  title:string;
  paragraph:string;
  opacity?:string;
  className?:string;
}

const AboutFeature:React.FC<AboutFeatureProps> = ({isLeft,img,title,paragraph,opacity,className}) => {

  const featureRef = useRef() as MutableRefObject<HTMLDivElement>
  const imageRef = useRef() as MutableRefObject<HTMLImageElement>
  const detailsRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleAnimate = () =>{
    if(typeof window !== 'undefined'){
        gsap.registerPlugin(ScrollTrigger)
        if(isLeft){
          gsap.fromTo(imageRef.current,{x:-1000},{x:0,duration:1,scrollTrigger:{
            trigger:featureRef.current,
            start:'-=250px',
            end:'-=250px'
          }})
          gsap.fromTo(detailsRef.current,{x:1000},{x:0,duration:1,scrollTrigger:{
            trigger:featureRef.current,
            start:'-=250px',
            end:'-=250px'
          }})
        }else{
          gsap.fromTo(imageRef.current,{x:1000},{x:0,duration:1,scrollTrigger:{
            trigger:featureRef.current,
            start:'-=250px',
            end:'-=250px'
          }})
          gsap.fromTo(detailsRef.current,{x:-1000},{x:0,duration:1,scrollTrigger:{
            trigger:featureRef.current,
            start:'-=250px',
            end:'-=250px'
          }})
        }
    }
  }

  useEffect(()=>{
    handleAnimate()
  },[])

  return (
    <div ref={featureRef} className={`about-feature my-12 md:flex md:justify-center md:items-center ${className}`}>
      <Image ref={imageRef} className={`about-feature-image ${isLeft ? "order-1" : 'order-2'} relative ${isLeft ? 'md:left-[10%]' : 'md:-left-[10%]'} top-0`} src={img} alt='about-image' width={800} height={600} />
      <div style={{opacity:opacity}} ref={detailsRef} className={`about-feature-details bg-neutral-700 text-white relative top-0 px-12 z-10 py-[50px] ${isLeft ? 'md:-left-[15%]' : 'md:left-[15%]'} ${isLeft ? 'order-2' : "order-1"}`}>
        <h2 className="text-5xl mb-5 text-white">{title}</h2>
        <p className="text-sm text-white">{paragraph}</p>
      </div>
    </div>
  )
}

export default AboutFeature
