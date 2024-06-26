import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import Hero from '@/app/components/global/hero.component';
import Search from '@/app/components/global/search.component';
import Product from '@/app/components/global/product.component';
import Layout from '../layout';
import { useSelector } from "react-redux";
import { State } from "@/app/controller/reducers/root.reducer";
import React from "react";

const Page:React.FC<{jwt:string}> = ({jwt}) => {

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
    <Layout jwt={jwt}>
      <div className="products">
        <Hero 
          img="/assets/about.jpg"
          title="Explore Our Cutting-Edge Products"
          paragraph="Discover a range of innovative products designed to enhance your lifestyle and redefine the way you interact with technology"
          />
        <Search  title="Products"/>
        {products?.length > 0 &&
          <React.Fragment>
            <div className="products-items xl:px-10 flex justify-center items-start flex-wrap">
            {products?.map((p:any) => <Product key={`product-key-${p?.sync_product?.id}`} product={p} />)}
            </div>
        </React.Fragment>}
      </div>
    </Layout>
    )     

  }
  
  export default Page

  export const getServerSideProps = async(context:any) =>{
    let wearableJwtCookie
    if (context.req.headers.cookie) {
      const cookies = context.req.headers.cookie.split(';').reduce((prev:any, current:any) => {
        const [name, value] = current.trim().split('=');
        prev[name] = value;
        return prev;
      }, {});
      wearableJwtCookie = cookies['wearable-jwt'];
      
    }
    return {
      props:{
        jwt:wearableJwtCookie ? wearableJwtCookie : null
      }
    }
  }