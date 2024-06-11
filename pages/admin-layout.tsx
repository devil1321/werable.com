import React, { useEffect } from 'react'
import Nav from '@/app/components/admin/nav.component'
import Foot from '@/app/components/global/foot.component'
import Footer from '@/app/components/global/footer.component'
import Sidebar from '@/app/components/admin/sidebar.component'
import { useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import { usePathname,useRouter } from 'next/navigation'

const AdminLayout:React.FC<any> = (props) => {

  const { user } = useSelector((state:State) => state.api)

  const pathname = usePathname()
  const router = useRouter()

  const handleInit = () =>{
    if(typeof window !== 'undefined'){
      if(pathname === '/admin' && props.jwt){
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
  },[user,props.jwt])


  return (
    <div className='container relative top-0 left-0'>
      <Sidebar />
      <Nav />
      <div className="inner-container translate-y-[150px] rounded-md p-5 bg-white mx-auto w-[95vw] md:w-[90vw] h-[100%]">
        {props.children}
      </div>
      <Foot />
      <Footer />
    </div>
  )
}

export default AdminLayout

export const getServerSideProps = async(context:any) =>{
  let wearableJwtCookie
  if (context.req.headers.cookie) {
    const cookies = context.req.headers.cookie.split(';').reduce((prev:any, current:any) => {
      const [name, value] = current.trim().split('=');
      prev[name] = value;
      return prev;
    }, {});
    wearableJwtCookie = cookies['wearable-jwt'];
    return {
      props:{
        jwt:wearableJwtCookie ? wearableJwtCookie : null
      }
    }
  }
}