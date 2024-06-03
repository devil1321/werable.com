import React, { useEffect, useState } from 'react'
import useSyncProduct from '@/app/hooks/useSyncProduct'
import useVariantIndex from '@/app/hooks/useVariantIndex'
import useQuantity from '@/app/hooks/useQuantity'

const CheckoutItem:React.FC<{ product?:any, id?:number }> = ({product,id}) => {  
  const [item,setItem] = useSyncProduct(id ? id : product.id)
  const [variantIndex,setVariantIndex] = useVariantIndex(item?.result?.sync_product?.id) 
  const [quantity,setQuantity] = useQuantity(item?.result?.sync_product?.id)

  return (
    <div className="item p-2 my-5 md:flex justify-start items-center gap-5">
      {/* @ts-ignore */}
      <p className='text-lg font-bold italic bg-green-300 text-white px-6 py-2 rounded-md'>{item?.result?.sync_variants[variantIndex]?.name}</p>
      <p className='text-lg font-bold italic bg-green-300 text-white px-6 py-2 rounded-md'>Quantity {quantity as number}</p>
      {/* @ts-ignore */}
      <p className='text-lg font-bold italic bg-green-300 text-white px-6 py-2 rounded-md'>{item?.result?.sync_variants[variantIndex]?.retail_price * quantity}{item?.result?.sync_variants[variantIndex as number]?.currency}</p>
    </div>
  )
}

export default CheckoutItem
