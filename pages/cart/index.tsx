import { GlobalComponents } from "../../app/components/global";
import products from '@/public/assets/tmp/db/products.json'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import { CartComponents } from "../../app/components/cart";

export default function Page() {

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
      <div className="cart">
        <GlobalComponents.Hero 
          img="/assets/clothes.jpg"
          title="Your Favorites Await"
          paragraph="Explore our curated selection of top-rated products, handpicked to suit your style and needs"
        />
        <GlobalComponents.Search title="Favoruites" />
        {products.map((p:any)=><GlobalComponents.Item key={`item-key-${p.id}`} product={p} />)}  
        <CartComponents.Summary />
        <GlobalComponents.Foot />
      </div>
    )     
  }
  