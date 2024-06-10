'use client'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import  MotionPathPlugin  from 'gsap/dist/MotionPathPlugin'
import SplitTextJS from 'split-text-js'
import useVariant from '@/app/hooks/useVariant'
import Link from 'next/link'
import * as ShopActions  from '@/app/controller/action-creators/shop.action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import useFavoruite from '@/app/hooks/useFavoruite'
import useInCart from '@/app/hooks/useInCart'
import useQuantity from '@/app/hooks/useQuantity'
import useVariantIndex from '@/app/hooks/useVariantIndex'
import useProduct from '@/app/hooks/useProduct'
import { State } from '@/app/controller/reducers/root.reducer'
import { useRouter } from 'next/navigation'

const Product:React.FC<{ product?:any, id?:number; productRef?:MutableRefObject<HTMLDivElement> }> = ({product,id,productRef}) => {

 
  const { user } = useSelector((state:State) => state.api)
  const { sync_product,sync_variants } = useProduct(product)

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
  
  const [variant,setVariant] = useVariant(id ? id : sync_product?.id)
  const [isFavoruite,setIsFavoruite] = useFavoruite(sync_product?.id)
  const [variantIndex,setVariantIndex] = useVariantIndex(sync_product?.id) 
  const [inCart,setInCart] = useInCart(sync_product?.id)
  const [quantity,setQuantity] = useQuantity(sync_product?.id)
  
  const dispatch = useDispatch()
  const shopActions = bindActionCreators(ShopActions,dispatch)

  const router = useRouter()
  

  const handleAnimationOut = (e:any) =>{
    if(e){
      e.stopPropagation()
    }
    breadcrumbRef.current.style.right = '-220px'
    if(titleRef?.current?.classList.contains('--open')){
      if(titleRef.current){
        titleRef.current.style.opacity = '0'
        setTimeout(() => {
          titleRef?.current?.classList.remove('--open')
          titleRef?.current?.classList.add('hidden')
        }, 1000);
      }
      if(favoruitesRef?.current){
        favoruitesRef.current.style.transition = 'opacity 1s ease-in-out'
        favoruitesRef.current.style.opacity = '0'
        setTimeout(() => {
          if(!favoruitesRef?.current?.classList?.contains('hidden')){
            favoruitesRef.current.classList.add('hidden')
          }
        }, 1000);
      }
      if(sizeRef.current){
        sizeRef.current.style.transition = 'opacity 1s ease-in-out'
        sizeRef.current.style.opacity = '0'
        setTimeout(() => {
          if(!sizeRef.current.classList.contains('hidden')){
            sizeRef.current.classList.add('hidden')
          }
        }, 1000);
      }
      if(cartRef.current){
        cartRef.current.style.transition = 'opacity 1s ease-in-out'
        cartRef.current.style.opacity = '0'
        setTimeout(() => {
          if(!cartRef.current.classList.contains('hidden')){
            cartRef.current.classList.add('hidden')
          }
        }, 1000);
      }
      if(infoRef.current){
        infoRef.current.style.transition = 'opacity 1s ease-in-out'
        infoRef.current.style.opacity = '0'
        setTimeout(() => {
          if(!infoRef.current.classList.contains('hidden')){
            infoRef.current.classList.add('hidden')
          }
        }, 1000);
      }
      if(plusRef.current){
        plusRef.current.style.transition = 'opacity 1s ease-in-out'
        plusRef.current.style.opacity = '0'
        setTimeout(() => {
          if(!plusRef.current.classList.contains('hidden')){
            plusRef.current.classList.add('hidden')
          }
        }, 1000);
      }
      if(minusRef.current){
        minusRef.current.style.transition = 'opacity 1s ease-in-out'
        minusRef.current.style.opacity = '0'
        setTimeout(() => {
          if(!minusRef.current.classList.contains('hidden')){
            minusRef.current.classList.add('hidden')
          }
        }, 1000);
      }
        
    }
  }
  const handleAnimationIn = (e?:any) =>{
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
        force3D:true,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: index * 0.012
          }
        })
      })
      gsap.fromTo(favoruitesRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        force3D:true,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.95
        }
      })
      gsap.fromTo(sizeRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        force3D:true,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.90
        }
      })
      gsap.fromTo(cartRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        force3D:true,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.85
        }
        })
      gsap.fromTo(infoRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        force3D:true,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.80
        }
      })
      gsap.fromTo(plusRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        force3D:true,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.75
        }
      })
      gsap.fromTo(minusRef.current,{opacity:0},{
        opacity:1,
        stagger:0.2,
        duration:1,
        force3D:true,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end:0.70
        }
      })
  }

  const handleAnimationInit = () =>{
    if(titleRef.current){
      titleRef.current.style.opacity = '0'
    }
    if(favoruitesRef.current){
      favoruitesRef.current.style.transition = 'opacity 1s ease-in-out'
      favoruitesRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!favoruitesRef?.current?.classList?.contains('hidden')){
          favoruitesRef?.current?.classList?.add('hidden')
        }
      }, 1000);
    }
    if(sizeRef.current){

      sizeRef.current.style.transition = 'opacity 1s ease-in-out'
      sizeRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!sizeRef?.current?.classList?.contains('hidden')){
          sizeRef?.current?.classList?.add('hidden')
        }
      }, 1000);
    }
    if(cartRef.current){

      cartRef.current.style.transition = 'opacity 1s ease-in-out'
      cartRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!cartRef?.current?.classList?.contains('hidden')){
          cartRef?.current?.classList?.add('hidden')
        }
      }, 1000);
    }
    if(infoRef.current){

      infoRef.current.style.transition = 'opacity 1s ease-in-out'
      infoRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!infoRef?.current?.classList?.contains('hidden')){
          infoRef?.current?.classList?.add('hidden')
        }
      }, 1000);
    }
    if(plusRef.current){

      plusRef.current.style.transition = 'opacity 1s ease-in-out'
      plusRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!plusRef?.current?.classList?.contains('hidden')){
          plusRef?.current?.classList?.add('hidden')
        }
      }, 1000);
    }
    if(minusRef.current){

      minusRef.current.style.transition = 'opacity 1s ease-in-out'
      minusRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!minusRef?.current?.classList?.contains('hidden')){
          minusRef?.current?.classList?.add('hidden')
        }
      }, 1000);
    }
  }

  const handleText = () =>{
    gsap.registerPlugin(MotionPathPlugin)
    if(typeof window !== 'undefined'){
      if(typeof document !== 'undefined'){
        titleRef.current.style.transition = 'opacity 0s ease-in-out'
        titleRef.current.style.opacity = '0'
        const title = document.querySelector(`#title-id-${sync_product.id}`)
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
                end: index * 0.012
              }
            })
          })
        }, 10);
      }
    }
  }

  const handleSize = () =>{
    const len = sync_variants?.length - 1
    if(variantIndex as number < len){
      // @ts-ignore
      setVariantIndex(variantIndex + 1)
    }else{
      // @ts-ignore
      setVariantIndex(0)
    }
  }

  useEffect(()=>{
    handleAnimationInit()
  },[sync_product,sync_variants])

  return (
    <React.Fragment>
    {sync_product && sync_variants?.length > 0 
    ? <div onMouseLeave={(e)=>handleAnimationOut(e)} ref={productRef} className='product cursor-pointer my-12 mx-[50px] h-max relative top-0 left-0 z-40 '>
      <svg className='absolute opacity-0 -top-[15%] -left-[10%] md:-left-[12.5%]' width={600} height={600}>
        <path ref={pathRef} d="M0,140a135,135 0 1,0 270,0a135,135 0 1,0 -270,0" fill="none" stroke="black" strokeWidth={2}/>
      </svg>
      <svg className='absolute opacity-0 -top-[15%] -left-[10%] md:-left-[12.5%]' width={600} height={600}>
        <path ref={pathRefIcons} d="M-30,130a150,150 0 1,0 340,0a150,150 0 1,0 -340,0" fill="none" stroke="black" strokeWidth={2}/>
      </svg>
        {/* @ts-ignore */}
      <h3 ref={titleRef} id={`title-id-${id ? id : sync_product?.id}`} className="product-title hidden text-neutral-900 text-xl font-bold absolute top-0 left-0">{sync_variants[variantIndex]?.name}</h3>
      <div onClick={()=>{
        if(!isFavoruite){
          if(user){
            shopActions.addFavoruite(sync_product?.id,variantIndex as number)
          }else{
            router.push('/login')
          }
        }else{
          if(user){
            shopActions.removeFavoruite(sync_product?.id)
          }else{
            router.push('/login')
          }
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
          if(user){
            shopActions.addToCart(sync_product?.id,sync_variants[variantIndex as number]?.id,sync_variants[variantIndex as number]?.variant_id,sync_variants[variantIndex as number]?.warehouse_product_variant_id,sync_variants[variantIndex as number]?.external_id,1,sync_variants[variantIndex as number]?.retail_price,sync_variants[variantIndex as number]?.currency,variantIndex as number)
            // @ts-ignore
            setQuantity(1)
          }else{
            router.push('/login')
          }
        }
      }} ref={cartRef} className="product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/cart-icon.png" alt="icon-cart" width={25} height={25} />
      </div>
      <Link ref={infoRef} className='absolute top-0 left-0 w-10 h-10' href="/details/[id]" as={`/details/${id ? id : sync_product?.id}`}>
        <div className="product-icon-wrapper hover:bg-gray-400 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
          <Image src="/assets/info-icon.png" alt="icon-info" width={25} height={25} />
        </div>
      </Link>
      <div onClick={()=>{
        if(!inCart){
          if(user){
            shopActions.addToCart(sync_product?.id,sync_variants[variantIndex as number]?.id,sync_variants[variantIndex as number]?.variant_id,sync_variants[variantIndex as number]?.warehouse_product_variant_id,sync_variants[variantIndex as number]?.external_id,1,sync_variants[variantIndex as number]?.retail_price,sync_variants[variantIndex as number]?.currency,variantIndex as number)
          // @ts-ignore
            setQuantity(1)
          } else{
            router.push('/login')
          }
        }else{
          if(user){

            shopActions.summary()
            shopActions.increment(sync_product?.id,1)
            // @ts-ignore
            setQuantity(quantity as number + 1)
          }else{
            router.push('/login')
          }
        }
      }} ref={plusRef} className="product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/plus-icon.png" alt="icon-plus" width={25} height={25} />
      </div>
      <div onClick={()=>{
        if(inCart && quantity as number < 1){
          if(user){
            shopActions.removeFromCart(sync_product?.id)
            // @ts-ignore
            setQuantity(0)
          }else{
            router.push('/login')
          }
        }else if(inCart && quantity as number >= 1){
          if(user){
            shopActions.summary()
            shopActions.decrement(sync_product?.id,1)
            // @ts-ignore
            setQuantity(quantity as number - 1)
          }else{
            router.push('/login')
          }
        }
      }} ref={minusRef} className="product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        <Image src="/assets/minus-icon.png" alt="icon-minus" width={25} height={25} />
      </div>
      <div onMouseEnter={(e)=>handleAnimationIn(e)} className='product-image z-50 relative top-0 left-0 bg-gray-300 rounded-full w-[220px] h-[220px] overflow-hidden'>
        <div ref={breadcrumbRef} className="product-breadcrumb pointer-events-none absolute z-50 top-1/2 -translate-y-1/2 -right-56 w-[220px] px-8 py-3 bg-green-300 text-white font-bold rounded-l-md">
          <p className="text-center">{sync_variants[variantIndex as number]?.retail_price}{sync_variants[variantIndex as number]?.currency}</p>
          <p className="text-center"><span className='italic'>{variant?.result?.variant?.in_stock ? 'In Stock' : 'Out Of Stock'}</span> / <span className="italic">In Cart {quantity as number}</span></p> 
        </div>
        {sync_product?.thumbnail_url && <Image className='rounded-full relative top-0 left-0 z-20' src={sync_product?.thumbnail_url} alt='product-image' width={500} height={500} />}
      </div>
    </div>
    : <h1 className='bg-green-300 w-[25%] rounded-md mx-auto font-bold text-white text-5xl px-3 py-2 my-2'>...Loading</h1>
    }</React.Fragment>
  )
}

export default Product
