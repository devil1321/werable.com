import products from '@/public/assets/tmp/db/products.json'
import gsap from 'gsap'
import ScrollTrigger  from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import Search from '@/app/components/global/search.component';
import Hero from '@/app/components/global/hero.component';
import Summary from '@/app/components/cart/summary.component';
import Item from '@/app/components/global/item.component';
import { useSelector } from 'react-redux';
import { State } from '@/app/controller/reducers/root.reducer';
import Layout from '../layout';

export default function Page() {

    const { cart } = useSelector((state:State) => state.shop)

    const handleDetails = () =>{
      const heading = document.querySelector('h1') as HTMLHeadingElement
      const paragraph = document.querySelector('p') as HTMLParagraphElement
      heading.style.color = 'red'
      paragraph.style.color = 'red'
    }

    const handleAnimate = () =>{
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.item',{ opacity:0,y:200 },{ opacity:1,y:0,duration:1,stagger:0.2,scrollTrigger:{
        trigger:".item",
        start:'-=300px',
        end:'-=300px'
      }})
    }

    useEffect(()=>{
      handleDetails()
      handleAnimate()
    },[])

    return (
    <Layout>
      <div className="cart">
        <Hero 
          img="/assets/clothes.jpg"
          title="Your Favorites Await"
          paragraph="Explore our curated selection of top-rated products, handpicked to suit your style and needs"
        />
        <Search title="Favoruites" />
        {cart?.length > 0
         ? cart.map((p:any)=><Item key={`item-key-${p.id}`} product={p} />)
         : <button className='block rounded-md mx-auto my-12  px-6 py-2 font-bold text-white text-5xl'>Nothing In Cart</button>}
        <Summary />
      </div>
    </Layout>
    )     
  }
  