import { NextApiRequest,NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import * as Interfaces from '@/app/controller/interfaces'
import path from 'path'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
       let user = null
       let token = req.headers.authorization as any
       if(/Bearer/gi.test(token)){
        if(!Boolean(/Bearer undefined/gi.test(token))){
            token = token?.slice(7,token.length)
        }else{
            token = undefined
        }
       }
       if(token){
           user = jwt.verify(token as string,process.env.JWT_SECRET as string) as Interfaces.User
       }
       if(user?.id){
           try{
            const filePath = path.join(process.cwd(), 'profiles',`${user.id}.png`); 
            const image = fs.readFileSync(filePath)
            const base64Image = Buffer.from(image).toString('base64');
            res.json({ user:user,image:`data:image/png;base64,${base64Image}`})
           }catch(err){
            console.log(err)
            res.json({user:user,image:''})
           }
       }else{
           res.json({user:null})
       }
    }
}