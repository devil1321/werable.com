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

  const { user,locale,products } = useSelector((state:State) => state.api)

  const dispatch = useDispatch()
  const APIActions  = bindActionCreators(ApiActions,dispatch)
  const shopActions  = bindActionCreators(ShopActions,dispatch)

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      const token = localStorage.getItem('jwt')
      const language = localStorage.getItem('wearable-locale')

      if(language){
        APIActions.printfulSetLocale(language)
      }

      if(token){
        APIActions.getUser()
        APIActions.printfulGetAllSyncProducts(0,100)
        APIActions.printfulGetCategories()
      }
    }
  },[locale])

  useEffect(()=>{
    shopActions.setCart()
  },[user])
  
  return (
    <div className='container w-[100vw] mx-auto'>
      <Nav />
      {children}
      <Foot />
      <Footer />
    </div>
  )
}

export default Layout
