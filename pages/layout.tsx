import Foot from '@/app/components/global/foot.component'
import Footer from '@/app/components/global/footer.component'
import Nav from '@/app/components/global/nav.component'
import React from 'react'

const Layout:React.FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <div className='container'>
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
