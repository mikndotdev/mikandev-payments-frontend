// pages/api/create-checkout-session.js
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function handler(req: { method: string; body: { id: any; price: any; email: any; discord: any; name: any; success_url: any; cancel_url: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { url?: string | null; error?: string; }): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
    if (req.method === 'POST') {
        const { id, price, email, discord, name } = req.body;

        const success_url = `https://payments.mikandev.com/result?uid=${discord}&name=${name}&price=${price}`;
        const cancel_url = "https://payments.mikandev.com/?canceled=true";

        try {
            // Create a new Checkout Session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name,
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                customer_email: email,
                success_url: success_url,
                cancel_url: cancel_url,
            });

            // Return the Checkout Session URL
            res.status(200).json({ url: session.url });
        } catch (error) {
            console.error('Error creating Stripe Checkout session:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
