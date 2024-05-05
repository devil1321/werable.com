
import { NextApiRequest,NextApiResponse } from 'next'
import client from '@/prisma/prisma'
import * as Interfaces from '@/app/controller/interfaces'
import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'
import { IncomingForm } from 'formidable'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const user = req.body as Interfaces.User
        try{
            bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS as string),(err,salt)=>{
                bcrypt.hash(user.password as string, salt, async function(err, hash){ 
                    const User = await client.usershop.update({
                        where:{
                            id:user.id
                        },
                        data:{
                            nickname:user.nickname,
                            // @ts-ignore
                            email:user.email,
                            password:hash,
                            first_name:user.first_name,
                            last_name:user.last_name,
                            city:user.city,
                            zip:user.zip,
                            phone:user.phone
                        }
                    })
                    const disconnected = await client.$disconnect()
                    const uploadDir = path.join(process.cwd(), 'profiles');

                    // Create the directory if it doesn't exist
                    if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                    }   
                    
                        // const filePath = req.body.image
                        const imageData = req.body.image
                        if(imageData){
                            const savedPath = path.join(process.cwd(), 'profiles',`${user.id}.png`); 
                            const imageBuffer = Buffer.from(imageData, 'base64');
                            fs.writeFile(savedPath, imageBuffer, (err) => {
                                if (err) {
                                    console.error('Error saving image:', err);
                                    res.status(500).json({ msg: 'Error saving image' });
                                } else {
                                    const base64 = imageBuffer.toString('base64');
                                    res.json({ user: User, msg: 'Profile updated', image: `data:image/png;base64,${base64}` });
                                }
                            });
                        }else{
                            res.json({ user: User, msg: 'Profile updated'});
                        }
                });
            })
        }catch(err){
            console.log(err)
            res.json({ msg:"Profile Not Updated"})
        }
    }
}
