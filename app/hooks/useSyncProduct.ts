'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'
import * as ApiActions from  '../controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'


const useSyncProduct = (id:number) => {

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  const { product } = useSelector((state:State) => state.api)
  const [item,setItem] = useState<any>(null)

  useEffect(()=>{
    if(id){
      APIActions.printfulGetSyncProduct(id)
    }
  },[id])

  useEffect(()=>{
    setItem(product)
  },[product])

  return [item,setItem]
}

export default useSyncProduct
