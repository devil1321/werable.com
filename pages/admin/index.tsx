import React, { useEffect, useState } from 'react'
import AdminLayout from '../admin-layout'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import { usePathname,useRouter } from 'next/navigation'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'
import Image from 'next/image'

const Page = () => {
  const { user,data } = useSelector((state:State) => state.api)
  const [dataMsg,setDataMsg] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

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

  const handleSubmitLogin = (e:any) =>{
    e.preventDefault()
    APIActions.login(loginFormData)
  }


  const handleInit = () =>{
    if(typeof window !== 'undefined'){
      const token = localStorage.getItem('jwt')
      if(pathname === '/admin' && token){
        if(user?.is_admin){
          router.push('/admin/users')
        }else{
          router.push('/admin')
          setDataMsg({
            msg:'You`re not admin'
          })
        }
      }
    }
  }

  useEffect(()=>{
    setDataMsg(data)
  },[data])

  useEffect(()=>{
    handleInit()
  },[user])

  return (
          <div className='admin-login container h-[100vh] flex justify-center items-center flex-col'>
            <Image className='block mx-auto' src="/assets/login.svg" alt='login-image' width={300} height={300}/>
            {dataMsg?.msg && <div className='w-1/3 p-5 bg-red-300 text-red-700'>{dataMsg.msg}</div>}
            <form className='w-[95%] md:w-1/3 mx-auto' action="" onSubmit={(e)=>handleSubmitLogin(e)} encType='multipart/form-data'>
              <div className="credentials-login-field ">
                <label className="text-green-500 italic" htmlFor="">Email:</label>
                <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2" type="email" name="email" onChange={(e)=>handleChangeLogin(e)} value={loginFormData.email} />
              </div>
              <div className="credentials-login-field ">
                <label className="text-green-500 italic" htmlFor="">Password:</label>
                <input className="block w-[100%] rounded-md bg-white border-[1px] border-gray-300 p-2"type="password" name="password" onChange={(e)=>handleChangeLogin(e)} value={loginFormData.password}/>
              </div>
              <button className='block w-[100%] mt-2 rounded-md hover:opacity-70 text-white font-bold cursor-pointer bg-blue-400 p-2' type="submit">Login</button>
            </form>
        </div>
  )
}

export default Page
