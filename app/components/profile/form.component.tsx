import { State } from '@/app/controller/reducers/root.reducer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'
import Image from 'next/image'

const Form = () => {
  
  const { data,countries,locale:language,user } = useSelector((state:State) => state.api)

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

  const [formData,setFormData] = useState({
    id:0,
    nickname:'',
    email:'',
    password:'',
    first_name:'',
    last_name:'',
    address_1:'',
    address_2:'',
    country_code:'',
    state_code:'',
    city:'',
    zip:'',
    phone:''
  })

  const handleInitFormData = () =>{
    setFormData({
        id:user?.id,
        nickname:user?.nickname,
        email:user?.email,
        password:user?.password,
        first_name:user?.first_name,
        last_name:user?.last_name,
        address_1:user?.address_1,
        address_2:user?.address_2,
        country_code:user?.country_code,
        state_code:user?.state_code,
        city:user?.city,
        zip:user?.zip,
        phone:user?.phone
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
    APIActions.updateProfile(formData)
  }

  useEffect(()=>{
    handleInitFormData()
  },[user])

  useEffect(()=>{
    APIActions.printfulGetCountries()
  },[language])

  return (
    <div className='profile-form flex-wrap md:flex-nowrap gap-3 flex justify-center items-start p-2 md:p-6 xl:p-12'>
      <form className='flex flex-wrap w-2/3' action="" onSubmit={(e)=>handleSubmit(e)}>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Nickname:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="nickname" value={formData.nickname} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className="italic font-bold block" htmlFor="">Email:</label>
            <input className="w-[90%] p-2 rounded-md" type="email" name="email" value={formData.email} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Password:</label>
            <input className="w-[90%] p-2 rounded-md" type="password" name="password" value={formData.password} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">First Name:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="first_name" value={formData.first_name} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Last Name:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="last_name" value={formData.last_name} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Address 1</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="address_1" value={formData.address_1} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Address 2</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="address_2" value={formData.address_2} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">City:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="city" value={formData.city} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Zip:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="zip" value={formData.zip} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2 w-[49%] rounded-md">
            <label className='italic font-bold block' htmlFor="">Phone:</label>
            <input className="w-[90%] p-2 rounded-md" type="text" name="phone" value={formData.phone} onChange={(e)=>handleChange(e)} />
          </div>
          <div className="profile-form-field my-2  w-[49%] mb-10">
              <label className="italic font-bold block mb-2 text-green-500" htmlFor="">State Code</label>
              <select className='w-[100%]' name="state_code" id="" onChange={(e)=>handleChange(e)} value={formData.state_code}>
                  <optgroup label="Undefined">
                    <option value={''}>Undefined</option>
                  </optgroup>
                {countries?.result?.map((c:any) =>{
                  return c?.states?.map((s:any)=> 
                  <optgroup label={c.name}>
                    <option value={s.code}>{s.name}</option>
                  </optgroup>
                )})}
              </select>
            </div>
            <div className="profile-form-field my-2  w-[49%] mb-10">
              <label className="italic font-bold block mb-2 text-green-500" htmlFor="">Country Code</label>
              <select className='w-[100%]' name="country_code" id="" value={formData.country_code} onChange={(e)=>handleChange(e)} required>
                {countries?.result?.map((c:any) => <option value={c.code}>{c.name}</option>)}
              </select>
            </div>
      </form>
      <Image className='w-1/3' src="/assets/banner-people.jpg" alt='profile-image' width={600} height={600} />
    </div>
  )
}

export default Form
