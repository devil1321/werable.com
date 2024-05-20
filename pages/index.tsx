'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'
import { usePathname, useRouter } from 'next/navigation'
import { State } from '@/app/controller/reducers/root.reducer'
import Link from 'next/link'
import axios from 'axios'

const Credentials = () => {

  const { data,countries } = useSelector((state:State) => state.api)
  
  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

  const router = useRouter()
  const pathname = usePathname()

  const [isRegister,setIsRegister] = useState<boolean>(false)
  const [registerFormData,setRegisterFormData] = useState<any>({
    nickname:'',
    email:'',
    password_1:'',
    password_2:'',
    first_name:'',
    last_name:'',
    city:'',
    zip:'',
    phone:'',
    country_code:'',
    state_code:'',
    address_1:'',
    address_2:''
  })
  const [loginFormData,setLoginFormData] = useState<any>({
    email:'',
    password:'',
  })

  const handleChangeLogin = (e:any) =>{
    setLoginFormData((prevState:any)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const handleChangeRegister = (e:any) =>{
    setRegisterFormData((prevState:any)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmitLogin = (e:any) =>{
    e.preventDefault()
    APIActions.login(loginFormData)
  }
  const handleSubmitRegister = (e:any) =>{
    e.preventDefault()
    APIActions.register(registerFormData)
  }
  const handleInit = () =>{
    if(typeof window !== 'undefined'){
      const token = localStorage.getItem('jwt')
      if(pathname !== "/" && !token){
        router.push("/")
      }else if(pathname === '/' && token){
        router.push('/home')
      }
    }
  }
  
  useEffect(()=>{
    APIActions.printfulGetCountries()
  },[])

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      const token = localStorage.getItem('jwt')
      if(token){
        APIActions.getUser()
        APIActions.setProducts()
      }
    }
  },[])
  
  return (  
    <div>
      {!isRegister
        ? <div className='credentials-login relative top-0 -left-[4%] w-[100vw] flex flex-col justify-center items-center'>
            <Image className='block mx-auto' src="/assets/login.svg" alt='login-image' width={300} height={300}/>
            {data?.msg && <div className='w-1/3 p-5 bg-red-300 text-red-700'>{data.msg}</div>}
            <form className='w-1/3' action="" onSubmit={(e)=>handleSubmitLogin(e)} encType='multipart/form-data'>
              <div className="credentials-login-field ">
                <label className="text-green-500 italic" htmlFor="">Email:</label>
                <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="email" name="email" onChange={(e)=>handleChangeLogin(e)} value={loginFormData.email} />
              </div>
              <div className="credentials-login-field ">
                <label className="text-green-500 italic" htmlFor="">Password:</label>
                <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="password" name="password" onChange={(e)=>handleChangeLogin(e)} value={loginFormData.password}/>
              </div>
              <Link href="#" className='block text-center p-2 rounded-md hover:opacity-70 text-white font-bold cursor-pointer bg-green-300 my-2 w-[100%]' onClick={()=>setIsRegister(true)}>Register</Link>
              <button className='block w-[100%] rounded-md hover:opacity-70 text-white font-bold cursor-pointer bg-blue-400 p-2' type="submit">Login</button>
            </form>
          </div>
        : <div className='credentials-register w-[100vw] flex flex-col justify-center items-center'>
          <Image className='block mx-auto mb-2' src="/assets/sign-up.svg" alt='login-image' width={250} height={250}/>
          {data?.msg && <div className='w-1/2 p-5 bg-red-300 text-red-700'>{data.msg}</div>}
          <form className='flex flex-wrap justify-between w-1/2' action="" onSubmit={(e)=>handleSubmitRegister(e)} encType='multipart/form-data'>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">Nickname:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="text" name="nickname" onChange={(e)=>handleChangeRegister(e)} value={registerFormData.nickname}/>
            </div>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">Email:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="email" name="email" onChange={(e)=>handleChangeRegister(e)}  value={registerFormData.email}/>
            </div>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">Password:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="password" name="password_1" onChange={(e)=>handleChangeRegister(e)} value={registerFormData.password_1}/>
            </div>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">Confirm Password:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="password" name="password_2" onChange={(e)=>handleChangeRegister(e)} value={registerFormData.password_2}/>
            </div>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">First Name:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="text" name="first_name" onChange={(e)=>handleChangeRegister(e)} value={registerFormData.first_name}/>
            </div>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">Last Name:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="text" name='last_name' onChange={(e)=>handleChangeRegister(e)} value={registerFormData.last_name}/>
            </div>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">City:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="text" name="city" onChange={(e)=>handleChangeRegister(e)} value={registerFormData.city} />
            </div>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">Zip:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="text" name="zip" onChange={(e)=>handleChangeRegister(e)} value={registerFormData.zip}/>
            </div>
            <div className="credentials-register-field w-[100%]">
              <label className="text-green-500 italic" htmlFor="">Phone:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="text" name="phone" onChange={(e)=>handleChangeRegister(e)} value={registerFormData.phone}/>
            </div>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">Address 1:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="text" name="address_1" onChange={(e)=>handleChangeRegister(e)} value={registerFormData.address_1}/>
            </div>
            <div className="credentials-register-field w-[49%]">
              <label className="text-green-500 italic" htmlFor="">Address 2:</label>
              <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="text" name="address_2" onChange={(e)=>handleChangeRegister(e)} value={registerFormData.address_2}/>
            </div>
            <div className="credentials-register-field w-[49%] mb-10">
              <label className="block mb-2 text-green-500 italic" htmlFor="">State Code</label>
              <select name="state_code" id="" value={registerFormData.state_code}>
                {countries?.result?.map((c:any) =>{
                  return c?.states?.map((s:any)=> <option onClick={()=>setRegisterFormData((prevState:any) => ({
                    ...prevState,
                    state_code:s.code
                  }))}
                  value={s.code}>{s.name}</option>)
                })}
              </select>
            </div>
            <div className="credentials-register-field w-[49%] mb-10">
              <label className="block mb-2 text-green-500 italic" htmlFor="">Country Code</label>
              <select name="country_code" id="" value={registerFormData.state_code}>
                {countries?.result?.map((c:any) => <option onClick={()=>setRegisterFormData((prevState:any) => ({
                    ...prevState,
                    country_code:c.code
                  }))}
                  value={c.code}>{c.name}</option>
                )}
              </select>
            </div>
            <Link href="#" className='block text-center p-2 rounded-md hover:opacity-70 text-white font-bold cursor-pointer bg-green-300 my-2 w-[100%]' onClick={()=>setIsRegister(false)}>Login</Link>
              <button className='block w-[100%] rounded-md hover:opacity-70 text-white font-bold cursor-pointer bg-blue-400 p-2' type="submit">Register</button>
          </form>
        </div>}
    </div>
  )
}

export default Credentials