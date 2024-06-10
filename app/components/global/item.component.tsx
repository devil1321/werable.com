import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import Product from './product.component'
import useVariant from '@/app/hooks/useVariant'
import useInCart from '@/app/hooks/useInCart'
import useFavoruite from '@/app/hooks/useFavoruite'
import useSyncProduct from '@/app/hooks/useSyncProduct'
import useQuantity from '@/app/hooks/useQuantity'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import Image from 'next/image'
import useVariantIndex from '@/app/hooks/useVariantIndex'
import useTemplate from '@/app/hooks/useTemplate'
import gsap from 'gsap'

const Item:React.FC<{ product?:any, id?:number }> = ({product,id}) => {

  const dispatch = useDispatch()
  const shopActions = bindActionCreators(ShopActions,dispatch)

  
  const [item,setItem] = useSyncProduct(id ? id : product?.id)
  const [variant,setVariant] = useVariant(id ? id : product?.id)
  const [isFavoruite,setIsFavoruite] = useFavoruite(item?.result?.sync_product?.id)
  const [variantIndex,setVariantIndex] = useVariantIndex(item?.result?.sync_product?.id) 
  const [inCart,setInCart] = useInCart(item?.result?.sync_product?.id)
  const [quantity,setQuantity] = useQuantity(item?.result?.sync_product?.id)
  const [template,setTemplate] = useTemplate(item?.result?.sync_product?.id,0,100)

  const [size,setSize] = useState<any>(null)
  const [color,setColor] = useState<any>(null)

  const sizesMenuRef = useRef() as MutableRefObject<HTMLButtonElement>
  const colorsMenuRef = useRef() as MutableRefObject<HTMLButtonElement>

  const handleItem = (size:string,color:string) =>{
    if(size && color){
      const variants = item?.result.sync_variants.filter((v:any) => v?.size?.toLowerCase() === size.toLowerCase())
      const variant = variants.find((v:any) => v?.color?.toLowerCase() === color.toLowerCase())
      const index = item?.result.sync_variants.indexOf(variant)
      // @ts-ignore
      setVariantIndex(index)
    }
  }

  const handleMenu = (ref:MutableRefObject<HTMLButtonElement>) =>{
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

  const handleInitMenus = () =>{
    if(sizesMenuRef.current){
      sizesMenuRef.current.style.display = 'none'
    }
    if(colorsMenuRef.current){
      colorsMenuRef.current.style.display = 'none'
    }
  }

  useEffect(()=>{
    setSize(template?.sizes[0])
    setColor(template?.colors[0])
    handleInitMenus()
  },[template,sizesMenuRef.current,colorsMenuRef.current])

  useEffect(()=>{
    handleItem(size,color?.color_name)
  },[size,color])

  return (
    <React.Fragment>
      {item?.result?.sync_variants?.length > 0 && variant 
    ?<div className="item p-2 my-5 md:flex justify-center items-center">
      {item?.result?.sync_variants[variantIndex as number]?.retail_price && <Product product={product} id={id} />}
      {item?.result?.sync_variants[variantIndex as number]?.retail_price &&
      <div className="item-details relative top-0 left-0 z-50 w-[100%] xl:w-[50%] md:w-[70%] rounded-md md:ml-12 py-3 px-2 md:px-12">
        <div className="item-controls flex gap-3 items-center flex-wrap md:flex-nowrap">
          <button className='px-8 py-2 font-bold text-white min-w-fit rounded-md' onClick={()=>{
            if(!inCart){
              shopActions.addToCart(item?.result?.sync_product?.id,item?.result?.sync_variants[variantIndex as number]?.id,item?.result?.sync_variants[variantIndex as number]?.variant_id,item?.result?.sync_variants[variantIndex as number]?.warehouse_product_variant_id,item?.result?.sync_variants[variantIndex as number]?.external_id,1,item?.result?.sync_variants[variantIndex as number]?.retail_price,item?.result?.sync_variants[variantIndex as number]?.currency,variantIndex as number)
            }
          }}>{inCart ? 'In Cart' : 'Add To Cart'}</button>
          <button className='px-5 py-2 font-bold text-white rounded-md'>{item?.result?.sync_variants[variantIndex as number]?.retail_price}{item?.result?.sync_variants[variantIndex as number]?.currency}</button>
          <div onClick={()=>handleMenu(sizesMenuRef)} className="relative top-0 left-0">
            <button className='px-5 py-2 font-bold text-white rounded-md'>{size}</button>
            <button ref={sizesMenuRef} className="details-sizes-menu absolute top-12 left-1/2 -translate-x-1/2 w-[70px] p-3 rounded-lg bg-white shadow-lg shadow-gray-300 font-bold">
              {template?.sizes?.map((s:string) => <p onClick={()=>{
                setSize(s)
              }} className='p-2 cursor-pointer hover:bg-green-300 rounded-lg hover:text-white'>{s}</p>)}
            </button>
          </div>
          <div className="relative top-0 left-0" onClick={()=>handleMenu(colorsMenuRef)}>
            <button className='px-5 py-2 font-bold text-white rounded-md'>{color?.color_name as string}</button>
            <button ref={colorsMenuRef} className="details-color-menu absolute top-12 left-1/2 -translate-x-1/2 w-[105px] font-bold p-3 rounded-lg bg-white shadow-lg shadow-gray-300">
              {template?.colors?.map((c:any) => <p onClick={()=>{
                setColor(c)
              }} className={`p-2 cursor-pointer italic hover:bg-green-300 rounded-lg hover:text-white`}>{c?.color_name}</p>)}
            </button>
          </div>
          <div className="item-quantity flex items-center">
            <button className='px-4 py-2 font-bold text-center text-white rounded-l-md' onClick={()=>{
              // @ts-ignore
              setQuantity(quantity as number - 1)
              if(quantity as number < 1){
                shopActions.removeFromCart(item?.result?.sync_product?.id)
              }
              shopActions.decrement(item?.result?.sync_product?.id,1)
              shopActions.summary()
            }}>-</button>
            <button className='px-4 py-2 font-bold text-center text-white'>{quantity as number}</button>
            <button className='px-3.5 py-2 font-bold text-center text-white rounded-r-md' onClick={()=>{
              // @ts-ignore
              setQuantity(quantity as number + 1)
              shopActions.increment(item?.result?.sync_product?.id,1)
              if(!inCart){
                shopActions.addToCart(item?.result?.sync_product?.id,item?.result?.sync_variants[variantIndex as number]?.id,item?.result?.sync_variants[variantIndex as number]?.variant_id,item?.result?.sync_variants[variantIndex as number]?.warehouse_product_variant_id,item?.result?.sync_variants[variantIndex as number]?.external_id,1,item?.result?.sync_variants[variantIndex as number]?.retail_price,item?.result?.sync_variants[variantIndex as number]?.currency,variantIndex as number)
              }
              shopActions.summary()
            }}>+</button>
          </div>
          <button className='item-favoruite px-2 py-[7px] rounded-md'>
              {!isFavoruite 
               ? <Image onClick={()=>shopActions.addFavoruite(item?.result?.sync_product?.id,variantIndex as number)}  src="/assets/heart-circle-plus-solid.svg"  alt='icon-favoruites' width={30} height={30}/>  
               : <Image onClick={()=>shopActions.removeFavoruite(item?.result?.sync_product?.id)} src="/assets/heart-solid.svg"  alt='icon-favoruites' width={26} height={26}/>}
            </button>
        </div>
        <h2 className="font-bold my-5 text-3xl md:5xl w-max">{item?.result?.sync_variants[variantIndex as number]?.name}</h2>
        <p className="text-sm">{variant?.result?.product?.description}</p>
        <button onClick={()=>shopActions.removeFromCart(item?.result?.sync_product?.id)} className='block my-2 hover:opacity-70 w-[100%] py-2 rounded-full text-white font-bold text-2xl'>Remove</button>
      </div>}
    </div>
    : <h1 className='bg-green-300 w-[90%] rounded-md mx-auto font-bold text-white text-5xl px-12 py-2 my-2'>...Loading</h1>
    }</React.Fragment>
  )
}

export default Item
