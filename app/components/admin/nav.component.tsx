import React, { MutableRefObject, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import * as UiActions from '@/app/controller/action-creators/ui.action-creators'
import { bindActionCreators } from 'redux'
import { handleSidebar } from '@/app/controller/lib/handleSidebar'

const Nav = () => {

  const { isSidebar } = useSelector((state:State) => state.ui)
  const dispatch = useDispatch()
  const UIActions = bindActionCreators(UiActions,dispatch)

  return (
    <div className='admin-nav fixed z-50 w-[100vw] top-0 left-0 px-3 py-2 md:px-12 flex justify-between items-center bg-neutral-900'>
        <div onClick={()=>handleSidebar(isSidebar,UIActions)} className='admin-nav-hamburger'>
          <span className="block w-8 my-1 rounded-full border-b-[4px] border-white"></span>
          <span className="block w-8 my-1 rounded-full border-b-[4px] border-white"></span>
          <span className="block w-8 my-1 rounded-full border-b-[4px] border-white"></span>
        </div>
        <div className="admin-nav-logo-wrapper ml-auto relative top-0 left-0 w-1/3 md:flex gap-3 items-center">
            <Link className='flex justify-center items-center min-w-max mx-auto' href="/home">
                <div className="admin-nav-logo mr-2 min-w-[40px] md:min-w-[0px] md:w-[30px] lg:w-[50px] xl:w-[70px]">
                    <Image src="/assets/logo-white.svg" alt='admin-nav-background' width={70} height={50} />
                </div>
                <h2 className="md:text-2xl xl:text-4xl font-bold text-white">Wearable</h2>
            </Link>
        </div>
    </div>
  )
}

export default Nav
