import React, { useEffect } from 'react'
import Image from 'next/image'
import useSyncProduct from '@/app/hooks/useSyncProduct'
import useVariantIndex from '@/app/hooks/useVariantIndex'
import useCategory from '@/app/hooks/useCategory'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const Item:React.FC<{ product:any }> = ({product}) => {

  const [item,setItem] = useSyncProduct(product.id)
  const [variantIndex,setVariantIndex] = useVariantIndex(product.id)
  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  // @ts-ignore 
  const [category,setCategory] = useCategory(item?.result?.sync_variants[variantIndex]?.main_category_id)

  const handleVariant = () =>{
    const len = item?.result?.sync_variants?.length
    // @ts-ignore
    if(variantIndex < len - 1){
        // @ts-ignore
        setVariantIndex(variantIndex + 1)
    }else{
        // @ts-ignore
        setVariantIndex(0)
    }
  }

  useEffect(()=>{
    console.log(item)
  },[item])

  return (
    <div className='admin-product flex flex-wrap justify-flex-start items-center p-2 bg-neutral-900 text-white rounded-md w-[100%] my-2 hover:bg-neutral-700 transition-all cursor-pointer'>
        <Image className='block mx-auto md:mx-0 rounded-md' src={item?.result?.sync_product?.thumbnail_url} alt='product-image' width={50} height={50} />
        {/* @ts-ignore */}
         {item?.result?.sync_variants[variantIndex]?.name && <h3 className="font-bold w-[100%] md:w-max my-2 md:my-0 mx-2 px-3 py-2 text-white bg-blue-300 rounded-md">{item?.result?.sync_variants[variantIndex]?.name}</h3>}
        {/* @ts-ignore */}
         {item?.result?.sync_variants[variantIndex]?.retail_price && <h3 className="font-bold w-[100%] md:w-max my-2 md:my-0 mx-2 px-3 py-2 text-white bg-green-300 rounded-md">{item?.result?.sync_variants[variantIndex]?.retail_price}{item?.result?.sync_variants[variantIndex]?.currency}</h3>}
         {category && <h3 className="flex items-center font-bold mx-2 px-3 py-2 my-2 md:my-0 w-[100%] md:w-max text-white bg-orange-300 rounded-md"><Image className='mr-2' src={category.image_url} alt='category-image' width={25} height={25} />{category.title}</h3>}
         {/* <h3 className="font-bold mx-2 px-3 py-2 text-white bg-neutral-800 rounded-md">{user.phone}</h3> */}
         <button onClick={()=>handleVariant()} className="block font-bold xl:ml-auto mt-2 xl:mt-0 mb-2 xl:mb-0 mx-2 w-[100%] xl:w-max px-3 py-2 text-white hover:opacity-70 transition-all rounded-md">Change Variant</button>
         <button onClick={()=>APIActions.printfulDeleteSyncProduct(item?.result?.sync_product?.id)} className="block font-bold px-3 py-2 mx-2 text-white hover:opacity-70 w-[100%] xl:w-max transition-all rounded-md">Remove</button>
    </div>
  )
}

export default Item
