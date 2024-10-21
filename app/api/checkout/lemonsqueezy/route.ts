// app/api/create-checkout-session/route.ts
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import {
    getAuthenticatedUser,
    lemonSqueezySetup,
    type NewCheckout,
    type Checkout,
    createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";
import { auth } from "@/auth";

const apiKey = process.env.LMSQUEEZY_API_KEY || "";

lemonSqueezySetup({
    apiKey,
    onError: (error) => console.error("Error!", error),
});

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cid = session.user.id;
    const email = session.user.email;

    const storeId = process.env.LMSQUEEZY_STORE_ID || "";

    const newCheckout: NewCheckout = {
        checkoutOptions: {
            embed: true,
            media: true,
            logo: true,
        },
        checkoutData: {
            email: email,
            custom: {
                cid: session.user.id,
            },
        },
        expiresAt: null,
        preview: true,
    };

    const { statusCode, error, data } = await createCheckout(
        storeId,
        id,
        newCheckout,
    );

    if (error) {
        console.error("Error creating LemonSqueezy Checkout session:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }

    return NextResponse.json(
        { url: data?.data?.attributes?.url },
        { status: 200 },
    );
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } });
}
