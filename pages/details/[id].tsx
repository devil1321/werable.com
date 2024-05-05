import products from '@/public/assets/tmp/db/products.json'
import Image from 'next/image'
import Title from '@/app/components/global/title.component'
import ProductCarousel from '@/app/components/home/product-carousel'
import Layout from '../layout'

const Details:React.FC<{ product:any }> = ({product}) => {
    return ( 
    <Layout>
      <div className='details pt-[200px]'>
        <div className="details-main flex justify-between items-center">
          <Image className ="md:w-1/2" src={product.img} width={1920} height={768} alt='product-image' />
          <div className="details-info p-5 md:w-1/2">
            <h2 className="text-5xl font-bold rounded-lg bg-white p-2">{product.title}</h2>
            <div className="flex justify-between items-center gap-5 my-3">
              <div className="w-1/2 p-2 text-center bg-white rounded-full font-bold">{product.price}$</div>
              <div className="w-1/2 p-2 text-center bg-white rounded-full font-bold line-through">{product.prevPrice}$</div>
            </div>
            <div className="flex justify-between items-center gap-5 my-3">
              <div className="w-1/3 text-center p-2 hover:bg-gray-200 cursor-pointer bg-white rounded-full">-</div>
              <div className="w-1/3 text-center p-2 hover:bg-gray-200 cursor-pointer bg-white rounded-full">1</div>
              <div className="w-1/3 text-center p-2 hover:bg-gray-200 cursor-pointer bg-white rounded-full">+</div>
            </div>
            <h2 className="text-sm rounded-lg bg-white p-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, provident iste nobis consequatur numquam eveniet? Earum accusantium nulla ut dolores hic provident molestias numquam corrupti?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam neque eos vitae numquam ex qui temporibus in exercitationem praesentium molestias animi maiores hic, autem vero!</h2>
            <button className="block w-[100%] rounded-full py-2 mt-5 font-bold text-white hover:opacity-70">Add To Cart</button>
          </div>
        </div>
        <Title 
          isLeft={true}
          title="Hot"
          />
        <ProductCarousel />
      </div>
    </Layout>
    )     
  }

  export function getStaticProps({params}:any){
    const product = products.find((p:any) => p.id === Number(params.id)) as any
    return {
      props:{
        product
      }
    }
  }
  
  export default Details

  export async function getStaticPaths(){
    try{
        const paths = products.map(({ id }:{ id:number }) => ({ params:{ id:id.toString() }}))
        return { paths ,fallback:false }
    }
    catch(err){
        console.log(err)
        return { paths:[] ,fallback:false }
    }
}