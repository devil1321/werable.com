import React from 'react'
import Nav from '@/app/components/orders/nav.component'
import Item from '@/app/components/orders/item.component'
import { useSelector } from 'react-redux'
import { State } from '@/app/controller/reducers/root.reducer'
import Layout from '../layout'
import Hero from '@/app/components/global/hero.component'

const Page = () => {

  const { orders } = useSelector((state:State) => state.api)

  return (
    <Layout>
      <div className="orders">
        <Hero 
          img='/assets/people.jpg'
          title='Manage Your Orders with Ease'
          paragraph='Stay updated on your wearable fashion purchases with our user-friendly orders page, designed to help you track, manage, and review your orders effortlessly'
        />
        <Nav />
        {Array.from(Array(10).keys()).map((o:any) => <Item key={`order-key-${o}`} order={o} />)}
      </div>
    </Layout>
  )
}

export default Page
