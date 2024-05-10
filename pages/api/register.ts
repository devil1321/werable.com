import { NextApiRequest,NextApiResponse } from 'next'
import client from '@/prisma/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as Interfaces from '@/app/controller/interfaces'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    
    // console.log(prisma)
    if(req.method === 'POST'){
        try {
            const { nickname, email, password_1, password_2,first_name,last_name, city, zip , phone } = req.body
                const User = await client.usershop.findFirst({where:{
                    // @ts-ignore
                    email:email
                }})
                if(!User){        
                    if(password_1 === password_2){
                        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS as string),(err:any,salt:any)=>{
                            bcrypt.hash(password_1 as string, salt, async function(err:any, hash:any) {
                                try{
                                    const User = await client.usershop.create({
                                        data:{
                                            nickname,
                                            email,
                                            password:hash,
                                            first_name,
                                            last_name,
                                            city,
                                            zip,
                                            phone
                                        }
                                    }) as Interfaces.User
                                    const token = jwt.sign({
                                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                        data: User
                                    }, process.env.JWT_SECRET as string);   
                                    const disconnected = await client.$disconnect()
                                    res.json({user:User,token:token})
                                }catch(err){
                                    console.log(err)
                                    console.log('User Not Created')
                                    res.json({msg:"User Not Created"})
                                }
                            });
                        })
                    }else{
                        console.log('Password Not Match')
                        res.json({msg:"Password Not Match"})
                    }
                } else{
                    res.json({msg:"User with that email exists. Please login"})
                }
            }
            catch(err){
                console.log(err)
                res.end()
            }
        }
}