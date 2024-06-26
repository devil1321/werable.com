import { State } from '@/app/controller/reducers/root.reducer'
import AdminLayout from '@/pages/admin-layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import Item from '@/app/components/admin/users/item.component'

const Page = () => {

  const { users } = useSelector((state:State) => state.api)
  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

  useEffect(()=>{
    APIActions.getUsers()
  },[])

  return (
    <AdminLayout>
      <div className='admin-users'>
        <h1 className="text-3xl mb-6 font-bold text-black">Users</h1>
        {users?.map((u:any) => <Item key={`user-key-${u.id}`} user={u} />)}
      </div>
    </AdminLayout>
  )
}

export default Page
