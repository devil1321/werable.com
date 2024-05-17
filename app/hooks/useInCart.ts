'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'

const useInCart = (id:number) => {

  const { cart } = useSelector((state:State) => state.shop)
  const [inCart,setInCart] = useState<boolean>(false)

  const handleInCart = () =>{
    const items = cart.filter((p:any) => p?.sync_product?.id === id)
    const isExits = Boolean(items.length > 0)
    if(isExits){
        setInCart(true)
    }else{
        setInCart(false)
    }
  }

  useEffect(()=>{
    handleInCart()
  },[cart.length,id])

  return [inCart,setInCart]
}

export default useInCart
