'use client'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import  MotionPathPlugin  from 'gsap/dist/MotionPathPlugin'
import SplitTextJS from 'split-text-js'

const Product:React.FC<{ product:any,productRef?:MutableRefObject<HTMLDivElement> }> = ({product,productRef}) => {

  const titleRef = useRef() as MutableRefObject<HTMLHeadingElement>
  const pathRef = useRef() as MutableRefObject<SVGPathElement>
  const cartRef = useRef() as MutableRefObject<HTMLDivElement>
  const infoRef = useRef() as MutableRefObject<HTMLDivElement>
  const plusRef = useRef() as MutableRefObject<HTMLDivElement>
  const minusRef = useRef() as MutableRefObject<HTMLDivElement>
  

  const handleAnimationOut = () =>{
    if(titleRef.current.classList.contains('--open')){
      titleRef.current.style.opacity = '0'
      cartRef.current.style.transition = 'opacity 1s ease-in-out'
      cartRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!cartRef.current.classList.contains('hidden')){
          cartRef.current.classList.add('hidden')
        }
      }, 1000);
      infoRef.current.style.transition = 'opacity 1s ease-in-out'
      infoRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!infoRef.current.classList.contains('hidden')){
          infoRef.current.classList.add('hidden')
        }
      }, 1000);
      plusRef.current.style.transition = 'opacity 1s ease-in-out'
      plusRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!plusRef.current.classList.contains('hidden')){
          plusRef.current.classList.add('hidden')
        }
      }, 1000);
      minusRef.current.style.transition = 'opacity 1s ease-in-out'
      minusRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!minusRef.current.classList.contains('hidden')){
          minusRef.current.classList.add('hidden')
        }
      }, 1000);
      setTimeout(() => {
        titleRef.current.classList.remove('--open')
        titleRef.current.classList.add('hidden')
      }, 1000);
    }
  }
  const handleAnimationIn = () =>{
    if(!titleRef.current.classList.contains('--open')){
      cartRef.current.style.transition = 'opacity 0s ease-in-out'
      cartRef.current.style.opacity = '1'
      if(cartRef.current.classList.contains('hidden')){
        cartRef.current.classList.remove('hidden')
      }
      infoRef.current.style.transition = 'opacity 0s ease-in-out'
      infoRef.current.style.opacity = '1'
      if(infoRef.current.classList.contains('hidden')){
        infoRef.current.classList.remove('hidden')
      }
      plusRef.current.style.transition = 'opacity 0s ease-in-out'
      plusRef.current.style.opacity = '1'
      if(plusRef.current.classList.contains('hidden')){
        plusRef.current.classList.remove('hidden')
      }
      minusRef.current.style.transition = 'opacity 0s ease-in-out'
      minusRef.current.style.opacity = '1'
      if(minusRef.current.classList.contains('hidden')){
        minusRef.current.classList.remove('hidden')
      }
      titleRef.current.style.opacity = '1'
      cartRef.current.style.opacity = '1'
      infoRef.current.style.opacity = '1'
      plusRef.current.style.opacity = '1'
      minusRef.current.style.opacity = '1'
      titleRef.current.classList.add('--open')
      titleRef.current.classList.remove('hidden')
    }
    const titleText = new SplitTextJS(titleRef.current) as any
    // @ts-ignore
    gsap.registerPlugin(MotionPathPlugin)
    // @ts-ignore
    titleText.chars.forEach((c:any,index:number)=>{
      gsap.fromTo(c,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: index * 2 * 0.02
        }
      })
      gsap.fromTo(cartRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.7
        }
      })
      })
      gsap.fromTo(infoRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.65
        }
      })
      gsap.fromTo(plusRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.6
        }
      })
      gsap.fromTo(minusRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.55
        }
      })
  }

  return (
    <div ref={productRef} onMouseEnter={()=>handleAnimationIn()} onMouseLeave={()=>handleAnimationOut()} className='product cursor-pointer my-10 mx-[50px] relative top-0 left-0'>
      <svg className='absolute opacity-0 -top-[15%] -left-[12.5%]' width={450} height={450}>
        <path ref={pathRef} d="M0,140a135,135 0 1,0 270,0a135,135 0 1,0 -270,0" fill="none" stroke="black" strokeWidth={2}/>
      </svg>
      <h3 ref={titleRef} className="product-title hidden text-neutral-900 text-4xl font-bold absolute top-0 left-0">{product.title}</h3>
      <div ref={cartRef} className="product-icon-wrapper hover:bg-gray-400 hidden absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/cart-icon.png" alt="icon-cart" width={25} height={25} />
      </div>
      <div ref={infoRef} className="product-icon-wrapper hover:bg-gray-400 hidden absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/info-icon.png" alt="icon-info" width={25} height={25} />
      </div>
      <div ref={plusRef} className="product-icon-wrapper hover:bg-gray-400 hidden absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/plus-icon.png" alt="icon-plus" width={25} height={25} />
      </div>
      <div ref={minusRef} className="product-icon-wrapper hover:bg-gray-400 hidden absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/minus-icon.png" alt="icon-minus" width={25} height={25} />
      </div>
      <div className='product-image relative top-0 left-0 bg-gray-300 rounded-full w-[220px] h-[220px] overflow-hidden'>
        <div className="product-breadcrumb absolute top-1/2 -translate-y-1/2 -right-48 px-8 py-3 bg-green-300 text-white font-bold rounded-l-md">{product.price}$</div>
        <Image className='rounded-full' src={product.img} alt='product-image' width={500} height={500} />
      </div>
    </div>
  )
}

export default Product
