import React, { useEffect, useState } from 'react'
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

const Item:React.FC<{ product?:any, id?:number }> = ({product,id}) => {

  const dispatch = useDispatch()
  const shopActions = bindActionCreators(ShopActions,dispatch)

  const [variantIndex,setVariantIndex] = useState<number>(0)

  const [item,setItem] = useSyncProduct(id ? id : product.id)
  const [variant,setVariant] = useVariant(id ? id : product.id)
  const [isFavoruite,setIsFavoruite] = useFavoruite(item?.result?.sync_product?.id)
  const [inCart,setInCart] = useInCart(item?.result?.sync_product?.id)
  const [quantity,setQuantity] = useQuantity(item?.result?.sync_product?.id)

  const handleSize = () =>{
    if(variantIndex < item?.result?.sync_variants?.length - 1){
      setVariantIndex(variantIndex + 1)
    }else{
      setVariantIndex(0)
    }
  }

  return (
    <div className="item p-2 my-5 md:flex justify-center items-center">
      {item?.result?.sync_variants[variantIndex]?.retail_price && <Product product={product} id={id} />}
      {item?.result?.sync_variants[variantIndex]?.retail_price &&
      <div className="item-details w-[100%] xl:w-[50%] md:w-[70%] rounded-md md:ml-12 py-3 px-2 md:px-12">
        <div className="item-controls flex gap-3 items-center flex-wrap md:flex-nowrap">
          <button className='px-8 py-2 font-bold text-white min-w-fit rounded-md' onClick={()=>{
            if(!inCart){
              shopActions.addToCart(item?.result?.sync_product?.id,item?.result?.sync_variants[variantIndex]?.id,item?.result?.sync_variants[variantIndex]?.variant_id,item?.result?.sync_variants[variantIndex]?.warehouse_product_variant_id,item?.result?.sync_variants[variantIndex]?.external_id,1,item?.result?.sync_variants[variantIndex]?.retail_price,item?.result?.sync_variants[variantIndex]?.currency)
            }
          }}>{inCart ? 'In Cart' : 'Add To Cart'}</button>
          <button className='px-8 py-2 font-bold text-white rounded-md'>{item?.result?.sync_variants[variantIndex]?.retail_price}{item?.result?.sync_variants[variantIndex]?.currency}</button>
          <button className='px-8 py-2 font-bold text-white rounded-md' onClick={()=>handleSize()}>Size</button>
          <div className="item-quantity flex items-center">
            <button className='px-5 py-2 font-bold text-center text-white rounded-l-md' onClick={()=>{
              // @ts-ignore
              setQuantity(quantity as number - 1)
              if(quantity as number < 1){
                shopActions.removeFromCart(item?.result?.sync_product?.id)
              }
              shopActions.decrement(item?.result?.sync_product?.id,1)
            }}>-</button>
            <button className='px-5 py-2 font-bold text-center text-white'>{quantity as number}</button>
            <button className='px-5 py-2 font-bold text-center text-white rounded-r-md' onClick={()=>{
              // @ts-ignore
              setQuantity(quantity as number + 1)
              shopActions.increment(item?.result?.sync_product?.id,1)
              if(!inCart){
                shopActions.addToCart(item?.result?.sync_product?.id,item?.result?.sync_variants[variantIndex]?.id,item?.result?.sync_variants[variantIndex]?.variant_id,item?.result?.sync_variants[variantIndex]?.warehouse_product_variant_id,item?.result?.sync_variants[variantIndex]?.external_id,1,item?.result?.sync_variants[variantIndex]?.retail_price,item?.result?.sync_variants[variantIndex]?.currency)
              }
            }}>+</button>
          </div>
          <button className='item-favoruite px-2 py-[7px] rounded-md'>
              {!isFavoruite 
               ? <Image onClick={()=>shopActions.addFavoruite(item?.result?.sync_product?.id)}  src="/assets/heart-circle-plus-solid.svg"  alt='icon-favoruites' width={30} height={30}/>  
               : <Image onClick={()=>shopActions.removeFavoruite(item?.result?.sync_product?.id)} src="/assets/heart-solid.svg"  alt='icon-favoruites' width={26} height={26}/>}
            </button>
        </div>
        <h2 className="font-bold my-5 text-3xl md:5xl w-max">{item?.result?.sync_variants[variantIndex]?.name}</h2>
        <p className="text-sm">{variant?.result?.product?.description}</p>
        <button onClick={()=>shopActions.removeFromCart(item?.result?.sync_product?.id)} className='block my-2 hover:opacity-70 w-[100%] py-2 rounded-full text-white font-bold text-2xl'>Remove</button>
      </div>}
    </div>
  )
}

export default Item
