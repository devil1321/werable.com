'use client'
import { GlobalComponents } from "../components/global";
import products from '@/public/assets/tmp/db/products.json'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

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
        <GlobalComponents.Hero 
          img="/assets/banner-people.jpg"
          title="Your Favorites Await"
          paragraph="Explore our curated selection of top-rated products, handpicked to suit your style and needs"
        />
        <GlobalComponents.Search title="Favoruites" />
        {products.map((p:any)=><GlobalComponents.Item key={`item-key-fav-${p.id}`} product={p} />)}
        <GlobalComponents.Foot />
      </div>
    )     
  }
  