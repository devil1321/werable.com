
import { NextApiRequest,NextApiResponse } from 'next'
import client from '@/prisma/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie';


export default async function handler(req:NextApiRequest,res:NextApiResponse){

    if(req.method === 'POST'){
        const { email , password } = req.body
        const User = await client.wearableUser.findFirst({where:{
            // @ts-ignore
            email:email
        }})
        if(User){
            // @ts-ignore
            bcrypt.compare(password, User.password as string, async function(err, result) {
                if(result){
                    const token = jwt.sign(User,process.env.JWT_SECRET as string)
                    const disconnected = await client.$disconnect()
                    const cookieValue = `wearable-jwt=${token}; Path=/; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}; Secure`;
                    res.setHeader('Set-Cookie', cookieValue);
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
