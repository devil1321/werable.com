import React, { useEffect } from 'react'
import * as UiActions from '@/app/controller/action-creators/ui.action-creators'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const Nav = () => {

  const dispatch = useDispatch()
  const UIActions = bindActionCreators(UiActions,dispatch)

  const handleInitActive = () =>{
    if(typeof window !== 'undefined'){
        if(typeof document !== 'undefined'){
            const buttons = document.querySelectorAll(".orders-nav-button") as NodeListOf<HTMLButtonElement>
            buttons.forEach((b:HTMLButtonElement) => b.classList.remove('--active'))
            buttons[0].classList.add('--active')
        }
    }
  }
  const handleActive = (e:any) =>{
    if(typeof window !== 'undefined'){
        if(typeof document !== 'undefined'){
            const buttons = document.querySelectorAll(".orders-nav-button") as NodeListOf<HTMLButtonElement>
            buttons.forEach((b:HTMLButtonElement) => b.classList.remove('--active'))
            e.target.classList.add('--active')
        }
    }
  }

  useEffect(()=>{
    handleInitActive()
  },[])

  return (
      <div className='orders-nav flex flex-wrap justify-center items-center'>
        <button onClick={(e)=>{
            UIActions.setOrderTab(0)
            handleActive(e)
        }} className='orders-nav-button md:rounded-l-md text-white font-bold text-center px-6 py-2 hover:opacity-50'>Shipping</button>
        <button onClick={(e)=>{
            UIActions.setOrderTab(1)
            handleActive(e)
        }} className='orders-nav-button text-white font-bold text-center px-6 py-2 hover:opacity-50'>Recipient</button>
        <button onClick={(e)=>{
            UIActions.setOrderTab(2)
            handleActive(e)
        }} className='orders-nav-button text-white font-bold text-center px-6 py-2 hover:opacity-50'>Items</button>
        <button onClick={(e)=>{
            UIActions.setOrderTab(3)
            handleActive(e)
        }} className='orders-nav-button text-white font-bold text-center px-6 py-2 hover:opacity-50'>Incomplete Items</button>
        <button onClick={(e)=>{
            UIActions.setOrderTab(4)
            handleActive(e)
        }} className='orders-nav-button text-white font-bold text-center px-6 py-2 hover:opacity-50'>Costs</button>
        <button onClick={(e)=>{
            UIActions.setOrderTab(5)
            handleActive(e)
        }} className='orders-nav-button md:rounded-r-md text-white font-bold text-center px-6 py-2 hover:opacity-50'>Packing Slip</button>
      </div>
  )
}

export default Nav
