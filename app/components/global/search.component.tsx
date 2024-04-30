import React from 'react'
import Image from 'next/image'

const Search:React.FC<{title:string}> = ({title}) => {
  return (
    <div className='search mt-[100px] mb-[700px] md:mb-[400px] relative flex justify-center items-start top-0 left-0'>
      <div className="search-form absolute left-0 md:-left-[5%] xl:rotate-[2deg] lg:left-0 xl:left-[3%] top-[100px] md:top-[0px] xl:-top-[50px]">
        <Image src="/assets/yellow-triangle.png" alt='triangle-yellow' width={550} height={550}/> 
        <div className="search-form-form max-w-[350px] absolute z-10 px-5 md:px-0 left-0 md:-left-[5%] xl:-rotate-[2deg] md:left-[10%] lg:left-[5%] xl:left-[3%] top-[50px] md:top-[200px] xl:top-[180px]">
          <form action="">
            <div className="search-field rounded-full p-1 w-[75%] bg-gray-200">
              <input className='bg-gray-200 px-2 w-[65%]' type="text" placeholder='By Name' />
            </div>
            <div className="search-form-items my-3 flex justify-start gap-3">
              <div className="search-field rounded-full p-1 max-w-[100px] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="text" placeholder='Price Min' />
              </div>
              <div className="search-field rounded-full p-1 max-w-[100px] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="text" placeholder='Price Max' />
              </div>
              <div className="search-field rounded-full p-1 max-w-[100px] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="text" placeholder='Size'/>
              </div>
            </div>
            <div className="search-form-items my-3 flex justify-start gap-3">
              <div className="search-field rounded-full p-1 max-w-[45%] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="text" placeholder='Category' />
              </div>
              <div className="search-field rounded-full p-1 max-w-[45%] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="text" placeholder='Color' />
              </div>
            </div>
            <div className="search-form-items my-3 flex justify-start gap-3">
              <div className="search-field rounded-full p-1 max-w-[45%] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="text"  placeholder='Company'/>
              </div>
              <div className="search-field rounded-full p-1 max-w-[45%] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="text" placeholder='Sex'/>
              </div>
            </div>
            <div className="search-form-items my-3 flex justify-start gap-3">
              <div className="search-field rounded-full p-1 max-w-[45%] bg-gray-200">
                <input className='bg-gray-200 px-2 w-[100%]' type="text" placeholder='Type'/>
              </div>
            </div>
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
          <button className="my-2 rounded-full hover:opacity-70 block w-[63%] py-2 font-bold text-white">Filter</button>
        </div>
      </div>
    </div>
  )
}

export default Search
