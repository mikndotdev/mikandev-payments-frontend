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

export default function Success() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const toast = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();

    const uid = searchParams?.get("uid");
    const pid = searchParams?.get("name");
    const price = searchParams?.get("price");

    useEffect(() => {
        if(status === "unauthenticated" || !uid || !pid || !price) {
            router.push("/");
        }
    }, [status, uid, pid, price, router]);
    
    useEffect(() => {
        if (status === "authenticated") {
            console.log(uid);
            console.log(session?.user?.discord);
            if (!(uid === session?.user?.discord)) {
                setLoading(false);
                setFailed(true);
                toast.open({
                    title: "UID check failed",
                    description: `Something went wrong validating your UID. Please contact support with the following information: UID ${uid}`,
                    type: "error",
                });
            } else {
                setLoading(false);
            }
        }
    }, [uid, session, status, toast]);

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
                        You have successfully purchased {pid} for ${price}.
                    </Heading>
                    <Center>
                        <Button onClick={() => router.push("/")} className="mt-5 text-white bg-primary">Go back</Button>
                    </Center>
                </Card>
            </main>
        );
    }}
