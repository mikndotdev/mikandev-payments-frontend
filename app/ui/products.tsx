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

    const purchaseProduct = async (id: number, price: number, email: string, discord: string, name: string, cid: string) => {
        if (status === "loading") {
            return toast.open({
                title: "Account verification in progress",
                description: "Please wait while we verify your login status",
                type: "info",
            });
        }
        if (!session) {
            return setOpen(true);
        }
        toast.open({
            title: "Processing payment...",
            description: "You will be redirected to the payment page shortly",
            type: "info",
        });
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                price: price,
                email: email,
                discord: discord,
                name: name,
                cid: cid,
            }),
        });
    
        const data = await response.json();
        if (data.url) {
            router.push(data.url);
        } else {
            console.error('Failed to create checkout session:', data);
        }
    };

    return (
        <main>
            <AlertDialog open={open} onClose={() => setOpen(false)}>
                <Center>
                    <Image
                        src={MDAccount.src}
                        alt="MikanDev Logo"
                        width={240}
                        height={120}
                    />
                </Center>
                <AlertDialogDescription className="text-center">
                    Login to access your account
                </AlertDialogDescription>
                <Center>
                    <AlertDialogFooter
                        actionText="Login with MikanDev Account"
                        cancelText="Browse as Guest"
                        actionColor="success"
                        onAction={() => signIn("logto")}
                        onCancel={() => setOpen(false)}
                    />
                </Center>
            </AlertDialog>
            {productChunks.map((chunk, chunkIndex) => (
                // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                <Center className="mt-3">
                    <Flex
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={chunkIndex}
                        direction="row"
                        className="items-center mb-4"
                    >
                        {chunk.map((product) => (
                            <Card
                                key={product.id}
                                className="min-w-80 min-h-50 mx-2"
                            >
                                <Heading size="xl" className="text-center">
                                    {product.name}
                                </Heading>
                                <Center className="mt-5 mb-5">
                                    <Image
                                        src={product.image || MikanMascot.src}
                                        alt="Product Image"
                                        width={200}
                                        height={200}
                                    />
                                </Center>
                                <Heading
                                    size="2xl"
                                    className="text-center mt-3 mb-3"
                                >
                                    ${product.price}
                                </Heading>
                                <Button
                                    onClick={() => {
                                        purchaseProduct(
                                            product.id,
                                            product.price,
                                            session?.user.email || "",
                                            session?.user.discord || "",
                                            product.name,
                                            session?.user.id || "",
                                        );
                                    }}
                                    className="w-full text-white bg-primary"
                                >
                                    Purchase
                                </Button>
                            </Card>
                        ))}
                    </Flex>
                </Center>
            ))}
        </main>
    );
}
