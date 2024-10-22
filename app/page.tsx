"use client";
export const runtime = "edge";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
    Card,
    Heading,
    Flex,
    useToast,
    ToastProvider,
    AlertDialog,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogDescription,
} from "@neodyland/ui";

import { SiStripe, SiLemonsqueezy } from "react-icons/si";
import { FaLock } from "react-icons/fa";
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
                            id: "sksh-pro-lite",
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
                            price: 9,
                            image: MDHeart.src,
                            subscription: true,
                        },
                    ])}
                />
            </Card>
            <Card className="min-w-96 mt-3 mt-10">
                <Flex
                    direction="row"
                    className="justify-center items-center gap-4"
                >
                    <FaLock className="text-center text-white" size={30} />
                    <Heading size="2xl" className="text-center">
                        Secure payments with
                    </Heading>
                    <SiLemonsqueezy
                        className="text-center text-white"
                        size={30}
                    />
                </Flex>
            </Card>
        </main>
    );
}
