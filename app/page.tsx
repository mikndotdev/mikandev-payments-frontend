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
            <Heading size="2xl" className="text-center">
                Make a donation
            </Heading>
            <Card className="min-w-96 mt-3">
                <ProdList
                    products={JSON.stringify([
                        {
                            id: "sm-donation",
                            name: "Small Donation",
                            price: 3,
                            image: MDHeart.src,
                            loginRequired: false,
                        },
                        {
                            id: "md-donation",
                            name: "Bigger Donation",
                            price: 5,
                            image: MDHeart.src,
                            loginRequired: false,
                        },
                        {
                            id: "lg-donation",
                            name: "Even Bigger Donation",
                            price: 10,
                            image: MDHeart.src,
                            loginRequired: false,
                        },
                        {
                            id: "xl-donation",
                            name: "Huge Donation",
                            price: 50,
                            image: MDHeart.src,
                            loginRequired: false,
                        },
                        {
                            id: "2xl-donation",
                            name: "Insane Donation",
                            price: 100,
                            image: MDHeart.src,
                            loginRequired: false,
                        },
                        {
                            id: "3xl-donation",
                            name: "Whale tier",
                            price: 500,
                            image: MDHeart.src,
                            loginRequired: false,
                        },
                        {
                            id: "4xl-donation",
                            name: "Megawhale tier",
                            price: 1000,
                            image: MDHeart.src,
                            loginRequired: false,
                        },
                        {
                            id: "5xl-donation",
                            name: "Kraken tier",
                            price: 2500,
                            image: MDHeart.src,
                            loginRequired: false,
                        },
                        {
                            id: "elonmusk-donation",
                            name: "Elon Musk tier",
                            price: 5000,
                            image: MDHeart.src,
                            loginRequired: false,
                        },
                    ])}
                />
            </Card>
            <Heading size="2xl" className="text-center mt-10">
                Premium subscriptions (one time payment)
            </Heading>
            <Card className="min-w-96 mt-3">
                <ProdList
                    products={JSON.stringify([
                        {
                            id: "mbp-monthly",
                            name: "MikanBot Premium (1 month)",
                            price: 3,
                            image: MDHeart.src,
                            loginRequired: true,
                            discordRequired: true,
                        },
                        {
                            id: "mbp-yearly",
                            name: "MikanBot Premium (1 year)",
                            price: 30,
                            image: MDHeart.src,
                            loginRequired: true,
                            discordRequired: true,
                        },
                    ])}
                />
            </Card>
        </main>
    );
}
