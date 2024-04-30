'use client'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'

const Nav = () => {

  const [isPlaying,setIsPlaying] = useState<boolean>(false)
  const menuWrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>
  const imageRef = useRef() as MutableRefObject<HTMLImageElement>

  const handleMenuInit = () =>{
    if(typeof window !== 'undefined'){
      const makeVisible = () =>{
        const links = document.querySelectorAll('.nav a') as NodeListOf<HTMLAnchorElement>
        if(window.innerWidth < 768){
          if(menuWrapperRef.current){
            menuWrapperRef.current.style.maxHeight = '0px'
          }
          if(overlayRef.current){
            overlayRef.current.style.display = 'none'
          }
          if(imageRef.current){
            imageRef.current.style.display = 'none'
          }
          links.forEach((l:HTMLAnchorElement) => {
            l.style.opacity = '0'
            l.style.top = '50px'
          })
        }else{
          if(menuWrapperRef.current){
            menuWrapperRef.current.style.maxHeight = 'fit-content'
          }
          if(overlayRef.current){
            overlayRef.current.style.display = 'none'
          }
          if(imageRef.current){
            imageRef.current.style.display = 'block'
          }
          links.forEach((l:HTMLAnchorElement) => {
            l.style.opacity = '1'
            l.style.top = '0px'
          })
        }
      }
      makeVisible()
      window.addEventListener('resize',makeVisible)
    }
  }

  const handleMenu = () =>{
    if(!menuWrapperRef.current.classList.contains('--open')){
      menuWrapperRef.current.classList.add('--open')
      overlayRef.current.style.display = 'block'
      if(!isPlaying){
        setIsPlaying(true)
        gsap.fromTo('.nav-hamburger span:first-of-type',{ rotate:'0deg'},{ rotate:'45deg',duration:0.7,transformOrigin:'5px 2px'})
        gsap.fromTo('.nav-hamburger span:nth-of-type(2)',{ opacity:1},{ opacity:0,duration:0.5})
        gsap.fromTo('.nav-hamburger span:last-of-type',{ rotate:'0deg'},{ rotate:'-45deg',duration:0.7,transformOrigin:'5px 2px'})
        gsap.fromTo('.nav-menus-wrapper',{maxHeight:'0px'},{maxHeight:'195px',duration:1})
        gsap.fromTo('.nav-menus-wrapper',{paddingTop:'0px'},{paddingTop:'50px',duration:1})
        gsap.fromTo('.nav-menus-wrapper',{paddingBottom:'0px'},{paddingBottom:'50px',duration:1})
        gsap.fromTo('.nav a',{opacity:0,top:50},{opacity:1,top:0,stagger:0.2,duration:1,delay:1,onComplete:()=>setIsPlaying(false)})
        gsap.fromTo('.nav-overlay',{opacity:0},{opacity:1,duration:1})
      }
    }else{
      menuWrapperRef.current.classList.remove('--open')
      setTimeout(() => {
        overlayRef.current.style.display = 'none'
      }, 2000);
      if(!isPlaying){
        gsap.fromTo('.nav-hamburger span:first-of-type',{ rotate:'45deg'},{ rotate:'0deg',duration:0.7,transformOrigin:'5px 2px'})
        gsap.fromTo('.nav-hamburger span:nth-of-type(2)',{ opacity:0},{ opacity:1,duration:0.5})
        gsap.fromTo('.nav-hamburger span:last-of-type',{ rotate:'-45deg'},{ rotate:'0deg',duration:0.7,transformOrigin:'5px 2px'})
        gsap.fromTo('.nav-menus-wrapper',{maxHeight:'195px'},{maxHeight:'0px',duration:1,delay:1})
        gsap.fromTo('.nav-menus-wrapper',{paddingTop:'50px'},{paddingTop:'0px',duration:1,delay:1})
        gsap.fromTo('.nav-menus-wrapper',{paddingBottom:'50px'},{paddingBottom:'0px',duration:1,delay:1,onComplete:()=>setIsPlaying(false)})
        gsap.fromTo('.nav a',{opacity:1},{opacity:0,stagger:0.2,duration:1})
        gsap.fromTo('.nav-overlay',{opacity:1},{opacity:0,delay:1,duration:1})
      }
    }
  }

  useEffect(()=>{
    handleMenuInit()
  },[menuWrapperRef.current])

  return (
    <div className='nav w-[100vw] absolute top-0 left-0'>
      <div ref={overlayRef} className="nav-overlay z-10 opacity-0 absolute top-0 left-0 w-[100%] h-[100vh]"></div>
        <div className="nav-navigation relative top-0 left-0 z-50">
        <div onClick={()=>handleMenu()} className='nav-hamburger absolute z-10 right-5 top-[10px] md:hidden'>
          <span className="block w-8 my-1 rounded-full border-b-[4px] border-white"></span>
          <span className="block w-8 my-1 rounded-full border-b-[4px] border-white"></span>
          <span className="block w-8 my-1 rounded-full border-b-[4px] border-white"></span>
        </div>
        <Image ref={imageRef} className='opacity-70' src="/assets/nav-bg.png" alt='nav-background' width={1920} height={400} />
        <div ref={menuWrapperRef} className="nav-menus-wrapper z-50 overflow-hidden md:overflow-visible absolute w-[100%] md:w-fit md:max-w-[100vw] bg-neutral-900/70 md:bg-transparent h-[195px] md:h-max rounded-md top-[150px] md:top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col md:flex-row justify-between items-center">
          <div className="nav-menu relative z-30 -left-[10%] md:-left-[5%] lg:-left-[15%] xl:-left-[10%] -top-4 w-1/3 flex gap-5">
            <Link className="relative z-50 top-0 left-0 hover:underline text-white" href="/home">Home</Link>
            <Link className="relative z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/products">Products</Link>
            <Link className="relative z-50 top-0 left-0 hover:underline text-white translate-y-4" href="/about">About Us</Link>
          </div>
          <div className="nav-logo relative -left-[30%] md:left-0 -top-[10%] w-1/3 flex gap-3 items-center">
            <div className="nav-logo min-w-[40px] md:min-w-[0px] md:w-[30px] lg:w-[50px] xl:w-[70px]">
              <Image src="/assets/logo-black.svg" alt='nav-background' width={70} height={50} />
            </div>
            <h2 className="md:text-2xl xl:text-4xl font-bold text-white">Werable</h2>
          </div>
          <div className="nav-menu relative z-30 -left-[25%] md:-left-[5%] lg:left-[5%] xl:left-[10%] -top-4 w-1/3 flex gap-5">
            <Link className="relative z-50 top-0 left-0 hover:underline text-white translate-y-6" href="/new-sale">New Sale</Link>
            <Link className="relative z-50 top-0 left-0 hover:underline text-white translate-y-4" href="/cart">Cart</Link>
            <Link className="relative z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/favoruites">Favoruites</Link>
            <Link className="relative z-50 top-0 left-0 hover:underline text-white" href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
