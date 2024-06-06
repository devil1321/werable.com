import React from 'react'
import Image from 'next/image'
import { splitText } from '@/app/controller/lib/split-text'
import gsap from 'gsap'

const Categories = () => {

  const handleAnimateIn = (e:any) =>{
    e.stopPropagation()
    const heading_1 = e.target.parentElement.querySelector('h2:first-of-type') as HTMLHeadingElement
    const heading_2 = e.target.parentElement.querySelector('h2:last-of-type') as HTMLHeadingElement
    const chars_1 = splitText(heading_1) as HTMLSpanElement[]
    const chars_2 = splitText(heading_2) as HTMLSpanElement[]
    heading_1.innerHTML = ''
    heading_2.innerHTML = ''
    chars_1.forEach((char:HTMLSpanElement)=>heading_1.appendChild(char))
    chars_2.forEach((char:HTMLSpanElement)=>heading_2.appendChild(char))
    const letters_1 = heading_1.querySelectorAll('.letter') as NodeListOf<HTMLSpanElement>
    const letters_2 = heading_2.querySelectorAll('.letter') as NodeListOf<HTMLSpanElement>
    gsap.from(letters_2,{
        opacity:0,
        y:50,
        rotateX:-90,
        stagger:0.05
    })
    gsap.to(letters_1,{
        opacity:1,
        rotateX:90,
        y:-50,
        stagger:0.05
    })
  }
  const handleAnimateOut = (e:any) =>{
    e.stopPropagation()
    const heading_1 = e.target.parentElement.querySelector('h2:first-of-type') as HTMLHeadingElement
    const heading_2 = e.target.parentElement.querySelector('h2:last-of-type') as HTMLHeadingElement
    const chars_1 = splitText(heading_1) as HTMLSpanElement[]
    const chars_2 = splitText(heading_2) as HTMLSpanElement[]
    heading_1.innerHTML = ''
    heading_2.innerHTML = ''
    chars_1.forEach((char:HTMLSpanElement)=>heading_1.appendChild(char))
    chars_2.forEach((char:HTMLSpanElement)=>heading_2.appendChild(char))
    const letters_1 = heading_1.querySelectorAll('.letter') as NodeListOf<HTMLSpanElement>
    const letters_2 = heading_2.querySelectorAll('.letter') as NodeListOf<HTMLSpanElement>
    gsap.to(letters_2,{
        opacity:0,
        y:50,
        rotateX:-90,
        stagger:0.05
    })
    gsap.from(letters_1,{
        opacity:1,
        rotateX:90,
        y:-50,
        stagger:0.05,
    })
  }
    
  return (
    <div className='home-categories relative left-[2%] top-0 flex justify-center items-start flex-wrap lg:flex-nowrap'>
      <div className="home-categories-category min-w-max relative -left-[10%] lg:left-[40%] xl:left-[30%] top-0">
        <h2 onMouseEnter={(e)=>handleAnimateIn(e)} onMouseLeave={(e)=>handleAnimateOut(e)} className="text-5xl md:text-[100px] rotate-[45deg] font-bold text-white absolute top-1/2 left-1/2 z-50 -translate-y-[250%] -translate-x-[80%]">Men</h2>
        <h2 onMouseEnter={(e)=>handleAnimateIn(e)} onMouseLeave={(e)=>handleAnimateOut(e)} className="text-5xl md:text-[100px] rotate-[45deg] font-bold text-white absolute top-1/2 left-1/2 z-50 -translate-y-[250%] -translate-x-[80%]">Men</h2>
        <Image src="/assets/men-category.png" alt='category-men' width={455} height={600} />
      </div>
      <div className="home-categories-category min-w-max relative -top-[650px] lg:top-0 left-0">
        <h2 onMouseEnter={(e)=>handleAnimateIn(e)} onMouseLeave={(e)=>handleAnimateOut(e)} className="text-5xl md:text-[100px] -rotate-[80deg] font-bold text-white absolute top-1/2 left-1/2 z-50 -translate-y-[20%] -translate-x-[40%] lg:-translate-x-[100%] xl:-translate-x-[30%]">Woman</h2>
        <h2 onMouseEnter={(e)=>handleAnimateIn(e)} onMouseLeave={(e)=>handleAnimateOut(e)} className="text-5xl md:text-[100px] -rotate-[80deg] font-bold text-white absolute top-1/2 left-1/2 z-50 -translate-y-[20%] -translate-x-[40%] lg:-translate-x-[100%] xl:-translate-x-[30%]">Woman</h2>
        <Image src="/assets/woman-category.png" alt='category-woman' width={560} height={600} />
      </div>
      <div className="home-categories-category min-w-max relative -left-[15%] lg:-left-[7%] xl:-left-[5%] top-[-630px] lg:top-0">
        <h2 onMouseEnter={(e)=>handleAnimateIn(e)} onMouseLeave={(e)=>handleAnimateOut(e)} className="text-5xl md:text-[100px] -rotate-[60deg] font-bold text-white absolute top-1/2 left-1/2 z-50 -translate-y-[150%] -translate-x-[70%]">Kids</h2>
        <h2 onMouseEnter={(e)=>handleAnimateIn(e)} onMouseLeave={(e)=>handleAnimateOut(e)} className="text-5xl md:text-[100px] -rotate-[60deg] font-bold text-white absolute top-1/2 left-1/2 z-50 -translate-y-[150%] -translate-x-[70%]">Kids</h2>
        <Image src="/assets/kids-category.png" alt='category-kids' width={440} height={600} />
      </div>
      <div className="home-categories-category min-w-max relative -left-[5%] lg:-left-[44%] xl:-left-[34%] -top-[1300px] lg:top-0">
        <h2 onMouseEnter={(e)=>handleAnimateIn(e)} onMouseLeave={(e)=>handleAnimateOut(e)} className="text-5xl md:text-[100px] rotate-[90deg] font-bold text-white absolute top-1/2 left-1/2 z-50 -translate-y-[0%] -translate-x-[20%]">Teens</h2>
        <h2 onMouseEnter={(e)=>handleAnimateIn(e)} onMouseLeave={(e)=>handleAnimateOut(e)} className="text-5xl md:text-[100px] rotate-[90deg] font-bold text-white absolute top-1/2 left-1/2 z-50 -translate-y-[0%] -translate-x-[20%]">Teens</h2>
        <Image src="/assets/teens-category.png" alt='category-teens' width={510} height={600} />
      </div>
    </div>
  )
}

export default Categories
