import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const { query } = req.body
        const data = await APIController.printfulShippingRateAPI(query)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(500).json(null)
        }
    } 
}
