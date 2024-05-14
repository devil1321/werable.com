import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        const params = req.query
        const data = await APIController.printfulGetCountries(params['locale'] as string)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(500).json(null)
        }
    } 
}
