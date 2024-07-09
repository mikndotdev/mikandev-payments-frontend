// pages/api/create-checkout-session.js
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function handler(
    req: {
        method: string;
        body: {
            id: any;
            price: any;
            email: any;
            discord: any;
            name: any;
            success_url: any;
            cancel_url: any;
            cid: any;
        };
    },
    res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            json: {
                (arg0: { url?: string | null; error?: string }): void;
                new (): any;
            };
            end: { (arg0: string): void; new (): any };
        };
        setHeader: (arg0: string, arg1: string) => void;
    },
) {
    if (req.method === "POST") {
        const { cid, id, price, email, discord, name } = req.body;

        const success_url = `${process.env.HOST}/result?cid=${cid}`;
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
                metadata: {
                    discord,
                    email,
                    cid,
                    id,
                },
                customer_email: email,
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
