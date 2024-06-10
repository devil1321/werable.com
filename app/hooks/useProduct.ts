import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'

const useProduct = (product:any) => {

  const { products } = useSelector((state:State) => state.api)
  const [sync_product,setSyncProduct] = useState<any>(null)
  const [sync_variants,setSyncVariants] = useState<any>([])

  const handleProduct = () =>{
    if(product?.sync_product && product?.sync_variants?.length > 0){
        setSyncProduct(product.sync_product)
        setSyncVariants(product.sync_variants)
    }else{
        const item = products?.find((p:any)   => p?.sync_product?.id === product?.id)
        if(item){
          setSyncProduct(item.sync_product)
          setSyncVariants(item.sync_variants)
        }
    }
  }

  useEffect(()=>{
    if(!sync_product && sync_variants?.length === 0){
      handleProduct()
    }
  },[product,products])

  return { sync_product,sync_variants }
}

export default useProduct
