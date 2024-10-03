// pages/api/create-checkout-session.js
import type { NextApiRequest, NextApiResponse } from "next";
import {
    getAuthenticatedUser,
    lemonSqueezySetup,
    type NewCheckout,
    type Checkout,
    createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";

// Initialize Stripe with your secret key
const apiKey = process.env.LMSQUEEZY_API_KEY || "";

lemonSqueezySetup({
    apiKey,
    onError: (error) => console.error("Error!", error),
});

export default async function handler(
    req: { method: string; body: { cid: string; id: string; email: string } },
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        const { id, email, cid } = req.body;

        console.log (cid, id, email);

        const success_url = `${process.env.HOST}/result?cid=${cid}`;

        const storeId = process.env.LMSQUEEZY_STORE_ID || "";

        const newCheckout: NewCheckout = {
            checkoutOptions: {
                embed: true,
                media: true,
                logo: true,
            },
            checkoutData: {
                email: email,
            },
            expiresAt: null,
            preview: true,
        };

        const { statusCode, error, data } = await createCheckout(storeId, id, newCheckout);
        
        if (statusCode === 200) {
            console.error(
                "Error creating LemonSqueezy Checkout session:",
                error,
            );
            res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(200).json({ url: data?.data?.attributes?.url });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
