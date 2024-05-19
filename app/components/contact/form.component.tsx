import React from 'react'

const Form = () => {

  const handleBorder = (e:any) =>{
    const fields = document.querySelectorAll('.contact-form-field') as NodeListOf<HTMLDivElement>
    fields.forEach((f:HTMLDivElement) => f.style.borderColor = 'gray')
    e.target.parentElement.style.borderColor = 'yellowgreen'
  }

  return (
    <div className='contact-form'>
      <h2 className="text-5xl text-center text-red-500">Submit Your Message</h2>
      <form className='w-[90%] md:w-[55%] py-12 mx-auto' action="">
        <div onClick={(e)=>handleBorder(e)} className="contact-form-field my-5 border-b-[1px] border-[lightgray]">
            <label htmlFor="" className="block italic font-bold">Name:</label>
            <input className='bg-transparent w-[100%]' type="text" name='name' />
        </div>
        <div onClick={(e)=>handleBorder(e)} className="contact-form-field my-5 border-b-[1px] border-[lightgray]">
            <label htmlFor="" className="block italic font-bold">Email:</label>
            <input className='bg-transparent w-[100%]' type="email" name='email' />
        </div>
        <div onClick={(e)=>handleBorder(e)} className="contact-form-field my-5 border-b-[1px] border-[lightgray]">
            <label htmlFor="" className="block italic font-bold">Message:</label>
            <textarea className='bg-transparent w-[100%]' name='message' />
        </div>
      </form>
    </div>
  )
}

export default Form
