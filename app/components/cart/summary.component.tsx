import React from 'react'

const Summary = () => {
  return (
    <div className='cart-summary rounded-lg px-12 py-6 w-[90%] mx-auto md:w-1/3 md:ml-auto md:mr-[7%]'>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-2xl">Total</h3>
        <h3 className="font-bold text-2xl">$999</h3>
      </div>
      <button className="font-bold text-md text-white block w-[100%] hover:opacity-70 my-5 rounded-full py-2">Checkout</button>
    </div>
  )
}

export default Summary
