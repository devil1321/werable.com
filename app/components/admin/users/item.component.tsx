import React from 'react'
import { useDispatch } from 'react-redux'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'


const Item:React.FC<{user:any}> = ({user}) => {
  
  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

  return (
    <React.Fragment>
    {user && 
      <div className='flex flex-wrap justify-flex-start items-center p-2 bg-neutral-900 text-white rounded-md w-[100%] my-2 hover:bg-neutral-700 transition-all cursor-pointer'>
        <h3 className="w-[100%] xl:w-max my-2 xl:my-0 font-bold mx-2 px-3 py-2 text-white bg-orange-300 rounded-md">{user.first_name} {user.last_name}</h3>
        <h3 className="w-[100%] xl:w-max my-2 xl:my-0 font-bold mx-2 px-3 py-2 text-white bg-blue-300 rounded-md">{user.email}</h3>
        <h3 className="w-[100%] xl:w-max my-2 xl:my-0 font-bold mx-2 px-3 py-2 text-white bg-green-300 rounded-md">{user.address_1}</h3>
        <h3 className="w-[100%] xl:w-max my-2 xl:my-0 font-bold mx-2 px-3 py-2 text-white bg-neutral-800 rounded-md">{user.phone}</h3>
        <button onClick={()=>APIActions.deleteUser(user?.id)} className="block w-[98%] xl:w-max my-2 xl:my-0 font-bold mx-2 px-3 py-2 ml-auto text-white hover:opacity-70 transition-all rounded-md">Remove</button>
      </div>}
    </React.Fragment>
  )
}

export default Item
