'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'

const useCategory = (categoryNumber:number) => {
  
    const { categories } = useSelector((state:State) => state.api)
    const [category,setCategory] = useState<any>(null)

    const handleCategory = () =>{
        console.log(categories)
        const current = categories.result?.categories?.find((c:any) => c.id === categoryNumber)
        setCategory(current)
    }

    useEffect(()=>{
        handleCategory()
    },[categoryNumber,categories])

    return [category,setCategory]
}

export default useCategory
