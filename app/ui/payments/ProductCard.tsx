"use client";
import { useSession, signIn } from "next-auth/react";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";
import type { Product } from "@polar-sh/sdk/models/components/product";
import { createPayment } from "./createPayment";
import { useMemo, useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const firstPrice = product.prices[0];
    const subsc = product.isRecurring;
    const { status, data } = useSession();
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleBuy = async (id: string) => {
        if (status !== "authenticated") {
            return toast.error("You need to be signed in to buy this product", {
                action: { label: "Sign in", onClick: () => signIn("logto") },
            });
        }
        setLoading(true);
        const url = await createPayment(id, data?.user?.email || "");
        setPaymentUrl(url);
        setLoading(false);
    };

    useEffect(() => {
        if (paymentUrl) {
            PolarEmbedCheckout.create(paymentUrl);
        }
    }, [paymentUrl]);

    const price = useMemo(() => {
        switch (firstPrice.amountType) {
            case "fixed":
                return `$${firstPrice.priceAmount / 100}`;
            case "free":
                return "Free";
            default:
                return "Pay what you want";
        }
    }, [firstPrice]);

    return (
        <div className="card bg-surface bg-opacity-10 text-on-surface shadow min-h-96 w-2/5">
            <div className="flex flex-col items-center justify-between">
                <h1 className="text-3xl text-white mt-5">{product.name}</h1>
                <p className="text-neutral-400 text-sm mt-3">
                    {product.description}
                </p>
                <img
                    src={product.medias[0].publicUrl}
                    alt={product.description || ""}
                    width={200}
                    className={"w-3/4 mt-5"}
                />
                <h2 className={"text-white text-2xl mt-3"}>
                    {price} {subsc && "monthly"}
                </h2>
                <button
                    className="btn btn-primary mt-5 mb-5 w-3/4 text-white"
                    onClick={() => handleBuy(product.id)}
                >
                    {loading && <span className="loading loading-spinner" />}
                    {subsc ? "Subscribe" : "Buy"}
                </button>
            </div>
        </div>
    );
};
