import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const params = req.query
    if(req.method === 'GET'){
        if(params['search'] && params['offset'] && params['limit'] && params['status']){
            const data = await APIController.printfulGetListOfSyncProductsEcommerce(params['locale'] as string,params)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
        if(params['id']){
            const data = await APIController.printfulGetListOfSyncProductEcommerce(params['locale'] as string,Number(params['id']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    } 
    if(req.method === "DELETE"){
        if(params['id']){
            const data = await APIController.printfulDeleteListOfSyncProductEcommerce(Number(params['id']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
}
