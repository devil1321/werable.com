import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        const params = req.query
        if(params['category_id']){
            const products = await APIController.printfulGetProducts(params['locale'] as string,params['category_id'] as string)
            if(products){
                res.status(200).json(products)
            }else{
                res.status(500).json(null)
            }
        }
        if(params['id']){
            const product = await APIController.printfulGetProduct(params['locale'] as string,Number(params['id']))
            if(product){
                res.status(200).json(product)
            }else{
                res.status(500).json(null)
            }
        }
    } 
}
