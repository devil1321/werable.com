import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        const params = req.query
        if(params['id']){
            const variant = await APIController.printfulGetSyncVariant(params['locale'] as string,Number(params['id']))
            if(variant){
                res.status(200).json(variant)
            }else{
                res.status(500).json(null)
                
            }
        }
    } 
    if(req.method === "DELETE"){
        const params = req.query
        if(params['id']){
            const data = await APIController.printfulDeleteSyncVariant(Number(params['id']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
    if(req.method === "PUT"){
        const { id ,query } = req.body
        if(id){
            const data = await APIController.printfulModifySyncVariant(id,{ ...query })
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
    if(req.method === "POST"){
        const { id,query } = req.body
        if(id){
            const data = await APIController.printfulCreateNewSyncVariant(id,{ ...query })
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
}
