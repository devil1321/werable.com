import React, { useEffect, useState } from 'react'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import { bindActionCreators } from 'redux'
import Link from 'next/link'

const Summary = () => {

  const [total,setTotal] = useState<number>(0)

  const { summary, cart } = useSelector((state:State) => state.shop)
  const { tax, shipping, user, locale } = useSelector((state:State) => state.api)

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  const shopActions = bindActionCreators(ShopActions,dispatch)

  const handleShipping = () => {
    const items = cart.map((i:any) => ({
      variant_id:String(i.variant_id),
      external_variant_id:String(i.external_variant_id),
      warehouse_product_variant_id:String(i.warehouse_product_variant_id),
      quantity:i.quantity,
      value:i.retail_price,
      currency:i.currency
    }))
    APIActions.printfulShippingRateAPI({
      recipient:{
        address1:String(user.address_1),
        city:String(user.city),
        country_code:String(user.country_code),
        state_code:String(user.state_code),
        zip:String(user.zip),
        phone:String(user.phone)
      },
      items:items,
      currency:items[0].currency,
      locale:String(locale)
    })
  }

  const handleTotal = () =>{
    setTotal(summary + shipping?.result?.rate + (tax?.result?.rate * summary))
  }

  useEffect(()=>{
    if(user){
      APIActions.printfulCalculateTaxRate({
        country_code:user.country_code,
        state_code:user.state_code,
        city:user.city,
        zip:user.zip
      })
      handleShipping()
    }
  },[])

  useEffect(()=>{
    handleTotal()
  },[shipping,tax,summary])

  

  return (
    <div className='cart-summary rounded-lg px-12 py-6 w-[90%] mx-auto md:w-1/3 md:ml-auto md:mr-[7%]'>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Items</h3>
        <h3 className="font-bold text-2xl">{summary}{cart[0]?.currency}</h3>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Shipping</h3>
        <button className='px-3 py-2 text-white font-bold'>{tax?.result?.shipping_taxable ? 'Taxable' : "Tax Free"}</button>
        <h3 className="font-bold text-2xl">{shipping?.result?.rate}{shipping?.result?.currency}</h3>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Tax</h3>
        <h3 className="font-bold text-2xl">{(tax?.result?.rate * shipping)}{tax?.result?.currency}</h3>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Total</h3>
        <h3 className="font-bold text-2xl">{total}</h3>
      </div>
      <Link href="/checkout"><button className="font-bold text-md text-white block w-[100%] hover:opacity-70 my-5 rounded-full py-2">Checkout</button></Link>
    </div>
  )
}

export default Summary
