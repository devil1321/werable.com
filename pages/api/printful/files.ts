import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const { query } = req.body
        const data = await APIController.printfulAddANewFile(query)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(500).json(null)
        }
    } 
    if(req.method === 'GET'){
        const params = req.query
        if(params['id']){
            const data = await APIController.printfulGetFile(Number(params['id']))
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).json(null)
            }
        }
    }
}
