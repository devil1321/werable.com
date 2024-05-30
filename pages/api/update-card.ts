
import { NextApiRequest,NextApiResponse } from 'next'
import client from '@/prisma/prisma'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const { user_id,card_number,card_exp_month,card_exp_year,card_cvc,card_owner_name } = req.body
        const Card = await client.card.findFirst({
            where:{
                user_id:user_id
            }
        })
        if(Card){
            const UpdatedCard = await client.card.update({
                where:{
                    id:Card.id
                },
                data:{
                    card_owner_name:card_owner_name,
                    card_number:card_number,
                    card_exp_month:card_exp_month,
                    card_exp_year:card_exp_year,
                    card_cvc:card_cvc
                }
            })
            if(UpdatedCard){
                res.status(200).json({...UpdatedCard})
            }else{
                res.status(500).json(null)
            }
        }else{
            const CreatedCard = await client.card.create({
                data:{
                    user_id:user_id,
                    card_owner_name:card_owner_name,
                    card_number:card_number,
                    card_exp_month:card_exp_month,
                    card_exp_year:card_exp_year,
                    card_cvc:card_cvc
                }
            })
            if(CreatedCard){
                res.status(200).json({...CreatedCard})
            }else{
                res.status(500).json(null)
            }
        }
    }
}
