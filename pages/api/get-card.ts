
import { NextApiRequest,NextApiResponse } from 'next'
import client from '@/prisma/prisma'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const { user_id } = req.body
        const Card = await client.card.findFirst({
            where:{
                user_id:user_id
            }
        })
        if(Card){
            res.status(200).json({...Card})
        }else{
            res.status(500).json(null)
        }
    }
}
