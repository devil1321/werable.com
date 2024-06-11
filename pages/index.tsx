import Carousel from "@/app/components/home/carousel/carousel.component"
import Categories from "@/app/components/home/categories.component"
import Title from "@/app/components/global/title.component"
import AboutFeature from "@/app/components/global/about-feature.component"
import ProductCarousel from "@/app/components/home/product-carousel"
import Layout from "./layout"
import React from "react"
import { useSelector } from "react-redux"
import { State } from "@/app/controller/reducers/root.reducer"

const Page:React.FC<{jwt:string}> = ({jwt}) => {

    const { products } = useSelector((state:State) => state.api)

    return (
    <Layout jwt={jwt}>
      <div className="home">
        <Carousel />
        <Categories />
        <Title isLeft={true} title="Discover Style" className="-mt-[1200px] lg:mt-12" />
        <AboutFeature
          isLeft={true} 
          img="/assets/about-1.png"
          title="Track Your Progress Efficiently"
          paragraph="Keep up with your fitness goals effortlessly with our Smart Fitness Tracker. Engineered with advanced sensors, it provides real-time data on your heart rate, steps, calories, and more. Stay motivated and informed throughout your workouts and daily activities."
        />
        <AboutFeature
          isLeft={false} 
          img="/assets/about-2.png"
          title="Style Meets Functionality"
          paragraph="Elevate your look with our Fashionable Smartwatch. Crafted with premium materials and a stunning display, it adds sophistication to any outfit. Stay connected, track your activities, and express your style with customizable features."
        />
        {products?.length > 0 &&
        <React.Fragment>
          <Title isLeft={false} title="Hot"/>
          <ProductCarousel />
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

  