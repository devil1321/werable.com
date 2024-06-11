import products from '@/public/assets/tmp/db/products.json'
import gsap from 'gsap'
import ScrollTrigger  from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import Hero from "@/app/components/global/hero.component";
import Search from "@/app/components/global/search.component";
import Item from "@/app/components/global/item.component";
import Foot from "@/app/components/global/foot.component";
import { useSelector } from 'react-redux';
import { State } from '@/app/controller/reducers/root.reducer';
import Layout from '../layout';

const Page:React.FC<{jwt:string}> = ({jwt}) => {

    const { favoruites } = useSelector((state:State) => state.shop)

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
    <Layout jwt={jwt}>
      <div className="favoruites">
        <Hero 
          img="/assets/banner-people.jpg"
          title="Your Favorites Await"
          paragraph="Explore our curated selection of top-rated products, handpicked to suit your style and needs"
        />
        <Search title="Favoruites" />
        {favoruites?.length > 0
          ? favoruites.map((id:number)=><Item key={`item-key-fav-${id}`} id={id} />)
          : <button className='block rounded-md mx-auto  px-6 py-2 font-bold text-white text-5xl'>Nothing In Favoruites</button>}
        <Foot />
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