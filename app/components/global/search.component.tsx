import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '@/app/controller/reducers/root.reducer'

const Search:React.FC<{title:string}> = ({title}) => {

  const { categories,products } = useSelector((state:State) => state.api)
  const [nameMatches,setNameMatches] = useState<any>([])
  const [allSizes,setAllSizes] = useState<any[]>([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'XS',
    'S',
    'L',
    'M',
    'XL',
    '2XL',
    '3XL',
    '4XL',
    '5XL'
  ])
  const [sizeMatches,setSizeMatches] = useState<any>([])

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

  const [query,setQuery] = useState<any>({
    name:null,
    size:null,
    min_price:0,
    max_price:1000,
  })

  const handleChange = (e:any) =>{
    setQuery((prevState:any)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const handleNameMatches = (e:any) =>{
    const regex = new RegExp(`^${e.target.value}`,'i')
    setNameMatches(products?.filter((p:any) => regex.test(p.sync_product.name)))
  }

  const handleSizeMatches = (e:any) =>{
    const regex = new RegExp(`^${e.target.value}`,'i')
    setSizeMatches(allSizes.filter((size:string) => regex.test(size)))
  }

  const handleSetNullSize = () =>{
    if(query.size === ''){
      setQuery((prevState:any)=>({
        ...prevState,
        size:null
      }))
    }
  }

  useEffect(()=>{
    handleSetNullSize()
  },[query.size])

  return (
    <div className='search mt-[100px] 2xl:-mt-[100%] mb-[700px] md:mb-[500px] relative flex justify-center items-start top-0 left-0 z-40'>
      <div className="search-form absolute left-0 md:-left-[5%] xl:rotate-[2deg] lg:left-0 xl:left-[3%] top-[100px] md:top-[0px] xl:-top-[50px]">
        <Image src="/assets/yellow-triangle.png" alt='triangle-yellow' width={550} height={550}/> 
        <div className="search-form-form max-w-[350px] absolute z-10 px-5 md:px-0 left-0 xl:-rotate-[2deg] md:left-[10%] lg:left-[5%] xl:left-[3%] top-[110px] md:top-[260px] xl:top-[240px]">
          <label htmlFor="" className="mx-2 italic">Name</label>
          <label htmlFor="" className="mx-2 italic">Price Min</label>
          <label htmlFor="" className="mx-2 italic">Price Max</label>
          <label htmlFor="" className="mx-2 italic">Size</label>

          <form action="">
            <div className="search-field rounded-full p-1 w-[75%] bg-gray-200">
              <input className='bg-gray-200 px-2 w-[100%]' type="text" placeholder='By Name' name="name" value={query.name} onChange={(e)=>{
                handleChange(e)
                setSizeMatches([])
                setTimeout(() => {
                  handleNameMatches(e)
                }, 100);
              }} required/>
            </div>
            {nameMatches?.length > 0 && 
            <div className='search-form-name-matches relative overflow-y-scroll h-[400px] top-5 left-0 z-50 bg-white rounded-md p-2'>
              {nameMatches?.map((c:any) => <div className='hover:bg-green-300 cursor-pointer px-4 py-2 my-2 rounded-md font-bold hover:text-white' onClick={(e)=>{
                setQuery((prevState:any)=>({
                  ...prevState,
                  name:c.sync_product.name
                }))
                setNameMatches([])
                }}>{c.sync_product.name}</div>)}
            </div>}
            <div className="search-form-items my-3 flex justify-start gap-3">
              <div className="search-field rounded-full p-1 max-w-[100px] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="number" placeholder='Price Min' value={query.min_price} name="min_price" onChange={(e)=>handleChange(e)} required/>
              </div>
              <div className="search-field rounded-full p-1 max-w-[100px] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="number" placeholder='Price Max' value={query.max_price} name='max_price' onChange={(e)=>handleChange(e)} required/>
              </div>
              <div className="search-field rounded-full p-1 max-w-[100px] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="text" placeholder='Size' value={query.size} name="size" onChange={(e)=>{
                  handleChange(e)
                  setNameMatches([])
                  setTimeout(() => {
                    handleSizeMatches(e)
                    }, 100);
                    }} required/>
              </div>
            </div>
            {sizeMatches?.length > 0 && 
            <div className='search-form-name-matches absolute overflow-y-scroll h-[400px] top-[90px] left-0 translate-x-[290%] w-[80px] z-50 bg-white rounded-md p-2'>
              {sizeMatches?.map((s:any) => <div className='hover:bg-green-300 cursor-pointer px-4 py-2 my-2 rounded-md font-bold hover:text-white' onClick={(e)=>{
                setQuery((prevState:any)=>({
                  ...prevState,
                  size:s
                }))
                setSizeMatches([])
                }}>{s}</div>)}
            </div>}
          </form>
        </div>
      </div>
      <div className="search-title absolute w-max -top-[120px] md:top-0 left-1/2 -translate-x-1/2 xl:-translate-x-[55%]">
        <Image src="/assets/title-left.png" alt='search-title' width={800} height={800} />
        <h2 className="absolute top-[30%] md:top-[20%] left-1/2 -translate-x-[40%] text-white font-bold text-5xl md:text-[80px]">{title}</h2>
      </div>
      <div className="search-submit absolute top-[290px] w-max rotate-[30deg] md:rotate-[2deg] md:top-[120px] lg:rotate-0 lg:top-[50px] xl:top-0 -right-[30%] md:-right-[15%] lg:-right-[12%] xl:right-[2%]">
        <Image src="/assets/purple-triangle.png" alt='triangle-yellow' width={500} height={500}/> 
        <div className="search-submit absolute w-max rotate-[0deg] md:rotate-[2deg] top-[120px] md:top-[140px] lg:rotate-0 lg:top-[150px] xl:top-[120px] right-[5%] md:right-[12%] lg:right-[15%] xl:-right-[10%]">
          <h2 className="text-4xl xl:text-5xl font-bold text-white text-center w-1/2">Filter Products</h2>
          <button onClick={()=>APIActions.filterProducts(query)} className="my-2 rounded-full hover:opacity-70 block w-[63%] py-2 font-bold text-white">Filter</button>
        </div>
      </div>
    </div>
  )
}

export default Search
