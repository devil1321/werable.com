import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        const params = req.query
        if(params['offset'] && params['limit']){
            const data = await APIController.printfulGetProductsTemplateList(Number(params['offset']),Number(params['limit']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
        if(params['id']){
            const data = await APIController.printfulGetProductTemplate(Number(params['id']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    } 
    if(req.method === "POST"){
        const { id } = req.body
        if(id){
            const data = await APIController.printfulDeleteProductTemplate(id)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
}
