import Foot from '@/app/components/global/foot.component'
import Footer from '@/app/components/global/footer.component'
import Nav from '@/app/components/global/nav.component'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'
import { State } from '@/app/controller/reducers/root.reducer'


const Layout:React.FC<{children:React.ReactNode,jwt:string | null}> = ({children,jwt}) => {

  const dispatch = useDispatch()
  const { user } = useSelector((state:State) => state.api)
  const shopActions  = bindActionCreators(ShopActions,dispatch)
  const APIActions = bindActionCreators(ApiActions,dispatch)

  useEffect(()=>{
    APIActions.getUser
    APIActions.printfulGetAllSyncProducts(0,100)
  },[])

  useEffect(()=>{
    shopActions.setCart()
  },[user])
  
  return (
    <div className='container w-[100vw] mx-auto'>
      <Nav jwt={jwt} />
      {children}
      <Foot />
      <Footer />
    </div>
  )
}

export default Layout

