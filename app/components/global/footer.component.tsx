'use client'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Footer = () => {

  const formRef = useRef() as MutableRefObject<HTMLDivElement>
  const logoRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleFormMD = () =>{
    if(typeof window !== 'undefined'){
      const makeVisible = () =>{
        if(window.innerWidth >= 768){
          if(formRef.current){
            formRef.current.style.display = 'block'
          }
          if(logoRef.current){
            logoRef.current.style.display = 'flex'
          }
        }else{
          if(formRef.current){
            formRef.current.style.display = 'none'
          }
          if(logoRef.current){
            logoRef.current.style.display = 'none'
          }
        }
      }
      makeVisible()
      window.addEventListener('resize',makeVisible)
    }
  }

  useEffect(()=>{
    handleFormMD()
  },[])

  return (
    <div className='footer w-[100vw] max-w-[1920px] relative top-0 left-0'>
      <Image src="/assets/footer.png" alt='footer-img' width={1920} height={300} />
      <div className="footer-details absolute w-[100%] left-[10%] 2xl:px-[100px] 2xl:left-0 top-1/2 -translate-y-1/2 flex justify-between">
        <div className="footer-contact-info relative top-3 left-0 md:top-0">
          <div ref={logoRef} className="footer-logo flex gap-3 items-center">
            <Image src="/assets/logo-white.svg" alt='logo' width={70} height={50} />
            <h2 className="text-5xl text-white font-bold">Wearable</h2>
          </div>
          <div className="footer-contact-item my-1 md:my-5 flex gap-3 items-center">
            <Image src="/assets/email-icon.png" alt="email" width={30} height={30} />
            <p className="text-sm text-white italic">Email: composite.wearable@protonmail.com</p>
          </div>
          <div className="footer-contact-item my-1 md:my-5 flex gap-3 items-center">
            <Image src="/assets/email-icon.png" alt="phone" width={30} height={30} />
            <p className="text-sm text-white italic">Phone: 696442238</p>
          </div>
          {/* <div className="footer-contact-item my-0 md:my-5 flex gap-3 items-center">
            <Image src="/assets/email-icon.png" alt="address" width={30} height={30} />
            <div>
              <p className="text-sm text-white italic">Rakolupy Duze 36</p>
              <p className="text-sm text-white italic">22-122 Lesniowice</p>
            </div>
          </div> */}
        </div>
          <button className='w-[170px] md:hidden relative -top-5 left-0 py-2 font-bold text-white text-md rounded-full'>
            <Link className="block -ml-[20px]" href="/contact">
              Contact
            </Link>
          </button>
        <div ref={formRef} className="hidden footer-form w-[300px] relative top-[130px] -left-[20%]">
          <h2 className="text-3xl my-2 italic font-bold text-white text-center">Contact With Us</h2>
          <form action="">
            <div className="footer-field bg-white p-2 rounded-full">
              <input type="text" placeholder='Enter your email address' />
            </div>
            <button className="block m-2 py-1 relative -left-[3%] top-0 w-[100%] rounded-full font-bold text-2xl text-center text-white">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Footer
