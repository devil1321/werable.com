import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        const params = req.query
        if(params['id']){
            const sizes = await APIController.printfulGetSizes(Number(params['id']),params['unit'] as string)
            if(sizes){
                res.status(200).json(sizes)
            }else{
                res.status(500).json(null)
            }
        }
    } 
}
