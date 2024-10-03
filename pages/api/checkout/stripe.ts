// pages/api/create-checkout-session.js
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { email, name, price } = req.body;

        const success_url = `${process.env.HOST}/donate-thankyou`;
        const cancel_url = `${process.env.HOST}/?canceled=true`;

        try {
            // Create a new Checkout Session
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name,
                            },
                            unit_amount: price * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                customer_creation: "always",
                customer_email: email || undefined,
                success_url: success_url,
                cancel_url: cancel_url,
            });

            // Return the Checkout Session URL
            res.status(200).json({ url: session.url });
        } catch (error) {
            console.error("Error creating Stripe Checkout session:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}