import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const { recipient } = req.body
    if(req.method === 'POST'){
        if(recipient){
            const data = await APIController.printfulCalculateTaxRate(recipient)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    } 
}
