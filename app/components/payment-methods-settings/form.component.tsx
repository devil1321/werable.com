import { State } from '@/app/controller/reducers/root.reducer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'
import Image from 'next/image'

const Form = () => {
  
  const { card,countries,locale:language,user } = useSelector((state:State) => state.api)

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

  const [formData,setFormData] = useState({
    id:0,
    user_id:0,
    card_number:0,
    card_exp_month:0,
    card_exp_year:0,
    card_cvc:0,
    card_owner_name:'',
  })

  const handleInitFormData = () =>{
    setFormData({
      id:card?.id,
      user_id:card?.user_id,
      card_number:card?.card_number,
      card_exp_month:card?.card_exp_month,
      card_exp_year:card?.card_exp_year,
      card_cvc:card?.card_cvc,
      card_owner_name:card?.card_owner_name,
      })
  }

  const handleChange = (e:any) =>{
    setFormData((prevState:any)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  }

  const handleSubmit = (e:any) =>{
    e.preventDefault()
    APIActions.updateCard(formData)
  }

  useEffect(()=>{
    handleInitFormData()
  },[user])

  useEffect(()=>{
    APIActions.printfulGetCountries()
  },[language])

  return (
    <div className='profile-form flex-wrap md:flex-nowrap gap-3 flex justify-center items-start p-2 md:p-6 xl:p-12'>
      <form className='flex flex-wrap md:w-2/3 translate-x-[5%] md:translate-x-[0px]' action="" onSubmit={(e)=>handleSubmit(e)}>
          <div className="profile-form-field my-2 w-[100%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Card Number:</label>
            <input className="w-[93.5%] p-2 rounded-md" type="text" name="card_number" value={formData.card_number} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[100%] md:w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Card Exp Month:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="card_exp_month" value={formData.card_exp_month} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[100%] md:w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Card Exp Year:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="card_exp_year" value={formData.card_exp_year} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[100%] md:w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Card Cvc:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="card_cvc" value={formData.card_cvc} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[100%] md:w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Card Owner Name:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="card_owner_name" value={formData.card_owner_name} onChange={(e)=>handleChange(e)} />
          </div>
      </form>
      <Image className='md:w-1/3' src="/assets/card.jpg" alt='profile-image' width={600} height={600} />
    </div>
  )
}

export default Form
