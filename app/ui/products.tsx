import { useSession, signIn, signOut } from "next-auth/react";
import {
    Card,
    Heading,
    Button,
    Center,
    useToast,
    Flex,
    ToastProvider,
    AlertDialog,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogDescription,
} from "@neodyland/ui";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import MikanMascot from "@/app/assets/MikanMascotFull.png";
import MDAccount from "@/app/assets/MDAccount.png";

//@ts-ignore
export default function ProdList({ products }) {
    const json = JSON.parse(products);
    const { data: session, status } = useSession();
    const toast = useToast();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    // Helper function to split the products into chunks of three
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const chunkArray = (array: any[], chunkSize: number) => {
        const results = [];
        while (array.length) {
            results.push(array.splice(0, chunkSize));
        }
        return results;
    };

    const productChunks = chunkArray([...json], 3);

    const purchaseStripeProduct = async (email: string, name: string, price: string) => {
        toast.open({
            title: "Processing payment...",
            description: "You will be redirected to the payment page shortly",
            type: "info",
        });
        const response = await fetch("/api/checkout/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                name: name,
                price: price,
            }),
        });

        const data = await response.json();
        if (data.url) {
            router.push(data.url);
        } else {
            console.error("Failed to create checkout session:", data);
        }
    }

    const purchaseLMSProduct = async (
        id: number,
        email: string,
        cid: string,
    ) => {
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
                email: email,
                cid: cid,
            }),
        });

        const data = await response.json();
        if (data.url) {
            router.push(data.url);
        } else {
            console.error("Failed to create checkout session:", data);
        }
    };

    const purchaseProduct = async (id: string) => {
        if (status === "loading") {
            return toast.open({
                title: "Account verification in progress",
                description: "Please wait while we verify your login status",
                type: "info",
            });
        }

        const sku = await fetch(`/api/skus/?id=${id}`);
        const product = await sku.json();

        if (product.error) {
            return toast.open({
                title: "Product not found",
                description:
                    "The product you are trying to purchase does not exist. Please try again later.",
                type: "error",
            });
        }

        if (product.loginRequired && !session) {
            return setOpen(true);
        }

        if (product.processor === "lemonsqueezy") {
            return purchaseLMSProduct(
                product.lmid,
                session?.user.email || "",
                session?.user.id || ""
            );
        }

        if (product.processor === "stripe") {
            return purchaseStripeProduct(
                session?.user.email || "",
                product.name,
                product.price
            );
        }
    };

    return (
        <main className="p-4">
            <AlertDialog open={open} onClose={() => setOpen(false)}>
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
                        Login to access your account
                    </AlertDialogDescription>
                    <Center className="mt-4">
                        <AlertDialogFooter
                            actionText="Login"
                            cancelText="Guest"
                            actionColor="success"
                            onAction={() => signIn("logto")}
                            onCancel={() => setOpen(false)}
                        />
                    </Center>
                </div>
            </AlertDialog>
            <Flex direction="row" className="flex-wrap justify-center gap-6">
                {json.map((product) => (
                    <Card key={product.id} className="w-full sm:w-80 p-4">
                        <Flex direction="col" className="items-center h-full justify-between">
                            <Heading size="xl" className="text-center mb-4">
                                {product.name}
                            </Heading>
                            <div className="flex-grow flex items-center justify-center mb-4">
                                <Image
                                    src={product.image || MikanMascot.src}
                                    alt="Product Image"
                                    width={200}
                                    height={200}
                                    className="w-auto h-auto max-w-full max-h-48 object-contain"
                                />
                            </div>
                            <Heading size="2xl" className="mb-4">
                                ${product.price}
                            </Heading>
                            <Button
                                onClick={() => purchaseProduct(product.id)}
                                className="w-full text-white bg-primary"
                            >
                                Purchase
                            </Button>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </main>
    );
}
