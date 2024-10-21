"use client";
export const runtime = "edge";
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

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import MDAccount from "@/app/assets/MDAccount.png";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const { data: session, status } = useSession();
    const toast = useToast();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status !== "loading") {
            setLoading(false);
        }
        if (status === "unauthenticated") {
            setOpen(true);
            setConfirmOpen(false);
        }
        if (status === "authenticated") {
            setOpen(false);
            setConfirmOpen(true);
        }
    }, [status]);

    const purchaseLMSProduct = async (id: number) => {
        toast.open({
            title: "Processing payment...",
            description: "You will be redirected to the payment page shortly",
            type: "info",
        });
        const response = await fetch("/api/checkout/lemonsqueezy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        });

        const data = await response.json();
        if (data.url) {
            router.push(data.url);
        } else {
            console.error("Failed to create checkout session:", data);
        }
    };

    const completePurchase = async () => {
        const id = pathname?.split("/")[2];
        const sku = await fetch(`/api/skus/?id=${id}`);
        const product = await sku.json();

        if (product.error) {
            setConfirmOpen(false);
            toast.open({
                title: "Product not found",
                description:
                    "The product you are trying to purchase does not exist. You will be redirected to the homepage.",
                type: "error",
            });
            setTimeout(() => {
                router.push("/");
            }, 5000);
        }

        if (product.processor === "lemonsqueezy") {
            setLoading(true);
            setConfirmOpen(false);
            return purchaseLMSProduct(product.lmid);
        }

        if (product.processor === "stripe") {
            setConfirmOpen(false);
            toast.open({
                title: "Product not found",
                description:
                    "The product you are trying to purchase does not exist. You will be redirected to the homepage.",
                type: "error",
            });
            setTimeout(() => {
                router.push("/");
            }, 5000);
        }
    };

    if (loading) {
        return (
            <main className="mt-10">
                <Card className="min-w-96 mt-3">
                    <Heading size="4xl" className="text-center">
                        Loading...
                    </Heading>
                    <Center>
                        <AiOutlineLoading3Quarters
                            className="mt-10 text-primary animate-spin"
                            size={100}
                        />
                    </Center>
                </Card>
            </main>
        );
    }

    return (
        <main>
            <AlertDialog open={open} onClose={() => null}>
                <div className="p-4">
                    <Center>
                        <Image
                            src={MDAccount.src}
                            alt="MikanDev Logo"
                            width={180}
                            height={90}
                            className="w-auto h-auto max-w-full"
                        />
                    </Center>
                    <AlertDialogDescription className="text-center mt-4">
                        Login to complete your purchase
                    </AlertDialogDescription>
                    <Center className="mt-4">
                        <AlertDialogFooter
                            actionText="Login"
                            cancelText="Return to homepage"
                            actionColor="success"
                            onAction={() => signIn("logto")}
                            onCancel={() => router.push("/")}
                        />
                    </Center>
                </div>
            </AlertDialog>
            <AlertDialog open={confirmOpen} onClose={() => null}>
                <div className="p-4">
                    <AlertDialogDescription className="text-center mt-4 text-sm">
                        You are about to make a purchase on the following
                        account:
                    </AlertDialogDescription>
                    <Center className="mt-3">
                        <Image
                            src={session?.user.image || ""}
                            alt="MikanDev"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    </Center>
                    <Center className="mt-4">
                        <Heading size="md" className="text-white">
                            {session?.user.name} (UID {session?.user.id})
                        </Heading>
                    </Center>
                    <AlertDialogDescription className="text-center mt-4">
                        Please confirm your details before proceeding.
                    </AlertDialogDescription>
                    <Center className="mt-4">
                        <AlertDialogFooter
                            actionText="Proceed"
                            cancelText="Sign out"
                            actionColor="success"
                            onAction={() => completePurchase()}
                            onCancel={() => signOut()}
                        />
                    </Center>
                </div>
            </AlertDialog>
            <Card className="min-w-96 mt-3">
                <Heading size="4xl" className="text-center">
                    Awaiting confirmation...
                </Heading>
            </Card>
        </main>
    );
}
