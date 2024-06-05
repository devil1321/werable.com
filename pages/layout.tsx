import Foot from '@/app/components/global/foot.component'
import Footer from '@/app/components/global/footer.component'
import Nav from '@/app/components/global/nav.component'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import { bindActionCreators } from 'redux'
import { usePathname, useRouter } from 'next/navigation'
import { State } from '@/app/controller/reducers/root.reducer'

const Layout:React.FC<{children:React.ReactNode}> = ({children}) => {

  
  const router = useRouter()
  const pathname = usePathname()

  const { user,locale } = useSelector((state:State) => state.api)
  const { cart } = useSelector((state:State) => state.shop)

  const dispatch = useDispatch()
  const APIActions  = bindActionCreators(ApiActions,dispatch)
  const shopActions  = bindActionCreators(ShopActions,dispatch)

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
    if(typeof window !== 'undefined'){
      const token = localStorage.getItem('jwt')
      if(token){
        APIActions.getUser()
        APIActions.printfulGetAllSyncProducts(0,100)
      }
    }
  },[locale])

  useEffect(()=>{
    shopActions.setCart()
    handleInit()
  },[user])
  
  return (
    <div className='container'>
      <Nav />
      {children}
      <Foot />
      <Footer />
    </div>
  )
}

export default Layout
