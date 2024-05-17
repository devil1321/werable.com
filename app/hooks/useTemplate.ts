'use client'
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'
import APIPrintful from '../controller/lib/APIPrintful'


const useTemplate = (id:number,offset:number,limit:number) => {
    
  const { products,locale } = useSelector((state:State) => state.api)
  const [template,setTemplate] = useState<any>(null)

  const handleFetchTemplate = async() =>{
    try{
      const res = await APIPrintful.get(`/sync-products`,{
        params:{
          id:id,
          details:true
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
    const variantData = await variantRes.data
    const templatesRes = await APIPrintful.get('/product-templates',{
        params:{
            offset:offset,
            limit:limit
        },
        headers:{
            "X-PF-Language":locale,
            'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
        }
    })
    const templatesData = await templatesRes.data
    const currentTemplate = templatesData?.result?.items.find((t:any) => t.product_id === variantData?.result?.product?.id)
    setTemplate(currentTemplate)
  }catch(err){
    console.log(err)
  }
}

  useEffect(()=>{
    handleFetchTemplate()
  },[products,id])

  return [template,setTemplate]
}

export default useTemplate
