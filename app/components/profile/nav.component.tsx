import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

const Nav = () => {

  const [activeSite,setActiveSite] = useState<string>('Account')
  const pathname = usePathname()

  const activeSiteMenuRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleInitMenus = () =>{
    activeSiteMenuRef.current.style.display = 'none'
  }

  const handleMenu = (ref:MutableRefObject<HTMLDivElement>) =>{
    if(!ref.current.classList.contains('--open')){
      ref.current.style.display = 'block'
      ref.current.classList.add('--open')
      gsap.fromTo(ref.current,{ y:100,opacity:0 },{ y:0,opacity:1,duration:1})
    }else{
      gsap.fromTo(ref.current,{ y:0,opacity:1},{ y:100,opacity:0,duration:1,onComplete:()=>{
        ref.current.classList.remove('--open')
        ref.current.style.display = 'none'
      }})
    }
  }

  const handleActiveSite = () =>{
    switch(pathname){
        case '/profile':
            setActiveSite('Account')
            break
        case '/payment-method-settings':
            setActiveSite('Payments')
            break
        default:
            setActiveSite('Account')
    }
  }

  useEffect(()=>{
      handleInitMenus()
      handleActiveSite()
  },[])

  return (
    <div onClick={()=>handleMenu(activeSiteMenuRef)} className='profile-nav md:w-1/3 cursor-pointer ml-[5%] mr-auto relative top-0 left-0'>
      <div className="profile-active-site bg-green-300 text-white font-bold rounded-md p-3">Current: <span className='ml-2 bg-blue-300 rounded-md p-2'>{activeSite}</span></div>
      <div ref={activeSiteMenuRef} className="profile-nav-menu z-50 rounded-md absolute top-12 left-1/2 -translate-x-1/2 w-[100%] p-2 bg-white shadow-lg shadow-gray-300">
        <Link href="/profile" onClick={()=>setActiveSite('Account')} className="block p-2 hover:bg-green-300 font-bold rounded-md hover:text-white">Account</Link>
        <Link href="/payment-method-settings" onClick={()=>setActiveSite('Payments')} className="block p-2 hover:bg-blue-300 font-bold rounded-md hover:text-white">Payments</Link>
      </div>
    </div>
  )
}
export default Nav
