import { GlobalComponents } from "../components/global";
import { HomeComponents } from "../components/home";
import products from "@/public/assets/tmp/db/products.json"

export default function Page() {
    return (
      <div className="home">
        <HomeComponents.Carousel />
        <HomeComponents.Categories />
        <GlobalComponents.Title isLeft={true} title="Discover Style" />
        <GlobalComponents.AboutFeature
          isLeft={true} 
          img="/assets/about-1.png"
          title="Track Your Progress Efficiently"
          paragraph="Keep up with your fitness goals effortlessly with our Smart Fitness Tracker. Engineered with advanced sensors, it provides real-time data on your heart rate, steps, calories, and more. Stay motivated and informed throughout your workouts and daily activities."
        />
        <GlobalComponents.AboutFeature
          isLeft={false} 
          img="/assets/about-2.png"
          title="Style Meets Functionality"
          paragraph="Elevate your look with our Fashionable Smartwatch. Crafted with premium materials and a stunning display, it adds sophistication to any outfit. Stay connected, track your activities, and express your style with customizable features."
        />
        <div className="product-carousel flex justify-center items-center">
          {products.slice(0,3).map((p:any)=><GlobalComponents.Product product={p} />)}
        </div>
      </div>
    )     
  }
  