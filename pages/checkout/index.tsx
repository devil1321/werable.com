import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import { bindActionCreators } from 'redux'
import Image from 'next/image'
import gsap from 'gsap'
import Layout from '../layout'
import { useRouter } from 'next/navigation'
import Item from '@/app/components/global/item.component'
import Product from '@/app/components/global/product.component'
import CheckoutItem from '@/app/components/global/checkout-item.component'
import Link from 'next/link'

const Page = () => {

  const router = useRouter()

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
      console.log(i.external_variant_id)
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
    shippingMenuRef.current.style.display = 'none'
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
    // handleInitMenus()
  },[])

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
      setShippingType(shipping?.result[0])
    }
  },[shipping,tax,summary,shippingType])

  useEffect(()=>{
    setTimeout(() => {
      if(cart.length === 0){
        router.push('/cart')
      }
    }, 2000);
  },[cart.length])
  

  return (
     <React.Fragment>
     {cart.length > 0 
      ? <div className='checkout px-2 md:px-12 py-[100px] md:flex md:justify-between md:items-start md:flex-wrap'>
        <h1 className="italic text-5xl w-[100%] text-[100px] text-center text-green-300">Checkout</h1>
        <div className="checkout-info md:w-1/2">
          <div className="checkout-user-details">
            <h3 className="my-5 text-5xl text-center w-[100%] font-bold text-orange-300 italic">Recipient</h3>
            <p className="text-lg italic bg-green-300 text-white px-6 my-2 rounded-md font-bold">{user.first_name} {user.last_name}</p>
            <p className="text-lg italic bg-green-300 text-white px-6 my-2 rounded-md font-bold">{user.address_1}</p>
            <p className="text-lg italic bg-green-300 text-white px-6 my-2 rounded-md font-bold">{user.address_2}</p>
            <p className="text-lg italic bg-green-300 text-white px-6 my-2 rounded-md font-bold">{user.city} {user.zip}</p>
            <p className="text-lg italic bg-green-300 text-white px-6 my-2 rounded-md font-bold">{user.country_code} {user.state_code}</p>
            <p className="text-lg italic bg-green-300 text-white px-6 my-2 rounded-md font-bold">{user.phone}</p>
          </div>
          <div className="user-items">
            <h3 className="my-5 text-5xl text-center font-bold text-orange-300 italic">Items</h3>
            {cart?.map((i:any) => <CheckoutItem key={`checkout-itemc-${i.id}`} product={i} />)}      
          </div>
        </div>
        <div className="checkout-controls md:w-1/2">
          <Image className='block mx-auto' src="/assets/login.svg" alt="image" width={300} height={300} />
          <h3 className='my-5 mt-[70px] text-5xl font-bold text-center text-orange-300'>Total</h3>
          <p className="text-4xl font-bold text-center">{total}{shippingType?.currency}</p>
        </div>
        <button className="block w-[100%] py-2 rounded-md font-bold text-white text-lg hover:opacity-50">Create An Order</button>
        <Link className="block w-[100%] my-2" href="/cart"><button className="block w-[100%] py-2 rounded-md font-bold text-white text-lg hover:opacity-50">Return To Cart</button></Link> 
      </div>
      : <h1 className='py-[100px] text-[100px] font-bold italic bg-green-300 px-6 py-2 text-white text-center'>Your Cart Is Empty</h1>}
      </React.Fragment>
  )
}

export default Page
