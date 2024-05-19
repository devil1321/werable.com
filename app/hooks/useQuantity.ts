'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'

const useQuantity = (id:number) => {

  const { cart } = useSelector((state:State) => state.shop)
  const [quantity,setQuantity] = useState<number>(0)

  const handleQuantity = () =>{
    const item = cart.find((p:any) => p.id === id)
    if(item){
      setQuantity(item.quantity)
    }else{
      setQuantity(0)
    }
  }

  useEffect(()=>{
    handleQuantity()
  },[cart,id])

  return [quantity,setQuantity]
}

export default useQuantity
