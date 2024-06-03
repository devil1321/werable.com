import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const params = req.query
    if(req.method === 'GET'){
        if(params['offset'] && params['limit'] && params['status']){
            const data = await APIController.printfulGetListOfOrders(params['locale'] as string,Number(params['offset']),Number(params['limit']),String(params['status']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
        if(params['id']){
            const data = await APIController.printfulGetOrderData(params['locale'] as string,Number(params['id']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    } 
    if(req.method === "POST"){
        const { confirm,update_existing,query } = req.body
        if(confirm && update_existing && query){
            const data = await APIController.printfulCreateNewOrder(confirm,update_existing,query)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
    if(req.method === "DELETE"){
        if(params['id']){
            const data = await APIController.printfulCancelAnOrder(Number(params['id']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
    if(req.method === 'PUT'){
        const { query } = req.body
        if(params['id'] && params['confirm'] && query){
            const data = await APIController.printfulUpdateOrderData(Number(params['id']),Boolean(params['confirm']),query)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
    if(req.method === 'GET'){
        const data = await APIController.printfulGetAllOrders()
        if(data){
            res.status(200).json(data)
        }else{
            res.status(500).json(null)
        }
    }
}
