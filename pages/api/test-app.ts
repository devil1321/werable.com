import { NextApiRequest,NextApiResponse } from 'next'
import client from '@/prisma/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const User = await client.usershop.findFirst({where:{
            // @ts-ignore
            email:'user10@gmail.com'
        }})
        if(User){
            // @ts-ignore
            bcrypt.compare('user10', User.password as string, async function(err, result) {
                if(result){
                    const token = jwt.sign(User,process.env.JWT_SECRET as string)
                    const disconnected = await client.$disconnect()
                    res.json({user:User,token:token})
                }else{
                    res.json({msg:'Password not match'})
                }
            });
        }else{
            res.json({msg:'User Not Exists'})
        }
    }
}