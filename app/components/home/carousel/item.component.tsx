import React, { MutableRefObject } from 'react'
import Image from 'next/image';

interface ItemProps{
    itemRef:MutableRefObject<HTMLDivElement>
    img:string;
    title:string;
    paragraph:string;
}

const Item:React.FC<ItemProps> = ({itemRef,img,title,paragraph}) => {
  return (
    <div className='home-carousel-item relative min-w-[100vw] top-0 left-0' ref={itemRef}>
      <Image className='min-w-[100vw]' src={img} alt="carousel-image" width={1920} height={768} />
      <div className="home-carousel-item-details absolute top-[20%] left-[10%]">
        <h1 className="text-2xl md:text-[100px] font-bold text-white">{title}</h1>
        <p className="text-sm text-white">{paragraph}</p>
      </div>
    </div>
  )
}

export default Item
