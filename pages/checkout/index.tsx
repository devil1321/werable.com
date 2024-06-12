import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import { bindActionCreators } from 'redux'
import Image from 'next/image'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import CheckoutItem from '@/app/components/global/checkout-item.component'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import usePaymentMethod from '@/app/hooks/usePaymentMethod'

const Page:React.FC<{jwt:string}> = ({jwt}) => {

  const router = useRouter()

  const paymentMenuRef = useRef() as MutableRefObject<HTMLDivElement>
  const [total,setTotal] = useState<number>(0)
  const [shippingType,setShippingType] = useState<any>(null)
  const [paymentMethod,setPaymentMethod] = usePaymentMethod()

  const { summary, cart } = useSelector((state:State) => state.shop)
  const { tax, shipping, user, card, locale, data } = useSelector((state:State) => state.api)

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  const shopActions = bindActionCreators(ShopActions,dispatch)

  const handleInit = () =>{
    if(!jwt){
      router.push('/login')
    }
  }

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

  const handleCreateAnOrder = () => {
    const items = cart.map((i:any) => { 
      return {
      external_variant_id:String(i.external_variant_id),
      quantity:i.quantity,
    }})
    if(paymentMethod === 'paypal'){
      APIActions.printfulCreateNewOrder(true,true,{
        recipient:{
          name:`${String(user?.first_name)} ${String(user?.last_name)}`,
          email:String(user?.email),
          address1:String(user.address_1),
          city:String(user.city),
          country_code:String(user.country_code),
          state_code:String(user.state_code),
          zip:String(user.zip),
          phone:String(user.phone)
        },
        items:items,
        shipping:shippingType?.id,
        gift:{  
          subject:"To Customer",
          message:'We are proud you were chosen wearable :)'
        },
        packing_slip:{
          email:user.email,
          phone:user.phone,
          message:`To Ms/Mr ${user.first_name} ${user.last_name}`,
          logo_url:'https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_1280.png',
          store_name:'Wearable',
          custom_order_id:uuidv4().slice(0,20)
        },
        confirm:true,
        payment:{
          method:"paypal"
        }
      })
    }else if(paymentMethod === 'card'){
      APIActions.printfulCreateNewOrder(true,true,{
        recipient:{
          name:`${String(user?.first_name)} ${String(user?.last_name)}`,
          email:String(user?.email),
          address1:String(user.address_1),
          city:String(user.city),
          country_code:String(user.country_code),
          state_code:String(user.state_code),
          zip:String(user.zip),
          phone:String(user.phone)
        },
        items:items,
        shipping:shippingType?.id,
        gift:{  
          subject:"To Customer",
          message:'We are proud you were chosen wearable :)'
        },
        packing_slip:{
          email:user.email,
          phone:user.phone,
          message:`To Ms/Mr ${user.first_name} ${user.last_name}`,
          logo_url:'https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_1280.png',
          store_name:'Wearable',
          custom_order_id:uuidv4().slice(0,20)
        },
        confirm:true,
        payment:{
          method:"card",
          card:{
            number:card.card_number,
            exp_month:card.card_exp_month,
            exp_year:card.card_exp_year,
            cvc:card.card_cvc,
            name:card.card_owner_name
          }
        }
      })
    }
  }

  const handleTotal = () =>{
    setTotal(Number(summary) + Number(shippingType?.rate) + (Number(tax?.result?.rate) * (shippingType?.shipping_taxable ? Number(shippingType.rate) : 0) + (Number(tax?.result?.rate) * Number(summary))))
  }


  const handleInitMenus = () =>{
    paymentMenuRef.current.style.display = 'none'
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
    handleInit()
  },[])

  useEffect(()=>{
    if(paymentMenuRef.current){
      handleInitMenus()
    }
  },[paymentMenuRef.current])

  useEffect(()=>{
    if(user){
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

  useEffect(()=>{
    if(data?.result?.external_id){
      router.push('/success')
    }else if(data?.result.status === 'pending'){
      router.push('/pending')
    }
  },[data])

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
            {cart?.map((i:any) => <CheckoutItem key={`checkout-item-${i.id}`} product={i} />)}      
          </div>
        </div>
        <div className="checkout-controls md:w-1/2">
          <Image className='block mx-auto' src="/assets/login.svg" alt="image" width={300} height={300} />
          <h3 className='my-5 mt-[70px] text-5xl font-bold text-center text-orange-300'>Total</h3>
          <p className="text-4xl font-bold text-center">{total}{shippingType?.currency}</p>
          {card?.card_number && paymentMethod === 'card'
          ? <form className='mt-5' action="">
            <div className="card-form-field">
              <label className='block' htmlFor="">Card Number:</label>
              <input className='p-2 w-[100%] bg-green-300 text-white font-bold'  type="text" value={card?.card_number} />
            </div>
            <div className="card-form-field">
              <label className='block' htmlFor="">Card Number:</label>
              <input className='p-2 w-[100%] bg-green-300 text-white font-bold'  type="text" value={card?.card_number} />
            </div>
            <div className="card-form-field">
              <label className='block' htmlFor="">Card Owner Name:</label>
              <input className='p-2 w-[100%] bg-green-300 text-white font-bold'  type="text" value={card?.card_owner_name} />
            </div>
            <div className="card-form-field">
              <label className='block' htmlFor="">Card Exp Month:</label>
              <input className='p-2 w-[100%] bg-green-300 text-white font-bold'  type="text" value={card?.card_exp_month} />
            </div>
            <div className="card-form-field">
              <label className='block' htmlFor="">Card Exp Year:</label>
              <input className='p-2 w-[100%] bg-green-300 text-white font-bold'  type="text" value={card?.card_exp_year} />
            </div>
            <div className="card-form-field">
              <label className='block' htmlFor="">Card Cvc Year:</label>
              <input className='p-2 w-[100%] bg-green-300 text-white font-bold'  type="text" value={card?.card_cvc} />
            </div>
          </form>
          : <h2 className='mt-5 font-bold text-white bg-orange-300 px-3 w-[90%] mx-auto py-2 rounded-md'>{paymentMethod === 'card' ? 'Add Card At Payment Method Settings' : 'You Choose Paypal'}</h2>}
        </div>
        <div onClick={()=>handleMenu(paymentMenuRef)} className="checkout-payment z-50 cursor-pointer relative top-0 left-0">
          <h3 className="text-md font-bold text-white my-2 bg-blue-300 rounded-md p-3">Payment Method: <span className="p-2 rounded-md ml-2 bg-red-300">{paymentMethod.toString().toLocaleUpperCase() as string}</span></h3>
          <div ref={paymentMenuRef} className="checkout-payment-method-menu shadow-lg shadow-gray-300 cursor-pointer rounded-md z-50 bg-white p-2 w-[240px] text-center absolute top-[64px] left-1/2 -translate-x-1/2">
            {/* @ts-ignore */}
            <div className='p-2 hover:bg-green-300 w-max rounded-md font-bold hover:text-white' onClick={()=>setPaymentMethod('paypal')}>Paypal</div>
            {/* @ts-ignore */}
            <div className='p-2 hover:bg-green-300 w-max rounded-md font-bold hover:text-white' onClick={()=>setPaymentMethod('card')}>Card</div>
          </div>
        </div>
        <button onClick={()=>handleCreateAnOrder()} className="block w-[100%] py-2 rounded-md font-bold text-white text-lg hover:opacity-50">Create An Order</button>
        <Link className="block w-[100%] my-2" href="/cart"><button className="block w-[100%] py-2 rounded-md font-bold text-white text-lg hover:opacity-50">Return To Cart</button></Link> 
      </div>
      : <h1 className='text-[100px] font-bold italic bg-green-300 px-6 py-2 text-white text-center'>Your Cart Is Empty</h1>}
      </React.Fragment>
  )
}

export default Page
export const getServerSideProps = async(context:any) =>{
  let wearableJwtCookie
  if (context.req.headers.cookie) {
    const cookies = context.req.headers.cookie.split(';').reduce((prev:any, current:any) => {
      const [name, value] = current.trim().split('=');
      prev[name] = value;
      return prev;
    }, {});
    wearableJwtCookie = cookies['wearable-jwt'];
    
  }
  return {
    props:{
      jwt:wearableJwtCookie ? wearableJwtCookie : null
    }
  }
}
