"use server";
import { api } from "@/polar";
import { auth } from "@/auth";

export async function createPayment(id: string, email: string) {
    const session = await auth();
    const res = await api.checkouts.custom.create({
        productId: id,
        embedOrigin: process.env.NEXTAUTH_URL,
        customerEmail: email,
        metadata: {
            userId: session?.user?.id || "",
        }
    });

    return res.url;
}
