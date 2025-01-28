import {useEffect, useState} from "react";

export const runtime = "edge";
import { auth, signIn, signOut } from "@/auth";
import { api } from "@/polar";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { createPayment } from "@/app/ui/payments/createPayment";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";

import { FaSignOutAlt } from "react-icons/fa";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug: id } = await params;
    const session = await auth();

    if (!session) {
        signIn("logto");
    }

    try {
        const result = await api.products.get({
            id,
        });

        return (
            <div>
            </div>
        );
    } catch (e) {
        return notFound();
    }
}