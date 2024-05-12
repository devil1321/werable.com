import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const { order_data } = req.body
        if(order_data){
            const data = await APIController.printfulEstimateOrderCost(order_data)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    } 
}
