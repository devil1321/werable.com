import { NextApiRequest,NextApiResponse } from 'next'
import client from '@/prisma/prisma'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
        const { id } = req.body
        const User = await client.wearableUser.delete({
            where:{
                id:id
            }
        })
        if(User){
            const disconnected = await client.$disconnect()
            res.status(200).json({user:User})
        }else{
            const disconnected = await client.$disconnect()
            res.status(500).json(null)
        }
    }
}