import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        const params = req.query
        const variant = await APIController.printfulGetVariant(params['locale'] as string,Number(params['id']))
        if(variant){
            res.status(200).json(variant)
        }else{
            res.status(500).json(null)
        }
    } 
}
