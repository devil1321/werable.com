import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'
import { usePathname } from 'next/navigation'

const useVariantIndex = (id:number) => {

  const pathname = usePathname()

  const { favoruites,cart } = useSelector((state:State) => state.shop)

  const [variantIndex,setVariantIndex] = useState<number>(0)

  const handleVariantIndex = () =>{
    if(pathname === '/favoruites'){
        const item = favoruites.find((f:any) => f.id === id)
        if(item){
            setVariantIndex(item.variantIndex)
        }else{
            setVariantIndex(0)
        }
    }else{
        const item = cart.find((i:any) => i.id === id)
        if(item){
            setVariantIndex(item.variantIndex)
        }else{
            setVariantIndex(0)
        }
    }
  }

  const handleItemVariantIndex = () =>{
    const item_fav = favoruites.find((f:any) => f.id === id)
    const item_cart = cart.find((i:any) => i.id === id)
    if(item_fav){
      item_fav.variantIndex = variantIndex
    }
    if(item_cart){
      item_cart.variantIndex = variantIndex
    }
  }

  useEffect(()=>{
    handleItemVariantIndex()
  },[variantIndex])

  useEffect(()=>{
    handleVariantIndex()
  },[id])

  return [variantIndex,setVariantIndex]
}

export default useVariantIndex
