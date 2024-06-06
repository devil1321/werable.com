'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'
import * as ApiActions from  '../controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'
import APIPrintful from '../controller/lib/APIPrintful'


const useSyncProduct = (id:number) => {
    
  const { locale } = useSelector((state:State) => state.api)
  const [variant,setVariant] = useState<any>(null)

  const handleFetchVariant = async() =>{
    try{
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
    const variantRes = await APIPrintful.get(`/variant`,{
      params:{
        id:data?.result?.sync_variants[0].variant_id
      },
      headers:{
          'X-PF-Language':locale
      }
    })
    const variantData = variantRes.data
    setVariant(variantData)
  }catch(err){
    console.log(err)
  }
}

  useEffect(()=>{
    handleFetchVariant()
  },[id,locale])

  return [variant,setVariant]
}

export default useSyncProduct
