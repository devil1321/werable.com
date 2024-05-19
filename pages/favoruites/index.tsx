import products from '@/public/assets/tmp/db/products.json'
import gsap from 'gsap'
import ScrollTrigger  from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import Hero from "@/app/components/global/hero.component";
import Search from "@/app/components/global/search.component";
import Item from "@/app/components/global/item.component";
import Foot from "@/app/components/global/foot.component";

export default function Page() {

    const handleAnimate = () =>{
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.item',{ opacity:0,y:200 },{ opacity:1,y:0,duration:1,stagger:0.2,scrollTrigger:{
        trigger:".item",
        start:'-=300px',
        end:'-=300px'
      }})
    }

    useEffect(()=>{
      handleAnimate()
    },[])

    return (
      <div className="favoruites">
        <Hero 
          img="/assets/banner-people.jpg"
          title="Your Favorites Await"
          paragraph="Explore our curated selection of top-rated products, handpicked to suit your style and needs"
        />
        <Search title="Favoruites" />
        {products.map((p:any)=><Item key={`item-key-fav-${p.id}`} product={p} />)}
        <Foot />
      </div>
    )     
  }
  