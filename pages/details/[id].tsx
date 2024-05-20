import * as APIController from '@/app/APIController/printful'
import Image from 'next/image'
import Title from '@/app/components/global/title.component'
import ProductCarousel from '@/app/components/home/product-carousel'
import Layout from '../layout'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import useTemplate from '@/app/hooks/useTemplate'
import useCategory from '@/app/hooks/useCategory'
import useVariant from '@/app/hooks/useVariant'
import useInCart from '@/app/hooks/useInCart'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import useQuantity from '@/app/hooks/useQuantity'

const Details:React.FC<{ syncProduct:any; variant:any }> = ({variant,syncProduct}) => {
  
    const dispatch = useDispatch()
    const shopActions = bindActionCreators(ShopActions,dispatch)

    const [variantIndex,setVariantIndex] = useState<number>(0)

    const [template,setTemplate] = useTemplate(syncProduct?.result?.sync_product?.id,0,100)
    const [variantState,setVariantState] = useVariant(syncProduct?.result?.sync_product?.id) 
    const [category,setCategory] = useCategory(syncProduct?.result?.sync_variants[variantIndex]?.main_category_id)
    const [inCart,setInCart] = useInCart(syncProduct?.result?.sync_product?.id)
    const [quantity,setQuantity] = useQuantity(syncProduct?.result?.sync_product?.id)
    
    const [size,setSize] = useState<string>(template?.sizes[0])
    const [color,setColor] = useState<any>(template?.colors[0])


    const sizesMenuRef = useRef() as MutableRefObject<HTMLDivElement>
    const colorsMenuRef = useRef() as MutableRefObject<HTMLDivElement>

    const handleInitMenus = () =>{
      sizesMenuRef.current.style.display = 'none'
      colorsMenuRef.current.style.display = 'none'
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

    const handleSize = (size:string) =>{
      const variant = syncProduct?.result.sync_variants.find((v:any) => v?.size?.toLowerCase() === size.toLowerCase())
      const index = syncProduct?.result.sync_variants.indexOf(variant)
      setVariantIndex(index)
    }

    useEffect(()=>{
      setSize(template?.sizes[0])
      setColor(template?.colors[0])
      handleInitMenus()
    },[template])

    return ( 
    <Layout>
      <div className='details pt-[200px]'>
        <div className="details-main flex justify-between items-center">
          <Image className ="md:w-1/2" src={syncProduct?.result?.sync_variants[variantIndex]?.files[1]?.preview_url} width={1920} height={768} alt='product-image' />
          <div className="details-info p-5 md:w-1/2">
            <h2 className="text-5xl font-bold rounded-lg p-2">{syncProduct?.result?.sync_variants[variantIndex]?.name}</h2>
            <div className="flex justify-between items-center gap-5 my-3">
              <div className="w-1/2 p-2 text-center bg-white rounded-full font-bold italic">Price: <span className='text-green-300'>{syncProduct?.result?.sync_variants[variantIndex]?.retail_price}{syncProduct?.result?.sync_variants[variantIndex]?.currency}</span></div>
              <div className="w-1/2 p-2 text-center bg-white rounded-full font-bold relative top-0 left-0">
                <p onClick={()=>handleMenu(colorsMenuRef)} className='hover:opacity-50 cursor-pointer italic font-bold'>Color: <span className='text-green-300'>{color?.color_name as string}</span></p>
                <div ref={colorsMenuRef} className="details-color-menu absolute top-12 left-1/2 -translate-x-1/2 w-[160px] p-3 rounded-lg bg-white shadow-lg shadow-gray-300">
                  {template?.colors?.map((c:any) => <p onClick={()=>setColor(c)} className={`p-2 cursor-pointer italic hover:bg-green-300 rounded-lg`}>{c?.color_name}</p>)}
                </div>
                </div>
              <div className="w-1/2 p-2 text-center bg-white rounded-full font-bold relative top-0 left-0">
                <p onClick={()=>handleMenu(sizesMenuRef)} className='hover:opacity-50 cursor-pointer italic font-bold'>Size: <span className='text-green-300'>{size}</span></p>
                <div ref={sizesMenuRef} className="details-sizes-menu absolute top-12 left-1/2 -translate-x-1/2 w-[160px] p-3 rounded-lg bg-white shadow-lg shadow-gray-300">
                  {template?.sizes?.map((s:string) => <p onClick={()=>{
                    setSize(s)
                    handleSize(s)
                  }} className='p-2 cursor-pointer hover:bg-green-300 rounded-lg'>{s}</p>)}
                </div>
                </div>
            </div>
            <div className="flex justify-between items-center gap-5 my-3">
              <div onClick={()=>{
                if(inCart && quantity as number > 1){
                  // @ts-ignore
                  setQuantity(quantity - 1)
                  shopActions.decrement(syncProduct?.result?.sync_product?.id,1)
                }else{
                  shopActions.removeFromCart(syncProduct?.result?.sync_product?.id)
                }
              }} className="w-1/3 text-center hover:text-white p-2 font-bold hover:bg-green-300 cursor-pointer bg-white rounded-full">-</div>
              <div className="w-1/3 text-center  p-2 font-bold cursor-pointer bg-white rounded-full">{quantity as number}</div>
              <div onClick={()=>{
                if(!inCart){
                  shopActions.addToCart(syncProduct?.result?.sync_product?.id,syncProduct?.result?.sync_variants[variantIndex]?.id,syncProduct?.result?.sync_variants[variantIndex]?.variant_id,syncProduct?.result?.sync_variants[variantIndex]?.warehouse_product_variant_id,syncProduct?.result?.sync_variants[variantIndex]?.external_id,1,syncProduct?.result?.sync_variants[variantIndex]?.retail_price)
                  // @ts-ignore
                  setQuantity(1)
                }else{
                  // @ts-ignore
                  setQuantity(quantity + 1)
                  shopActions.increment(syncProduct?.result?.sync_product?.id,1)
                }
              }} className="w-1/3 text-center hover:text-white p-2 font-bold hover:bg-green-300 cursor-pointer bg-white rounded-full">+</div>
            </div>
            <h2 className="text-sm rounded-lg bg-white p-2">{variant?.result?.product?.description}</h2>
            <div className="details-product-stock-info flex justify-center items-center">
            {category && 
              <div className='px-6 mx-2 py-2 my-2 w-[100%] rounded-md bg-orange-300 text-white font-bold text-md text-center flex justify-center items-center'>
                {category?.image_url && <Image className='mr-2' src={category.image_url} alt="category-image" width={25} height={25} />}
                <span>{category?.title}</span>
              </div>}
              {syncProduct?.result?.sync_variants[variantIndex]?.availability_status 
                ? <div className='mx-2 px-6 py-2 my-2 w-[100%] rounded-md bg-green-300 text-white font-bold text-md text-center'>Available</div>
                : <div className='mx-2 px-6 py-2 my-2 w-[100%] rounded-md bg-red-500 text-white font-bold text-md text-center'>Unavailable</div>}
            </div>
            <div className="details-regions flex justify-start items-center flex-wrap">
              {Object.keys({...variantState?.result?.variant?.availability_regions}).length > 0 && <h3 className="text-md font-bold w-[100%]">Regions:</h3>}
              {Object.keys({...variantState?.result?.variant?.availability_regions}).map((k:string) => <div key={`regions-key-${k}`} className='bg-orange-300 min-w-fit px-3 py-2 my-2 font-bold italic text-white rounded-md mr-3'>{variantState?.result?.variant?.availability_regions[k]}</div>)}
            </div>
            {variantState?.result?.variant?.availability_status?.length > 0 && <h3 className="text-md font-bold">Regions Availablity Status:</h3>}
            <div className="details-regions-status flex justify-start items-center flex-wrap">
              {variantState?.result?.variant?.availability_status?.map((s:any) => <div key={`status-key-${s.region}`} className={`min-w-fit px-3 py-2 my-2 font-bold italic text-white rounded-md mr-3 ${s?.status === 'in_stock' ? "bg-green-300" : 'bg-red-500'}`}>{s?.region}</div>)}
            </div>
            {!inCart
              ? <button onClick={()=> {if(!inCart) shopActions.addToCart(syncProduct?.result?.sync_product?.id,syncProduct?.result?.sync_variants[variantIndex]?.id,syncProduct?.result?.sync_variants[variantIndex]?.variant_id,syncProduct?.result?.sync_variants[variantIndex]?.warehouse_product_variant_id,syncProduct?.result?.sync_variants[variantIndex]?.external_id,1,syncProduct?.result?.sync_variants[variantIndex]?.retail_price)}} className="block w-[100%] rounded-full py-2 mt-5 font-bold text-white hover:opacity-70">Add To Cart</button>
              : <button className="block w-[100%] rounded-full py-2 mt-5 font-bold text-white hover:opacity-70">In Your Cart</button>
            }
          </div>
        </div>
        <Title 
          isLeft={true}
          title="Hot"
          />
        <ProductCarousel />
      </div>
    </Layout>
    )     
  }

  export async function getStaticProps({params}:any){
    const syncProduct = await APIController.printfulGetSyncProduct('en_US',Number(params.id))
    const variant = await APIController.printfulGetVariant('en_US',syncProduct?.result?.sync_variants[0].variant_id)
    return {
      props:{
        syncProduct,
        variant
      }
    }
  }
  
  export default Details

  export async function getStaticPaths(){
    try{
        const products = await APIController.printfulGetAllSyncProducts('en_US',0,100)
        const paths = products?.result?.map(({ id }:{ id:number }) => ({ params:{ id:id.toString() }}))
        return { paths ,fallback:false }
    }
    catch(err){
        console.log(err)
        return { paths:[] ,fallback:false }
    }
}