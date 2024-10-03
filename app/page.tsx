"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
    Card,
    Heading,
    Button,
    Center,
    useToast,
    ToastProvider,
    AlertDialog,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogDescription,
} from "@neodyland/ui";

import ProdList from "./ui/products";

import MDHeart from "@/app/assets/MDHeart.png";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { data: session, status } = useSession();
    const toast = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const isCanceled = searchParams?.get("canceled");
        if (isCanceled === "true") {
            toast.open({
                title: "Payment failed",
                description:
                    "Something went wrong with your payment. Please try again, or contact support if the issue persists.",
                type: "error",
            });
            router.push("/");
        }
    }, [searchParams]);

    return (
        <main className="mt-10">
            <Heading size="2xl" className="text-center mt-10">
                MikanBot Premium (one time payment)
            </Heading>
            <Card className="min-w-96 mt-3">
                <ProdList
                    products={JSON.stringify([
                        {
                            id: "mikanbot-premium-1m",
                            name: "MikanBot Premium (1 month)",
                            price: 3,
                            image: MDHeart.src,
                        },
                        {
                            id: "mikanbot-premium-1y",
                            name: "MikanBot Premium (1 year)",
                            price: 30,
                            image: MDHeart.src,
                        },
                    ])}
                />
            </Card>
            <Heading size="2xl" className="text-center mt-10" id="donations">
                sukushocloud Pro subscriptions
            </Heading>
            <Card className="min-w-96 mt-3">
                <ProdList
                    products={JSON.stringify([
                        {
                            id: "skshc-pro-lite",
                            name: "Pro Lite",
                            price: 3,
                            image: MDHeart.src,
                            subscription: true,
                        },
                        {
                            id: "sksh-pro-std",
                            name: "Pro Standard",
                            price: 6,
                            image: MDHeart.src,
                            subscription: true,
                        },
                        {
                            id: "sksh-pro-ult",
                            name: "Pro Ultra",
                            price: 12,
                            image: MDHeart.src,
                            subscription: true,
                        },
                    ])}
                />
            </Card>
            <Heading size="2xl" className="text-center mt-10" id="donations">
                Make a donation (no products will be shipped)
            </Heading>
            <Card className="min-w-96 mt-3">
                <ProdList
                    products={JSON.stringify([
                        {
                            id: "donate-1",
                            name: "Donate $1",
                            price: 1,
                            image: MDHeart.src,
                        },
                        {
                            id: "donate-5",
                            name: "Donate $5",
                            price: 5,
                            image: MDHeart.src,
                        },
                        {
                            id: "donate-10",
                            name: "Donate $10",
                            price: 10,
                            image: MDHeart.src,
                        },
                        {
                            id: "donate-25",
                            name: "Donate $25",
                            price: 25,
                            image: MDHeart.src,
                        },
                        {
                            id: "donate-50",
                            name: "Donate $50",
                            price: 50,
                            image: MDHeart.src,
                        },
                        {
                            id: "donate-100",
                            name: "Donate $100",
                            price: 100,
                            image: MDHeart.src,
                        },
                        {
                            id: "donate-500",
                            name: "Donate $500",
                            price: 500,
                            image: MDHeart.src,
                        },
                        {
                            id: "donate-1000",
                            name: "Donate $1000",
                            price: 1000,
                            image: MDHeart.src,
                        }
                    ])}
                />
            </Card>
        </main>
    );
}
