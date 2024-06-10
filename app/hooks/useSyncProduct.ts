'use client'
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'
import APIPrintful from '../controller/lib/APIPrintful'


const useSyncProduct = (id:number) => {

  const { locale } = useSelector((state:State) => state.api)
  const [item,setItem] = useState<any>(null)

  const handleFetchProduct = async() =>{
    const res = await APIPrintful.get(`/sync-products`,{
      params:{
        id:id,
      },
      headers:{
          "X-PF-Language":locale,
          'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID,
          'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
      }
    })
    const data = await res.data
    setItem(data)
  }

  useEffect(()=>{
      handleFetchProduct()
  },[id,locale])

  return [item,setItem]
}

export default useSyncProduct
