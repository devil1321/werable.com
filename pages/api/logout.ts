import { NextApiRequest,NextApiResponse } from "next";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        res.setHeader('Set-Cookie', 'wearable-jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;');
        res.json({msg:'You`re logged out'})
    }
}