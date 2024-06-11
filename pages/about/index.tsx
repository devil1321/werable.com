import Image from "next/image";
import Hero from "@/app/components/global/hero.component";
import Title from "@/app/components/global/title.component";
import AboutFeature from "@/app/components/global/about-feature.component";
import Banner from "@/app/components/about/banner.component";
import Feature from "@/app/components/about/feature.component";
import Foot from "@/app/components/global/foot.component";
import Layout from "../layout";

const Page:React.FC<{jwt:string}> = ({jwt}) => {
    return (
    <Layout jwt={jwt}>
      <div className="about">
        <Hero 
          img="/assets/cat.jpg"
          title="Redefining Wearable Technology"
          paragraph="Experience our commitment to pioneering wearable technology and transforming the way you engage with the world around you"
        />
        <Title 
          isLeft={true}
          title="About Us"
        />
        <AboutFeature
          isLeft={true}
          img="/assets/about-1.png"
          title="Empowering Your Lifestyle"
          paragraph="At Wearable, our mission is simple: to empower individuals to embrace their unique lifestyles with confidence and convenience. We're dedicated to providing innovative wearable technology and stylish accessories that seamlessly integrate into your daily routine, enhancing both functionality and fashion."
        />
        <AboutFeature
          isLeft={false}
          img="/assets/about-3.png"
          title="Innovation and Quality First"
          paragraph="At Wearable, we prioritize innovation and quality in everything we do. From design to production, we're committed to pushing boundaries and delivering products that exceed expectations. With a focus on craftsmanship and attention to detail, we ensure that every item reflects our dedication to excellence."
          />
        <Banner />
        <Feature />
        <Foot />
      </div>
    </Layout>
    )     
  }
  


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