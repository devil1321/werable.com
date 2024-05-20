'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'

const useFavoruite = (id:number) => {

  const { favoruites } = useSelector((state:State) => state.shop)
  const [isFavoruite,setIsFavoruite] = useState<boolean>(false)

  const handleFavoruite = () =>{
    const isIn = Boolean(favoruites.filter((f:any) => f === id).length > 0)
    setIsFavoruite(isIn)
  }

  useEffect(()=>{
    handleFavoruite()
  },[id,favoruites.length])

  return [isFavoruite,setIsFavoruite]
}

export default useFavoruite
