// app/api/skus/route.ts
export const runtime = "edge";
import { NextRequest, NextResponse } from "next/server";

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
        lmid: "519976",
        loginRequired: true,
    },
    {
        id: "mikanbot-premium-1y",
        processor: "lemonsqueezy",
        lmid: "519977",
        loginRequired: true,
    },
    {
        id: "sksh-pro-lite",
        processor: "lemonsqueezy",
        lmid: "542478",
        loginRequired: true,
    },
    {
        id: "sksh-pro-std",
        processor: "lemonsqueezy",
        lmid: "542479",
        loginRequired: true,
    },
    {
        id: "sksh-pro-ult",
        processor: "lemonsqueezy",
        lmid: "542480",
        loginRequired: true,
    },
];

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const sku = skus.find((sku) => sku.id === id);

    if (!sku) {
        return NextResponse.json({ error: "SKU not found" }, { status: 404 });
    }

    return NextResponse.json(sku, { status: 200 });
}