import { NextApiRequest,NextApiResponse } from 'next'
import Stripe from 'stripe';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        try{
            const { total,currency,description } = req.body
            if(description && total && description){
                // @ts-ignore
                const stripe = new Stripe(process.env.STRIPE as string,{
                    // @ts-ignore
                    apiVersion: '2023-10-16'
                });
                const totalStripe = Math.round(total * 100).toFixed(0)
                const paymentLink = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [{
                        price_data: {
                            currency: currency,
                            unit_amount: parseInt(totalStripe),
                            product_data: {
                                name: description,
                            },
                        },
                        quantity: 1,
                    }],
                    mode: 'payment',
                    success_url: 'https://localhost:3000/products',
                    cancel_url: 'https://localhost:3000/payment-error',
                });
                res.json({paymentLink:paymentLink.url})   
            }else{
                res.json({paymentLink:''})
            }
        } catch (error) {
            console.error('Error generating payment link:', error);
            throw error;
        }
    }
}