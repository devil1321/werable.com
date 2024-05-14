import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const params = req.query
    if(req.method === 'GET'){
        if(params['id']){
            const data = await APIController.printfulGetSyncVariantEcommerce(params['locale'] as string,Number(params['id']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    } 
    if(req.method === 'PUT'){
        const { query } = req.body
        if(params['id']){
            const data = await APIController.printfulModifySyncVariantEcommerce(Number(params['id']),query)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
    if(req.method === "DELETE"){
        if(params['id']){
            const data = await APIController.printfulDeleteSyncVariantEcommerce(Number(params['id']))
        if(data){
            res.status(200).json(data)
        }else{
            res.status(500).json(null)
        }
        }
    }
    
}
