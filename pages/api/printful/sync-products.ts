import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const params = req.query
    if(req.method === 'GET'){
        if(params['offset'] && params['limit']){
            const products = await APIController.printfulGetAllSyncProducts(params['locale'] as string,Number(params['offset']),Number(params['limit']))
            if(products){
                res.status(200).json(products)
            }else{
                res.status(500).json(null)
            }
        }
        if(params['category_id'] && params['status']){
            const products = await APIController.printfulGetSyncProducts(params['locale'] as string,params['category_id'] as string,params['status'] as string)
            if(products){
                res.status(200).json(products)
            }else{
                res.status(500).json(null)
            }
        }
        if(params['id']){
            const product = await APIController.printfulGetSyncProduct(params['locale'] as string,Number(params['id']))
            if(product){
                res.status(200).json(product)
            }else{
                res.status(500).json(null)
            }
        }
    }
    if(req.method === 'POST'){
        const { category_id, status, id } = req.body
        if(category_id && status){
            const products = await APIController.printfulGetSyncProducts(params['locale'] as string,category_id,status)
            if(products){
                res.status(200).json(products)
            }else{
                res.status(500).json(null)
            }
        }
        const { sync_product,sync_variants } = req.body
        if(sync_product && sync_variants){
            const data = await APIController.printfulCreateSyncProduct(sync_product,sync_variants)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
        if(id){
            const data = await APIController.printfulDeleteSyncProduct(id)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
            
        }
    } 
    if(req.method === 'PUT'){
        const { sync_product,sync_variants,id } = req.body
        if(sync_product && sync_variants){
            const data = await APIController.printfulModifySyncProduct(id,sync_product,sync_variants)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }      
}
