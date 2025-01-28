"use server";
import { api } from "@/polar";

export async function createPayment(id: string, email: string) {
    const res = await api.checkouts.custom.create({
        productId: id,
        embedOrigin: process.env.NEXTAUTH_URL,
        customerEmail: email,
    });

    return res.url;
}
