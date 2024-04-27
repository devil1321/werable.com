import React from 'react'
import Image from 'next/image'

interface TitleProps{
  isLeft:boolean;
  title:string;
}

const Title:React.FC<TitleProps> = ({isLeft,title}) => {
  return (
    <div className='title mx-auto relative top-0 left-0 my-12 w-[300px] md:w-[500px]'>
      {isLeft
      ? <Image src="/assets/title-right.png" alt='title-background' width={500} height={300} />
      : <Image src="/assets/title-left.png" alt='title-background' width={500} height={300} />}
      <h2 className="text-5xl absolute w-2/3 top-[30%] left-1/2 -translate-x-[55%] font-bold text-white text-center">{title}</h2>
    </div>
  )
}

export default Title
