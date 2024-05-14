import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const params = req.query
    if(req.method === 'GET'){
        const data = await APIController.printfulTaxRate(params['locale'] as string)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(500).json(null)
        }
    } 
}
