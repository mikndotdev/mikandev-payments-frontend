// pages/api/create-checkout-session.js
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {});

const sendDiscordMessage = async (
    discordID: string,
    prodName: string,
    quantity: number,
    price: number,
) => {
    await fetch(
        `http://${process.env.BOT_BACKEND}/dm?key=${process.env.BOT_API_SIGNING_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: discordID,
                provider: "MikanDev Payments",
                message: `You have successfully purchased ${quantity}x ${prodName} for $${price}. Thank you for your support!`,
            }),
        },
    );
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const authID = process.env.LOGTO_M2M_ID;
    const authSecret = process.env.LOGTO_M2M_SECRET;

    if (req.method === "POST") {
        const body = req.body;
        const cid = body.cid;
        const BasicAuth = Buffer.from(`${authID}:${authSecret}`).toString(
            "base64",
        );

        const LogtoResponse = await fetch(
            "https://auth.mikandev.com/oidc/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${BasicAuth}`,
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    scope: "all",
                    resource: "https://default.logto.app/api",
                }),
            },
        );
        const data = await LogtoResponse.json();
        console.log(data);
        const token = data.access_token;

        const userData = await fetch(
            `https://auth.mikandev.com/api/users/${cid}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        const user = await userData.json();

        console.log(user);

        const discordID = user.identities?.discord?.userId || null;
        const email = user.primaryEmail;

        console.log(discordID, email);

        const session = await stripe.checkout.sessions.list({
            customer_details: {
                email: email,
            },
            limit: 1,
        });

        const status = session.data[0].payment_status as string;
        const metadata = session.data[0].metadata;
        const id = session.data[0].id;
        const afterExpiration = session.data[0].after_expiration;
        const price = session.data[0].amount_total;
        const priceInBucks = price !== null ? price / 100 : null;

        const lineItems = await stripe.checkout.sessions.listLineItems(id);

        const prodName = lineItems.data[0].description;
        const quantity = lineItems.data[0].quantity;

        console.log(
            status,
            metadata,
            id,
            afterExpiration,
            priceInBucks,
            prodName,
            quantity,
        );

        if (status !== "paid") {
            return res.status(400).json({ message: "IncompletePayment" });
        }

        if (afterExpiration) {
            return res.status(400).json({ message: "Expired" });
        }
        if (discordID !== null) {
            sendDiscordMessage(
                discordID,
                prodName,
                quantity || 0,
                priceInBucks || 0,
            );
        }
        return res.status(200).json({ prodName, quantity, priceInBucks, id });
    }
}
