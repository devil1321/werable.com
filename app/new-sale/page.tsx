'use client'
import { GlobalComponents } from "../components/global";
import products from '@/public/assets/tmp/db/products.json'
import { HomeComponents } from "../components/home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

export default function Page() {

    const handleAnimate = () =>{
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.products-items .product',{ opacity:0,y:100 },{
        opacity:1,
        y:0,
        duration:0.5,
        stagger:0.2,
        scrollTrigger:{
          trigger:'.products-items',
          start:'-=200px',
          end:'-=200px'
        }
      })
    }

    useEffect(()=>{
      handleAnimate()
    },[])

    return (
      <div className="products">
        <GlobalComponents.Hero 
          img="/assets/about.jpg"
          title="Explore Our Cutting-Edge Products"
          paragraph="Discover a range of innovative products designed to enhance your lifestyle and redefine the way you interact with technology"
        />
        <GlobalComponents.Search title="New Sale"/>
        <div className="products-items xl:px-10 flex justify-center items-start flex-wrap">
          {products.map((p:any) => <GlobalComponents.Product product={p} />)}
        </div>
        <GlobalComponents.Title isLeft={false} title="Hot" />
        <HomeComponents.ProductCarousel />
      </div>
    )     
  }
  