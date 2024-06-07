import React, { useEffect } from 'react'
import Nav from '@/app/components/admin/nav.component'
import Foot from '@/app/components/global/foot.component'
import Footer from '@/app/components/global/footer.component'
import Sidebar from '@/app/components/admin/sidebar.component'
import { useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import { usePathname,useRouter } from 'next/navigation'

const AdminLayout:React.FC<{ children:React.ReactNode }> = ({children}) => {

  const { user } = useSelector((state:State) => state.api)

  const pathname = usePathname()
  const router = useRouter()

  const handleInit = () =>{
    if(typeof window !== 'undefined'){
      const token = localStorage.getItem('jwt')
      if(pathname === '/admin' && token){
        if(user?.is_admin){
          router.push('/admin/users')
        }else{
          router.push('/admin')
        }
      }
    }
  }

  useEffect(()=>{
    handleInit()
  },[user])


  return (
    <div className='container relative top-0 left-0'>
      <Sidebar />
      <Nav />
      <div className="inner-container translate-y-[150px] rounded-md p-5 bg-white mx-auto w-[95vw] md:w-[90vw] h-[100%]">
        {children}
      </div>
      <Foot />
      <Footer />
    </div>
  )
}

export default AdminLayout
