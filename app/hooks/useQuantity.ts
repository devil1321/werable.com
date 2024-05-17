'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'

const useQuantity = (id:number) => {

  const { cart } = useSelector((state:State) => state.shop)
  const [quantity,setQuantity] = useState<number>(0)

  const handleQuantity = () =>{
    const items = cart.filter((p:any) => p?.sync_product?.id === id)
    setQuantity(items.length)
  }

  useEffect(()=>{
    handleQuantity()
  },[cart.length,id])

  return [quantity,setQuantity]
}

export default useQuantity
