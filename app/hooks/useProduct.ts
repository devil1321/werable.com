'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'
import * as APIController from '@/app/APIController/printful'

const useProduct = (id:number) => {

  const { products,locale } = useSelector((state:State) => state.api)
  const [product,setProduct] = useState<any>(null)

  const handleProduct = async() =>{
    const res = await APIController.printfulGetSyncProduct(locale,id)
    const data = res.data
    setProduct(data)
  }

  useEffect(()=>{
    handleProduct()
  },[products])

  return [product,setProduct]
}

export default useProduct
