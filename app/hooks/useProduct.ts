import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import printful from '../controller/lib/APIPrintful'

const useProduct = (product:any) => {

  const { locale } = useSelector((state:State) => state.api)
  const { products } = useSelector((state:State) => state.api)
  const [sync_product,setSyncProduct] = useState<any>(null)
  const [sync_variants,setSyncVariants] = useState<any>([])

  const handleProduct = async() =>{
    const res = await printful.get('/sync-products',{
      params:{
        id:product.id,
        locale:locale
      }
    })
    const data = await res.data
    if(data?.result?.sync_product){
      setSyncProduct(data?.result?.sync_product)
    }else{
      setSyncProduct({})
    }
    if(data?.result?.sync_variants){
      setSyncVariants(data?.result?.sync_variants)
    }else{
      setSyncVariants([])
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
