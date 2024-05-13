import { NextApiRequest,NextApiResponse } from 'next'
import * as APIController from '@/app/APIController/printful'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const { file_url } = req.body
        const data = await APIController.printfulReturnAvailableColorsFromImageUrl(file_url)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(500).json(null)
        }
    } 
}
