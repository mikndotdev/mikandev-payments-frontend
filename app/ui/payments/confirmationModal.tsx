"use client";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";
import type { Product } from "@polar-sh/sdk/models/components/product";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createPayment } from "@/app/ui/payments/createPayment";
import { PiSignOutBold, PiCreditCardBold } from "react-icons/pi";

interface ProductModalProps {
    product: Product;
    session: Session;
}

export const ConfirmationModal = ({ product, session }: ProductModalProps) => {
    const firstPrice = product.prices[0];
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleBuy = async (id: string) => {
        if (status !== "authenticated") {
            return toast.error("You need to be signed in to buy this product", {
                action: { label: "Sign in", onClick: () => signIn("logto") },
            });
        }
        setLoading(true);
        const url = await createPayment(id, session?.user?.email || "");
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
        <dialog className="modal" open={true}>
            <div className="modal-box w-11/12 max-w-xl min-w-xl bg-secondary">
                <h3 className="font-bold text-lg">Confirm data</h3>
                <h3 className="font-bold text-md">
                    You are making this purchase on the following account:
                </h3>
                <div className="flex items-center space-x-4 justify-center mt-5">
                    <img
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || ""}
                        className="w-16 h-16 rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                        <p className="text-white text-xl">{session?.user?.name}</p>
                        <p className="text-white text-sm">
                            UID {session?.user?.id}
                        </p>
                    </div>
                </div>
                <div className="modal-action flex-wrap gap-2 justify-center">
                    <button
                        className="btn btn-error text-white"
                        onClick={() => signOut({ redirectTo: "/" })}
                    >
                        <PiSignOutBold className="text-white w-5 h-5" />
                        Sign Out
                    </button>
                    <button
                        className="btn btn-info text-white"
                        onClick={() => handleBuy(product.id)}
                    >
                        {loading ? (
                            <span className="loading loading-spinner" />
                        ) : (
                            <PiCreditCardBold className="text-white w-5 h-5" />
                        )}
                        Continue with Payment
                    </button>
                </div>
            </div>
        </dialog>
    );
};
