import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        const params = req.query
        if(!params['id']){
            const stores = await APIController.printfulGetBasicInformationAboutStores(params['locale'] as string)
            if(stores){
                res.status(200).json(stores)
            }else{
                res.status(500).json(null)
            }
        } 
        if(params['id']){
            const store = await APIController.printfulGetBasicInformationAboutStore(params['locale'] as string,Number(params['id']))
            if(store){
                res.status(200).json(store)
            }else{
                res.status(500).json(null)
            }
        }
    }
}
