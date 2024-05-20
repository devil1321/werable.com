import React, { useEffect, useState } from 'react'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import { bindActionCreators } from 'redux'

const Summary = () => {

  const [total,setTotal] = useState<number>(0)

  const { summary, cart } = useSelector((state:State) => state.shop)
  const { tax, shipping, user } = useSelector((state:State) => state.api)

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  const shopActions = bindActionCreators(ShopActions,dispatch)


  useEffect(()=>{

  },[])

  return (
    <div className='cart-summary rounded-lg px-12 py-6 w-[90%] mx-auto md:w-1/3 md:ml-auto md:mr-[7%]'>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Total</h3>
        <h3 className="font-bold text-2xl">$999</h3>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Shipping</h3>
        <h3 className="font-bold text-2xl">$100</h3>
      </div>
      <button className="font-bold text-md text-white block w-[100%] hover:opacity-70 my-5 rounded-full py-2">Checkout</button>
    </div>
  )
}

export default Summary
