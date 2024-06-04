import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import Hero from '@/app/components/global/hero.component';
import Search from '@/app/components/global/search.component';
import Title from '@/app/components/global/title.component';
import ProductCarousel from '@/app/components/home/product-carousel';
import Product from '@/app/components/global/product.component';
import Layout from '../layout';
import { useSelector } from "react-redux";
import { State } from "@/app/controller/reducers/root.reducer";

export default function Page() {

    const { products } = useSelector((state:State) => state.api)

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
    <Layout>
      <div className="products">
        <Hero 
          img="/assets/about.jpg"
          title="Explore Our Cutting-Edge Products"
          paragraph="Discover a range of innovative products designed to enhance your lifestyle and redefine the way you interact with technology"
          />
        <Search  title="Products"/>
        <div className="products-items xl:px-10 flex justify-center items-start flex-wrap">
          {products?.result?.map((p:any) => <Product key={`product-key-${p.id}`} product={p} />)}
        </div>
        <Title isLeft={false} title="Hot" />
        <ProductCarousel />
      </div>
    </Layout>
    )     
  }
  