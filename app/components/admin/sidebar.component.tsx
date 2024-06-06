import React from 'react'
import Link from 'next/link'
import * as UiActions from '@/app/controller/action-creators/ui.action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleSidebar } from '@/app/controller/lib/handleSidebar'
import { State } from '@/app/controller/reducers/root.reducer'

const Sidebar = () => {

  const { isSidebar } = useSelector((state:State) => state.ui)
  const dispatch = useDispatch()
  const UIActions  = bindActionCreators(UiActions,dispatch)

  return (
    <div className="admin-sidebar transition-all absolute w-[25%] z-50 top-0 left-0 h-[100vh] text-white bg-neutral-900 p-5 -translate-x-[100%]">
      <Link className='block my-3 p-3 rounded-md font-bold hover:text-black hover:bg-green-300' href="/admin/users">Users</Link>
      <Link className='block my-3 p-3 rounded-md font-bold hover:text-black hover:bg-green-300' href="/admin/sales">Sales</Link>
      <Link className='block my-3 p-3 rounded-md font-bold hover:text-black hover:bg-green-300' href="/admin/products">Products</Link>
      <button onClick={()=>handleSidebar(isSidebar,UIActions)} className='hover:opacity-50 transition-all block rounded-md mx-auto w-[95%] absolute bottom-12 left-1/2 -translate-x-1/2 font-bold text-white px-6 py-2'>Close</button>
    </div>
  )
}

export default Sidebar
