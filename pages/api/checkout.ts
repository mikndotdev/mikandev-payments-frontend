// pages/api/create-checkout-session.js
import { NextApiRequest, NextApiResponse } from "next";

// Initialize Stripe with your secret key
const apiKey = process.env.LMSQUEEZY_API_KEY || "";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function handler(
    req: {
        method: string;
        body: {
            id: any;
            price: any;
            email: any;
            name: any;
            success_url: any;
            cancel_url: any;
            cid: any;
            loginRequired: any;
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
        const { cid, id, price, email, name } = req.body;

        const success_url = `${process.env.HOST}/result?cid=${cid}`;
        const cancel_url = `${process.env.HOST}/?canceled=true`;

        try {
            // Create a new Checkout Session using fetch
            const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
                method: "POST",
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    data: {
                        type: "checkouts",
                        attributes: {
                            product_options: {
                                redirect_url: success_url,
                            },
                            checkout_data: {
                                email: email,
                            },
                        },
                        relationships: {
                            store: {
                                data: {
                                    type: "stores",
                                    id: "115402"
                                }
                            },
                            variant: {
                                data: {
                                    type: "variants",
                                    id: id
                                }
                            }
                        }
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const session = await response.json();
            res.status(200).json({ url: session.data?.attributes?.url });
        } catch (error) {
            console.error("Error creating LemonSqueezy Checkout session:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
