import React from 'react'
import Image from 'next/image'

const Categories = () => {
    
  return (
    <div className='home-categories relative left-[2%] top-0 flex justify-center items-start'>
      <div className="home-categories-category min-w-max relative left-[30%] top-0">
        <h2 className="text-5xl md:text-[100px] rotate-[45deg] font-bold text-white absolute top-1/2 left-1/2 -translate-y-[250%] -translate-x-[80%]">Men</h2>
        <Image src="/assets/men-category.png" alt='category-men' width={455} height={600} />
      </div>
      <div className="home-categories-category min-w-max">
      <h2 className="text-5xl md:text-[100px] -rotate-[80deg] font-bold text-white absolute top-1/2 left-1/2 -translate-y-[20%] -translate-x-[100%]">Woman</h2>
        <Image src="/assets/woman-category.png" alt='category-woman' width={560} height={600} />
      </div>
      <div className="home-categories-category min-w-max relative -left-[5%] top-0">
      <h2 className="text-5xl md:text-[100px] -rotate-[60deg] font-bold text-white absolute top-1/2 left-1/2 -translate-y-[150%] -translate-x-[70%]">Kids</h2>
        <Image src="/assets/kids-category.png" alt='category-kids' width={440} height={600} />
      </div>
      <div className="home-categories-category min-w-max relative -left-[34%] top-0">
        <h2 className="text-5xl md:text-[100px] rotate-[90deg] font-bold text-white absolute top-1/2 left-1/2 -translate-y-[0%] -translate-x-[20%]">Teens</h2>
        <Image src="/assets/teens-category.png" alt='category-teens' width={510} height={600} />
      </div>
    </div>
  )
}

export default Categories
