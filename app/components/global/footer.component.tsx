import React from 'react'
import Image from 'next/image'


const Footer = () => {
  return (
    <div className='footer w-[100vw] relative top-0 left-0'>
      <Image src="/assets/footer.png" alt='footer-img' width={1920} height={300} />
      <div className="footer-details absolute w-[100%] left-[10%] top-1/2 -translate-y-1/2 flex justify-between">
        <div className="footer-contact-info">
          <div className="footer-logo flex gap-3 items-center">
            <Image src="/assets/logo-white.svg" alt='logo' width={70} height={50} />
            <h2 className="text-5xl text-white font-bold">Werable</h2>
          </div>
          <div className="footer-contact-item my-5 flex gap-3 items-center">
            <Image src="/assets/email-icon.png" alt="email" width={30} height={30} />
            <p className="text-sm text-white">support@werable.com</p>
          </div>
          <div className="footer-contact-item my-5 flex gap-3 items-center">
            <Image src="/assets/email-icon.png" alt="phone" width={30} height={30} />
            <p className="text-sm text-white">888-100-888</p>
          </div>
          <div className="footer-contact-item my-5 flex gap-3 items-center">
            <Image src="/assets/email-icon.png" alt="address" width={30} height={30} />
            <div>
              <p className="text-sm text-white">Houston Road 25</p>
              <p className="text-sm text-white">Seattle 200-300</p>
            </div>
          </div>
        </div>
        <div className="footer-form w-[300px] relative top-[150px] -left-[20%]">
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