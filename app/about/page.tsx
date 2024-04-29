import { AboutComponents } from "../components/about";
import { GlobalComponents } from "../components/global";
import Image from "next/image";

export default function Page() {
    return (
      <div className="about">
        <GlobalComponents.Hero 
          img="/assets/cat.jpg"
          title="Redefining Wearable Technology"
          paragraph="Experience our commitment to pioneering wearable technology and transforming the way you engage with the world around you"
        />
        <GlobalComponents.Title 
          isLeft={true}
          title="About Us"
        />
        <GlobalComponents.AboutFeature
          isLeft={true}
          img="/assets/about-1.png"
          title="Empowering Your Lifestyle"
          paragraph="At Wearable, our mission is simple: to empower individuals to embrace their unique lifestyles with confidence and convenience. We're dedicated to providing innovative wearable technology and stylish accessories that seamlessly integrate into your daily routine, enhancing both functionality and fashion."
        />
        <GlobalComponents.AboutFeature
          isLeft={false}
          img="/assets/about-3.png"
          title="Innovation and Quality First"
          paragraph="At Wearable, we prioritize innovation and quality in everything we do. From design to production, we're committed to pushing boundaries and delivering products that exceed expectations. With a focus on craftsmanship and attention to detail, we ensure that every item reflects our dedication to excellence."
        />
        <AboutComponents.Banner />
        <AboutComponents.Feature />
        <GlobalComponents.Foot />
      </div>
    )     
  }
  