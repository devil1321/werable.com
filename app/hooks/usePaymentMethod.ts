import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { State } from '../controller/reducers/root.reducer'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'

const usePaymentMethod = () => {

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  const { user,card } = useSelector((state:State) => state.api)
  const [paymentMethod,setPaymentMethod] = useState<string>('paypal')

  const handlePaymentMethod = () =>{
    if(card){
        setPaymentMethod('card')
    }else{
        setPaymentMethod('paypal')
    }
  }
  
  useEffect(()=>{
    APIActions.getCard(user?.id)
  },[])

  useEffect(()=>{
    handlePaymentMethod()
  },[card])

  return [paymentMethod,setPaymentMethod]
}

export default usePaymentMethod
