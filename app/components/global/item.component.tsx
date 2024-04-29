import React from 'react'
import Product from './product.component'

const Item:React.FC<{ product:any }> = ({product}) => {
  return (
    <div className="item flex justify-center items-center">
      <Product product={product} />
      <div className="item-details w-[50%] rounded-md ml-12 py-3 px-12">
        <h2 className="font-bold my-5 text-5xl">{product.title}</h2>
        <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores optio nam a. Consequatur, explicabo odio similique laborum est possimus aliquam ipsa iure? Sapiente cum soluta nam optio saepe repudiandae officiis corrupti distinctio minima dolore maiores aut tempore in obcaecati eius ullam odio earum eaque, consectetur libero rerum repellendus sed! Optio.</p>
        <button className='block my-2 hover:opacity-70 w-[100%] py-2 rounded-full text-white font-bold text-2xl'>Remove</button>
      </div>
    </div>
  )
}

export default Item
