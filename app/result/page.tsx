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

import Loading from "../ui/spinner-mask";

import { useRouter } from "next/navigation";

import MDHeart from "@/app/assets/MDHeart.png";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cp } from "fs";

export default function Success() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [prodName, setProdName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [id, setId] = useState("");
    const toast = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();

    const cid = searchParams?.get("cid");

    useEffect(() => {
        if(status === "unauthenticated" || !cid) {
            router.push("/");
        }
    }, [status, cid, router]);
    
    useEffect(() => {
        const fetchData = async () => {
            if (status === "authenticated") {
                console.log(cid);
                console.log(session?.user?.discord);
                const processResponse = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_BACKEND}/validate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cid: cid,
                    }),
                });
                if (processResponse.ok) {
                    const json = await processResponse.json();
                    const prodName = json.prodName;
                    const quantity = json.quantity;
                    const price = json.price;
                    const id = json.id;
                    setProdName(prodName);
                    setQuantity(quantity);
                    setPrice(price);
                    setId(id);
                } else {
                    const json = await processResponse.json();
                    const message = json.message;
                    if (message === "IncompletePayment") {
                        toast.open({
                            title: "Payment failed",
                            description: "We couldn't validate your payment. Please try again, or contact support if you think this is an error.",
                            type: "error",
                        });
                        setFailed(true);
                        setLoading(false);
                    }
                    if (message === "UIDValidationError") {
                        toast.open({
                            title: "UID validation failed",
                            description: "This payment was not made on your account. Please try again, or contact support if you think this is an error.",
                            type: "error",
                        });
                        setFailed(true);
                        setLoading(false);
                    }
                    if (message === "Expired") {
                        toast.open({
                            title: "Payment expired",
                            description: "This payment has expired, or has already been validated. Please try again, or contact support if you think this is an error.",
                            type: "error",
                        });
                        setFailed(true);
                        setLoading(false);
                    }
                    
                }
            }
        };
    
        fetchData();
    }, [cid, session, status, toast]);

    useEffect(() => {
        if (!loading && !failed) {
            setLoading(false);
        }
    }, [loading, failed]);

    if (loading) {
        return <Loading />;
    }

    if (failed) {
        return (
            <main className="mt-10">
                <Heading size="3xl" className="text-center text-red-500">
                    Payment failed
                </Heading>
                <Card className="min-w-96 mt-3">
                        <Heading size="xl" className="text-center">
                            Something went wrong with your payment. Please try again.
                        </Heading>
                        <Heading size="xl" className="text-center">
                            If you are seeing this screen and were charged, please contact support before retrying to avoid double charges.
                        </Heading>
                        <Center>
                            <Button onClick={() => router.push("/")} className="mt-5 mr-2 text-white bg-primary">Go back</Button>
                            <Button onClick={() => router.push("https://mikn.dev/contact")} className="mt-5 ml-2 text-white bg-primary">Contact support</Button>
                        </Center>
                </Card>
            </main>
        );
    }
    
        if (!loading && !failed) {
        return (
            <main className="mt-10">
                <Heading size="3xl" className="text-center text-green-500">
                    Payment successful
                </Heading>
                <Card className="min-w-96 mt-3">
                    <Heading size="xl" className="text-center">
                        Thank you for your purchase, {session?.user?.name}!
                    </Heading>
                    <Heading size="xl" className="text-center">
                        You have successfully purchased {quantity}x {prodName} for ${price}.
                    </Heading>
                    <Center className="mt-3">
                        <Heading size="sm" className="text-center mt-5">
                            Ref ID: {id}
                        </Heading>
                    </Center>
                    <Center>
                        <Button onClick={() => router.push("/")} className="mt-5 text-white bg-primary">Go back</Button>
                    </Center>
                </Card>
            </main>
        );
    }}
