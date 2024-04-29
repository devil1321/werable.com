import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className='nav w-[100vw] absolute top-0 left-0 z-10'>
      <Image className='opacity-70' src="/assets/nav-bg.png" alt='nav-background' width={1920} height={300} />
      <div className="nav-menus-wrapper absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-between items-center">
        <div className="nav-menu relative -left-[30%] -top-4 w-1/3 flex gap-5">
          <Link className="hover:underline text-white" href="/home">Home</Link>
          <Link className="hover:underline text-white translate-y-2" href="/products">Products</Link>
          <Link className="hover:underline text-white translate-y-4" href="/about">About Us</Link>
        </div>
        <div className="nav-logo w-1/3 flex gap-3 items-center">
          <Image src="/assets/logo-black.svg" alt='nav-background' width={70} height={50} />
          <h2 className="text-4xl font-bold text-white">Werable</h2>
        </div>
        <div className="nav-menu relative left-[30%] -top-4 w-1/3 flex gap-5">
          <Link className="hover:underline text-white translate-y-6" href="/new-sale">New Sale</Link>
          <Link className="hover:underline text-white translate-y-4" href="/cart">Cart</Link>
          <Link className="hover:underline text-white translate-y-2" href="/favoruites">Favoruites</Link>
          <Link className="hover:underline text-white" href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  )
}

export default Nav
