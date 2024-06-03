import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import gsap from 'gsap'

const Summary = () => {

  const shippingMenuRef = useRef() as MutableRefObject<HTMLDivElement>
  const [total,setTotal] = useState<number>(0)
  const [shippingType,setShippingType] = useState<any>(null)

  const { summary, cart } = useSelector((state:State) => state.shop)
  const { tax, shipping, user, locale } = useSelector((state:State) => state.api)

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  const shopActions = bindActionCreators(ShopActions,dispatch)

  const handleShipping = () => {
    const items = cart.map((i:any) => { 
      return {
      variant_id:String(i.variant_id),
      external_variant_id:String(i.external_variant_id),
      warehouse_product_variant_id:String(i.warehouse_product_variant_id),
      quantity:i.quantity,
      value:i.retail_price,
      currency:i.currency
    }})
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
      currency:items[0]?.currency,
      locale:String(locale)
    })
  }

  const handleTotal = () =>{
    setTotal(Number(summary) + Number(shippingType?.rate) + (Number(tax?.result?.rate) * (shippingType?.shipping_taxable ? Number(shippingType.rate) : 0) + (Number(tax?.result?.rate) * Number(summary))))
  }


  const handleInitMenus = () =>{
    if(shippingMenuRef.current){
      shippingMenuRef.current.style.display = 'none'
    }
  }

  const handleMenu = (ref:MutableRefObject<HTMLDivElement>) =>{
    if(!ref.current.classList.contains('--open')){
      ref.current.style.display = 'block'
      ref.current.classList.add('--open')
      gsap.fromTo(ref.current,{ y:100,opacity:0 },{ y:0,opacity:1,duration:1})
    }else{
      gsap.fromTo(ref.current,{ y:0,opacity:1},{ y:100,opacity:0,duration:1,onComplete:()=>{
        ref.current.classList.remove('--open')
        ref.current.style.display = 'none'
      }})
    }
  }

  useEffect(()=>{
    handleInitMenus()
  },[shippingMenuRef.current])

  useEffect(()=>{
    if(user){
      APIActions.printfulCalculateTaxRate({
        country_code:user.country_code,
        state_code:user.state_code,
        city:user.city,
        zip:user.zip
      })
      handleShipping()
      shopActions.summary()
    }
  },[cart.length,user])

  useEffect(()=>{
    handleTotal()
    if(!shippingType){
      if(shipping?.result){  
        setShippingType(shipping?.result[0])
      }
    }
  },[shipping,tax,summary,shippingType])

  

  return (
    <div className='cart-summary rounded-lg px-12 py-6 w-[90%] mx-auto'>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Items</h3>
        <h3 className="font-bold text-2xl">{summary}{cart[0]?.currency}</h3>
      </div>
      <div className="flex justify-between items-start flex-wrap text-center md:flex-nowrap">
        <h3 className="font-bold text-2xl">Shipping</h3>
        <button className='px-3 rounded-md py-2 text-white font-bold'>{tax?.result?.shipping_taxable ? 'Taxable' : "Tax Free"}</button>
        {shipping?.result?.length > 0 && 
        <button onClick={()=>handleMenu(shippingMenuRef)} className='px-3 rounded-md py-2 text-white font-bold relative top-0 left-0'>
          <h3>{shippingType?.name}</h3>
            <div ref={shippingMenuRef} className="summary-shipping-menu rounded-md min-w-max text-black p-2 bg-white absolute z-20 left-1/2 top-[70px] md:top-12 -translate-x-1/2">
              {shipping?.result?.map((s:any) => <div onClick={()=>setShippingType(s)} className='p-2 rounded-md hover:text-white hover:bg-green-300'>{s?.name}</div>)}
            </div>
        </button>}
        <h3 className="font-bold text-2xl text-center md:text-right w-[100%] md:w-fit">{shippingType?.rate}{shippingType?.currency}</h3>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Tax</h3>
        <h3 className="font-bold text-2xl">{(tax?.result?.rate * (shippingType?.shipping_taxable ? shippingType.rate : 0) + (summary * tax?.result?.rate))}{shippingType?.currency}</h3>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Total</h3>
        <h3 className="font-bold text-2xl">{total}{shippingType?.currency}</h3>
      </div>
      <Link className='relative top-0 left-0 z-50' href="/checkout"><button className="font-bold text-md text-white block w-[100%] hover:opacity-70 my-5 rounded-full py-2">Checkout</button></Link>
    </div>
  )
}

export default Summary
