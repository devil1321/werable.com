import { State } from '@/app/controller/reducers/root.reducer'
import AdminLayout from '@/pages/admin-layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import Item from '@/app/components/admin/products/item.component'

const Page = () => {

  const { products } = useSelector((state:State) => state.api)
  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

  useEffect(()=>{
    APIActions.printfulGetAllSyncProducts(0,100)
  },[])

  return (
    <AdminLayout>
      <div className='admin-users'>
        <h1 className="text-3xl mb-6 font-bold text-black">Products</h1>
        {products?.result?.map((p:any) => <Item key={`admin-product-key-${p.id}`} product={p} />)}
      </div>
    </AdminLayout>
  )
}

export default Page
