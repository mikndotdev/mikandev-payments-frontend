import type { NextApiRequest, NextApiResponse } from "next";

const skus = [
    {
        id: "donate-1",
        price: "1",
        name: "Donate $1",
        processor: "stripe",
    },
    {
        id: "donate-5",
        price: "5",
        name: "Donate $5",
        processor: "stripe",
    },
    {
        id: "donate-10",
        price: "10",
        name: "Donate $10",
        processor: "stripe",
    },
    {
        id: "donate-25",
        price: "25",
        name: "Donate $25",
        processor: "stripe",
    },
    {
        id: "donate-50",
        price: "50",
        name: "Donate $50",
        processor: "stripe",
    },
    {
        id: "donate-100",
        price: "100",
        name: "Donate $100",
        processor: "stripe",
    },
    {
        id: "donate-500",
        price: "500",
        name: "Donate $500",
        processor: "stripe",
    },
    {
        id: "donate-1000",
        price: "1000",
        name: "Donate $1000",
        processor: "stripe",
    },
    {
        id: "mikanbot-premium-1m",
        processor: "lemonsqueezy",
        lmid: "542220",
        loginRequired: true,
    },
    {
        id: "mikanbot-premium-1y",
        processor: "lemonsqueezy",
        lmid: "542401",
        loginRequired: true,
    },
    {
        id: "sksh-pro-lite",
        processor: "lemonsqueezy",
        lmid: "542402",
        loginRequired: true,
    },
    {
        id: "sksh-pro-std",
        processor: "lemonsqueezy",
        lmid: "542413",
        loginRequired: true,
    },
    {
        id: "sksh-pro-ult",
        processor: "lemonsqueezy",
        lmid: "542416",
        loginRequired: true,
    },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const sku = skus.find((sku) => sku.id === id);

    if (!sku) {
        return res.status(404).json({ error: "SKU not found" });
    }

    res.status(200).json(sku);
}
