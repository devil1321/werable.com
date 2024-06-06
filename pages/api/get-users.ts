import { NextApiRequest,NextApiResponse } from 'next'
import client from '@/prisma/prisma'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "GET"){
        const Users = await client.wearableUser.findMany()
        if(Users){
            res.status(200).json({users:Users})
        }else{
            res.status(500).json(null)
        }
    }
}