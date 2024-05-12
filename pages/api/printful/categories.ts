import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        const params = req.query
        if(params['id']){
            const category = await APIController.printfulGetCategory(Number(params['id']))
            if(category){
                res.status(200).json(category)
            }else{
                res.status(500).json(null)
            }
        }else{
            const categories = await APIController.printfulGetCategories()
            if(categories){
                res.status(200).json(categories)
            }else{
                res.status(500).json(null)
            }
        }
    } 
}
