'use client'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import  MotionPathPlugin  from 'gsap/dist/MotionPathPlugin'
import SplitTextJS from 'split-text-js'
import useSyncProduct from '@/app/hooks/useSyncProduct'
import useVariant from '@/app/hooks/useVariant'
import Link from 'next/link'
import * as ShopActions  from '@/app/controller/action-creators/shop.action-creators'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import useFavoruite from '@/app/hooks/useFavoruite'
import useInCart from '@/app/hooks/useInCart'
import useQuantity from '@/app/hooks/useQuantity'

const Product:React.FC<{ product?:any, id?:number; productRef?:MutableRefObject<HTMLDivElement> }> = ({product,id,productRef}) => {

  const titleRef = useRef() as MutableRefObject<HTMLHeadingElement>
  const pathRef = useRef() as MutableRefObject<SVGPathElement>
  const pathRefIcons = useRef() as MutableRefObject<SVGPathElement>
  const favoruitesRef = useRef() as MutableRefObject<HTMLDivElement>
  const sizeRef = useRef() as MutableRefObject<HTMLDivElement>
  const cartRef = useRef() as MutableRefObject<HTMLDivElement>
  const infoRef = useRef() as MutableRefObject<HTMLAnchorElement>
  const plusRef = useRef() as MutableRefObject<HTMLDivElement>
  const minusRef = useRef() as MutableRefObject<HTMLDivElement>
  const breadcrumbRef = useRef() as MutableRefObject<HTMLDivElement>
  
  const [item,setItem] = useSyncProduct(id ? id : product.id)
  const [variant,setVariant] = useVariant(id ? id : product.id)
  const [isFavoruite,setIsFavoruite] = useFavoruite(item?.result?.sync_product?.id)
  const [inCart,setInCart] = useInCart(item?.result?.sync_product?.id)
  const [quantity,setQuantity] = useQuantity(item?.result?.sync_product?.id)
  
  const [variantIndex,setVariantIndex] = useState(0)

  const dispatch = useDispatch()
  const shopActions = bindActionCreators(ShopActions,dispatch)
  

  const handleAnimationOut = (e:any) =>{
    if(e){
      e.stopPropagation()
    }
    breadcrumbRef.current.style.right = '-220px'
    if(titleRef.current.classList.contains('--open')){
      titleRef.current.style.opacity = '0'
      favoruitesRef.current.style.transition = 'opacity 1s ease-in-out'
      favoruitesRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!favoruitesRef.current.classList.contains('hidden')){
          favoruitesRef.current.classList.add('hidden')
        }
      }, 1000);
      sizeRef.current.style.transition = 'opacity 1s ease-in-out'
      sizeRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!sizeRef.current.classList.contains('hidden')){
          sizeRef.current.classList.add('hidden')
        }
      }, 1000);
      favoruitesRef.current.style.transition = 'opacity 1s ease-in-out'
      favoruitesRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!favoruitesRef.current.classList.contains('hidden')){
          favoruitesRef.current.classList.add('hidden')
        }
      }, 1000);
      cartRef.current.style.transition = 'opacity 1s ease-in-out'
      cartRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!cartRef.current.classList.contains('hidden')){
          cartRef.current.classList.add('hidden')
        }
      }, 1000);
      infoRef.current.style.transition = 'opacity 1s ease-in-out'
      infoRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!infoRef.current.classList.contains('hidden')){
          infoRef.current.classList.add('hidden')
        }
      }, 1000);
      plusRef.current.style.transition = 'opacity 1s ease-in-out'
      plusRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!plusRef.current.classList.contains('hidden')){
          plusRef.current.classList.add('hidden')
        }
      }, 1000);
      minusRef.current.style.transition = 'opacity 1s ease-in-out'
      minusRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!minusRef.current.classList.contains('hidden')){
          minusRef.current.classList.add('hidden')
        }
      }, 1000);
      setTimeout(() => {
        titleRef.current.classList.remove('--open')
        titleRef.current.classList.add('hidden')
      }, 1000);
    }
  }
  const handleAnimationIn = (e:any) =>{
    if(e){
      e.stopPropagation()
    }
    breadcrumbRef.current.style.right = '0px'
    if(!titleRef.current.classList.contains('--open')){
      favoruitesRef.current.style.transition = 'opacity 0s ease-in-out'
      favoruitesRef.current.style.opacity = '1'
      if(favoruitesRef.current.classList.contains('hidden')){
        favoruitesRef.current.classList.remove('hidden')
      }
      sizeRef.current.style.transition = 'opacity 0s ease-in-out'
      sizeRef.current.style.opacity = '1'
      if(sizeRef.current.classList.contains('hidden')){
        sizeRef.current.classList.remove('hidden')
      }
      cartRef.current.style.transition = 'opacity 0s ease-in-out'
      cartRef.current.style.opacity = '1'
      if(cartRef.current.classList.contains('hidden')){
        cartRef.current.classList.remove('hidden')
      }
      infoRef.current.style.transition = 'opacity 0s ease-in-out'
      infoRef.current.style.opacity = '1'
      if(infoRef.current.classList.contains('hidden')){
        infoRef.current.classList.remove('hidden')
      }
      plusRef.current.style.transition = 'opacity 0s ease-in-out'
      plusRef.current.style.opacity = '1'
      if(plusRef.current.classList.contains('hidden')){
        plusRef.current.classList.remove('hidden')
      }
      minusRef.current.style.transition = 'opacity 0s ease-in-out'
      minusRef.current.style.opacity = '1'
      if(minusRef.current.classList.contains('hidden')){
        minusRef.current.classList.remove('hidden')
      }
      titleRef.current.style.opacity = '1'
      cartRef.current.style.opacity = '1'
      infoRef.current.style.opacity = '1'
      plusRef.current.style.opacity = '1'
      minusRef.current.style.opacity = '1'
      titleRef.current.classList.add('--open')
      titleRef.current.classList.remove('hidden')
    }
    const titleText = new SplitTextJS(titleRef.current) as any
    // @ts-ignore
    gsap.registerPlugin(MotionPathPlugin)
    // @ts-ignore
    titleText.chars.forEach((c:any,index:number)=>{
      gsap.fromTo(c,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: index * 2 * 0.012
          }
        })
      })
      gsap.fromTo(favoruitesRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.80
        }
      })
      gsap.fromTo(sizeRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.75
        }
      })
      gsap.fromTo(cartRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.7
        }
        })
      gsap.fromTo(infoRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.65
        }
      })
      gsap.fromTo(plusRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.6
        }
      })
      gsap.fromTo(minusRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.55
        }
      })
  }

  const handleAnimationInit = () =>{
      titleRef.current.style.opacity = '0'
      favoruitesRef.current.style.transition = 'opacity 1s ease-in-out'
      favoruitesRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!favoruitesRef.current.classList.contains('hidden')){
          favoruitesRef.current.classList.add('hidden')
        }
      }, 1000);
      sizeRef.current.style.transition = 'opacity 1s ease-in-out'
      sizeRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!sizeRef.current.classList.contains('hidden')){
          sizeRef.current.classList.add('hidden')
        }
      }, 1000);
      cartRef.current.style.transition = 'opacity 1s ease-in-out'
      cartRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!cartRef.current.classList.contains('hidden')){
          cartRef.current.classList.add('hidden')
        }
      }, 1000);
      infoRef.current.style.transition = 'opacity 1s ease-in-out'
      infoRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!infoRef.current.classList.contains('hidden')){
          infoRef.current.classList.add('hidden')
        }
      }, 1000);
      plusRef.current.style.transition = 'opacity 1s ease-in-out'
      plusRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!plusRef.current.classList.contains('hidden')){
          plusRef.current.classList.add('hidden')
        }
      }, 1000);
      minusRef.current.style.transition = 'opacity 1s ease-in-out'
      minusRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!minusRef.current.classList.contains('hidden')){
          minusRef.current.classList.add('hidden')
        }
      }, 1000);
  }

  const handleText = () =>{
    gsap.registerPlugin(MotionPathPlugin)
    if(typeof window !== 'undefined'){
      if(typeof document !== 'undefined'){
        titleRef.current.style.transition = 'opacity 0s ease-in-out'
        titleRef.current.style.opacity = '0'
        const title = document.querySelector(`#title-id-${product.id}`)
        setTimeout(() => {
          titleRef.current.style.transition = 'opacity 1s ease-in-out'
          titleRef.current.style.opacity = '1'
          const titleText = new SplitTextJS(title) as any
          // @ts-ignore
          titleText.chars.forEach((c:any,index:number)=>{
            gsap.fromTo(c,{opacity:0},{
              opacity:1,
              stagger:0.2,
              duration:1,
              motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: index * 2 * 0.012
              }
            })
          })
        }, 10);
      }
    }
  }

  const handleSize = () =>{
    const len = item?.result?.sync_variants?.length - 1
    if(variantIndex < len){
      setVariantIndex(variantIndex + 1)
    }else{
      setVariantIndex(0)
    }
  }

  useEffect(()=>{
    handleAnimationInit()
  },[item])

  return (
    <div onMouseLeave={(e)=>handleAnimationOut(e)} ref={productRef} className='product relative top-0 left-0 z-50 cursor-pointer my-10 mx-[50px] h-max relative top-0 left-1/2 -translate-x-[58%] md:left-0 md:-translate-x-0'>
      <svg className='absolute opacity-0 -top-[15%] -left-[9%] md:-left-[12.5%]' width={600} height={600}>
        <path ref={pathRef} d="M0,140a135,135 0 1,0 270,0a135,135 0 1,0 -270,0" fill="none" stroke="black" strokeWidth={2}/>
      </svg>
      <svg className='absolute opacity-0 -top-[15%] -left-[9%] md:-left-[12.5%]' width={600} height={600}>
        <path ref={pathRefIcons} d="M-30,130a150,150 0 1,0 340,0a150,150 0 1,0 -340,0" fill="none" stroke="black" strokeWidth={2}/>
      </svg>
      <h3 ref={titleRef} id={`title-id-${id ? id : product.id}`} className="product-title hidden text-neutral-900 text-4xl font-bold absolute top-0 left-0">{item?.result?.sync_variants[variantIndex]?.name}</h3>
      <div onClick={()=>{
        if(!isFavoruite){
          shopActions.addFavoruite(item.result?.sync_product?.id)
        }else{
          shopActions.removeFavoruite(item.result?.sync_product?.id)
        }
        }} ref={favoruitesRef} className="product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        {isFavoruite 
         ? <Image src="/assets/heart-solid.svg" alt="icon-cart" width={25} height={25} />
         : <Image src="/assets/heart-circle-plus-solid.svg" alt="icon-cart" width={25} height={25} />}
      </div>
      <div onClick={()=>{
        handleSize()
        handleText()
        }} ref={sizeRef} className="product-icon-wrapper absolute top-0 left-0 hover:bg-gray-400 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
          <Image src="/assets/size.svg" alt="icon-info" width={25} height={25} />
        </div>
      <div onClick={()=>{
        if(!inCart){
          shopActions.addToCart(item?.result?.sync_product?.id,item?.result?.sync_variants[variantIndex]?.id,item?.result?.sync_variants[variantIndex]?.variant_id,item?.result?.sync_variants[variantIndex]?.warehouse_product_variant_id,item?.result?.sync_variants[variantIndex]?.external_id,1,item?.result?.sync_variants[variantIndex]?.retail_price,item?.result?.sync_variants[variantIndex]?.currency)
          // @ts-ignore
          setQuantity(1)
        }
      }} ref={cartRef} className="product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/cart-icon.png" alt="icon-cart" width={25} height={25} />
      </div>
      <Link ref={infoRef} className='absolute top-0 left-0 w-10 h-10' href="/details/[id]" as={`/details/${id ? id : product.id}`}>
        <div className="product-icon-wrapper hover:bg-gray-400 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
          <Image src="/assets/info-icon.png" alt="icon-info" width={25} height={25} />
        </div>
      </Link>
      <div onClick={()=>{
        if(!inCart){
          shopActions.addToCart(item?.result?.sync_product?.id,item?.result?.sync_variants[variantIndex]?.id,item?.result?.sync_variants[variantIndex]?.variant_id,item?.result?.sync_variants[variantIndex]?.warehouse_product_variant_id,item?.result?.sync_variants[variantIndex]?.external_id,1,item?.result?.sync_variants[variantIndex]?.retail_price,item?.result?.sync_variants[variantIndex]?.currency)
          // @ts-ignore
          setQuantity(1)
        }else{
          shopActions.increment(item?.result?.sync_product?.id,1)
          // @ts-ignore
          setQuantity(quantity as number + 1)
        }
      }} ref={plusRef} className="product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/plus-icon.png" alt="icon-plus" width={25} height={25} />
      </div>
      <div onClick={()=>{
        if(inCart && quantity as number < 1){
          shopActions.removeFromCart(item?.result?.sync_product?.id)
          // @ts-ignore
          setQuantity(0)
        }else if(inCart && quantity as number >= 1){
          shopActions.decrement(item?.result?.sync_product?.id,1)
          // @ts-ignore
          setQuantity(quantity as number - 1)
        }
      }} ref={minusRef} className="product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/minus-icon.png" alt="icon-minus" width={25} height={25} />
      </div>
      <div onMouseEnter={(e)=>handleAnimationIn(e)} className='product-image z-50 relative top-0 left-0 bg-gray-300 rounded-full w-[220px] h-[220px] overflow-hidden'>
        <div ref={breadcrumbRef} className="product-breadcrumb pointer-events-none absolute z-50 top-1/2 -translate-y-1/2 -right-56 w-[220px] px-8 py-3 bg-green-300 text-white font-bold rounded-l-md">
          <p className="text-center">{item?.result?.sync_variants[variantIndex]?.retail_price}{item?.result?.sync_variants[variantIndex]?.currency}</p>
          <p className="text-center"><span className='italic'>{variant?.result?.variant?.in_stock ? 'In Stock' : 'Out Of Stock'}</span> / <span className="italic">In Cart {quantity as number}</span></p> 
        </div>
        <Image className='rounded-full relative top-0 left-0 z-20' src={item?.result?.sync_product?.thumbnail_url} alt='product-image' width={500} height={500} />
      </div>
    </div>
  )
}

export default Product
