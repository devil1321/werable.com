'use client'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
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

  const titleRef = useRef() as MutableRefObject<HTMLHeadingElement>
  const pathRef = useRef() as MutableRefObject<SVGPathElement>
  const pathRefIcons = useRef() as MutableRefObject<SVGPathElement>
  const favoruitesRef = useRef() as MutableRefObject<HTMLDivElement>
  const infoRef = useRef() as MutableRefObject<HTMLAnchorElement>
  const breadcrumbRef = useRef() as MutableRefObject<HTMLDivElement>
  
  const [imgSrc,setImgSrc] = useState<string>('')
  const [isFavoruite,setIsFavoruite] = useFavoruite(product?.id)
  const [inCart,setInCart] = useInCart(product?.id)
  
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
      if(infoRef.current){
        infoRef.current.style.transition = 'opacity 1s ease-in-out'
        infoRef.current.style.opacity = '0'
        setTimeout(() => {
          if(!infoRef?.current?.classList?.contains('hidden')){
            infoRef.current.classList.add('hidden')
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
      
      infoRef.current.style.transition = 'opacity 0s ease-in-out'
      infoRef.current.style.opacity = '1'
      if(infoRef.current.classList.contains('hidden')){
        infoRef.current.classList.remove('hidden')
      }
      titleRef.current.style.opacity = '1'
      infoRef.current.style.opacity = '1'
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
          start:0,
          end:0.60
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
          end:0.65
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
    if(infoRef.current){

      infoRef.current.style.transition = 'opacity 1s ease-in-out'
      infoRef.current.style.opacity = '0'
      setTimeout(() => {
        if(!infoRef?.current?.classList?.contains('hidden')){
          infoRef?.current?.classList?.add('hidden')
        }
      }, 1000);
    }
  }


  useEffect(()=>{
    setImgSrc(product?.thumbnail_url)
  },[product])

  useEffect(()=>{
    handleAnimationInit()
  },[product])

  return (
    <React.Fragment>
    {product  
    ? <div onMouseLeave={(e)=>handleAnimationOut(e)} ref={productRef} className='product cursor-pointer my-12 mx-[50px] h-max relative top-0 left-0 z-40 '>
      <svg className='absolute opacity-0 -top-[15%] -left-[10%] md:-left-[12.5%]' width={600} height={600}>
        <path ref={pathRef} d="M0,140a135,135 0 1,0 270,0a135,135 0 1,0 -270,0" fill="none" stroke="black" strokeWidth={2}/>
      </svg>
      <svg className='absolute opacity-0 -top-[15%] -left-[10%] md:-left-[12.5%]' width={600} height={600}>
        <path ref={pathRefIcons} d="M-30,130a150,150 0 1,0 340,0a150,150 0 1,0 -340,0" fill="none" stroke="black" strokeWidth={2}/>
      </svg>
        {/* @ts-ignore */}
      <h3 ref={titleRef} id={`title-id-${id ? id : product?.id}`} className="product-title hidden text-neutral-900 text-xl font-bold absolute top-0 left-0">{product?.name}</h3>
      <div onClick={()=>{
        if(!isFavoruite){
          if(user){
            shopActions.addFavoruite(product?.id,0)
          }else{
            router.push('/login')
          }
        }else{
          if(user){
            shopActions.removeFavoruite(product?.id)
          }else{
            router.push('/login')
          }
        }
        }} ref={favoruitesRef} className="product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
        {isFavoruite 
         ? <Image src="/assets/heart-solid.svg" alt="icon-cart" width={25} height={25} />
         : <Image src="/assets/heart-circle-plus-solid.svg" alt="icon-cart" width={25} height={25} />}
      </div>
      <Link ref={infoRef} className='absolute top-0 left-0 w-10 h-10 z-50' href="/details/[id]" as={`/details/${id ? id : product?.id}`}>
        <div className="product-icon-wrapper hover:bg-gray-400 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center">
          <Image src="/assets/info-icon.png" alt="icon-info" width={25} height={25} />
        </div>
      </Link> 
      <div onMouseEnter={(e)=>handleAnimationIn(e)} className='product-image z-50 relative top-0 left-0 bg-gray-300 rounded-full w-[220px] h-[220px] overflow-hidden'>
        {product  
        ? <div ref={breadcrumbRef} className="product-breadcrumb pointer-events-none absolute z-50 top-1/2 -translate-y-1/2 -right-56 w-[220px] px-8 py-3 bg-green-300 text-white font-bold rounded-l-md">
            <p className="text-center"><span className="italic">{inCart ? 'In Cart' : "Out Of Cart"}</span></p> 
            <p className="text-center"><span className="italic">Variants | {product?.variants}</span></p> 
          </div>
        : <div ref={breadcrumbRef} className="product-breadcrumb pointer-events-none absolute z-50 top-1/2 -translate-y-1/2 -right-56 w-[220px] px-8 py-3 bg-green-300 text-white font-bold rounded-l-md">
            <p className="text-center">...Loading</p>
          </div>}
        {product && <Image className='rounded-full relative top-0 left-0 z-20' src={imgSrc} alt='product-image' width={500} height={500} />}
      </div>
    </div>
    : <h1 className='bg-green-300 w-[20%] rounded-md mx-6 font-bold text-white text-2xl px-3 py-2 my-2'>...Loading</h1>
    }</React.Fragment>
  )
}

export default Product
