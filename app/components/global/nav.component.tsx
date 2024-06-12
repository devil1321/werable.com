'use client'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useDispatch, useSelector } from 'react-redux'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { State } from '@/app/controller/reducers/root.reducer'
import { bindActionCreators } from 'redux'
import { useRouter } from 'next/navigation'

const Nav:React.FC<{jwt:string | null}> = ({jwt}) => {

  const router = useRouter()

  const [locale,setLocale] = useState<string>('EN')
  const [isLanguageMenu,setIsLanguageMenu] = useState<boolean>(false)
  
  const { countries,user,locale:language } = useSelector((state:State) => state.api)

  const [isPlaying,setIsPlaying] = useState<boolean>(false)
  const menuWrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>
  const imageRef = useRef() as MutableRefObject<HTMLImageElement>

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

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
      if(menuWrapperRef.current){
        menuWrapperRef.current.classList.add('--open')
      }
      if(overlayRef.current){
        overlayRef.current.style.display = 'block'
      }
      if(!isPlaying){
        setIsPlaying(true)
        gsap.fromTo('.nav-hamburger span:first-of-type',{ rotate:'0deg'},{ rotate:'45deg',duration:0.7,transformOrigin:'5px 2px'})
        gsap.fromTo('.nav-hamburger span:nth-of-type(2)',{ opacity:1},{ opacity:0,duration:0.5})
        gsap.fromTo('.nav-hamburger span:last-of-type',{ rotate:'0deg'},{ rotate:'-45deg',duration:0.7,transformOrigin:'5px 2px'})
        gsap.fromTo('.nav-menus-wrapper',{maxHeight:'0px'},{maxHeight:'460px',duration:1})
        gsap.fromTo('.nav-menus-wrapper',{paddingTop:'0px'},{paddingTop:'50px',duration:1})
        gsap.fromTo('.nav-menus-wrapper',{paddingBottom:'0px'},{paddingBottom:'50px',duration:1})
        gsap.fromTo('.nav a',{opacity:0,top:50},{opacity:1,top:0,stagger:0.2,duration:1,delay:1,onComplete:()=>setIsPlaying(false)})
        gsap.fromTo('.nav-overlay',{opacity:0},{opacity:1,duration:1})
      }
    }else{
      if(menuWrapperRef.current){
        menuWrapperRef.current.classList.remove('--open')
      }
      setTimeout(() => {
        if(overlayRef.current){
          overlayRef.current.style.display = 'none'
        }
      }, 2000);
      if(!isPlaying){
        gsap.fromTo('.nav-hamburger span:first-of-type',{ rotate:'45deg'},{ rotate:'0deg',duration:0.7,transformOrigin:'5px 2px'})
        gsap.fromTo('.nav-hamburger span:nth-of-type(2)',{ opacity:0},{ opacity:1,duration:0.5})
        gsap.fromTo('.nav-hamburger span:last-of-type',{ rotate:'-45deg'},{ rotate:'0deg',duration:0.7,transformOrigin:'5px 2px'})
        gsap.fromTo('.nav-menus-wrapper',{maxHeight:'460px'},{maxHeight:'0px',duration:1,delay:1})
        gsap.fromTo('.nav-menus-wrapper',{paddingTop:'50px'},{paddingTop:'0px',duration:1,delay:1})
        gsap.fromTo('.nav-menus-wrapper',{paddingBottom:'50px'},{paddingBottom:'0px',duration:1,delay:1,onComplete:()=>setIsPlaying(false)})
        gsap.fromTo('.nav a',{opacity:1},{opacity:0,stagger:0.2,duration:1})
        gsap.fromTo('.nav-overlay',{opacity:1},{opacity:0,delay:1,duration:1})
      }
    }
  }

  useEffect(()=>{
    APIActions.printfulGetCountries()
    setLocale(language)
  },[language])

  useEffect(()=>{
    handleMenuInit()
  },[menuWrapperRef.current])


  return (
    <div className='nav absolute top-0 left-0 min-w-[100vw] min-h-[50px] z-50'>
      <div ref={overlayRef} className="nav-overlay z-10 opacity-0 absolute top-0 left-0 w-[100%] h-[100vh]"></div>
        <div className="nav-navigation relative top-0 left-0 z-50">
        <div onClick={()=>handleMenu()} className='nav-hamburger absolute z-10 right-5 top-[10px] md:hidden'>
          <span className="block w-8 my-1 rounded-full border-b-[4px] border-white"></span>
          <span className="block w-8 my-1 rounded-full border-b-[4px] border-white"></span>
          <span className="block w-8 my-1 rounded-full border-b-[4px] border-white"></span>
        </div>
        <Image ref={imageRef} className='nav-image opacity-70' src="/assets/nav-bg.png" alt='nav-background' width={1920} height={400} />
        <div ref={menuWrapperRef} className="nav-menus-wrapper z-50 overflow-hidden md:overflow-visible absolute w-[100%] md:w-fit md:max-w-[100vw] bg-neutral-900/70 md:bg-transparent h-[460px] md:h-max rounded-md top-[150px] md:top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col md:flex-row justify-between items-center">
          <div className="nav-menu pt-10 md:p-0 relative z-30 -left-[0%] md:-left-[3%] lg:-left-[15%] xl:-left-[20%] -top-4 w-1/3 block md:flex gap-5">
            <div className="nav-language relative top-0 left-0">
              <p className='text-red-500 cursor-pointer min-w-max translate-y-2 text-center md:text-left' onClick={()=>setIsLanguageMenu(!isLanguageMenu)}>{locale}</p>
              {isLanguageMenu &&
                <div className="nav-language-menu h-[400px] overflow-y-scroll  bg-white p-3 rounded-md text-black absolute top-10 left-1/2 -translate-x-1/2">
                {countries?.result?.map((c:any)=> <p className='p-2 rounded-md hover:bg-gray-200 w-[200px] cursor-pointer' onClick={()=>{
                  setLocale(c.code)
                  setIsLanguageMenu(false)
                  APIActions.printfulSetLocale(c.code)
                  }}>{c.name}</p>)}
              </div>}
            </div>
            <Link onClick={()=>handleMenu()} className="relative my-2 md:my-0 text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/">Home</Link>
            <Link onClick={()=>handleMenu()} className="relative my-2 md:my-0 text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/products">Products</Link>
            <Link onClick={()=>handleMenu()} className="relative my-2 md:my-0 text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/about">About Us</Link>
            {jwt && <Link className="relative my-2 md:my-0 text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/profile">Profile</Link>}
           
          </div>
          <div className="nav-logo-wrapper relative -left-[0%]  -top-[10%] md:-left-[5%] lg:-left-0 w-1/3 md:flex gap-3 items-center">
            <Link className='flex justify-center items-center min-w-max mx-auto' href="/home">
            <div className="nav-logo mr-2 min-w-[40px] md:min-w-[0px] md:w-[30px] lg:w-[50px] xl:w-[70px]">
                <Image src="/assets/logo-white.svg" alt='nav-background' width={70} height={50} />
            </div>
            <h2 className="md:text-2xl xl:text-4xl font-bold text-white">Wearable</h2>
            </Link>
          </div>
          <div className="nav-menu pb-5 md:p-0 relative z-30 -left-[0%] md:-left-[8%] lg:left-[5%] xl:left-[10%] -top-4 w-1/3 block md:flex gap-5">
            <Link onClick={()=>handleMenu()} className="relative my-2 md:my-0 text-md md:text-sm block text-center md:inline-block z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/new-sale">New Sale</Link>
            <Link onClick={()=>handleMenu()} href="/cart" className="cursor-pointer relative my-2 md:my-0 text-md md:text-sm block text-center md:inline-block z-50 top-0 left-0 hover:underline text-white translate-y-2">Cart</Link>
            <Link onClick={()=>handleMenu()} className="relative my-2 md:my-0 text-md md:text-sm block text-center md:inline-block z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/favoruites">Favoruites</Link>
            <Link onClick={()=>handleMenu()} className="relative my-2 md:my-0 text-md md:text-sm block text-center md:inline-block z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/contact">Contact</Link>
            {jwt 
              ? <a onClick={()=>APIActions.logout()} className="relative text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2 cursor-pointer">Logout</a>
              : <Link onClick={()=>handleMenu()}  className="relative text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2" href="/login">Login</Link>}
            {menuWrapperRef?.current?.classList?.contains('--open') && <button onClick={()=>handleMenu()} className='block my-4 absolute -bottom-[40%] left-1/2 -translate-x-1/2 text-md text-white rounded-md font-bold px-12 py-2'>Close</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Nav
