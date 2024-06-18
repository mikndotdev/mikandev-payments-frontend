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

export default function Home() {
    const { data: session, status } = useSession();
    return (
        <main className="mt-10">
            <Heading size="2xl" className="text-center">
                Make a donation
            </Heading>
            <Card className="min-w-96 mt-3">
                <ProdList
                    products={JSON.stringify([
                        {
                            id: 1,
                            name: "Product 1",
                            price: 100,
                            image: "/path-to-image1.png",
                        },
                        {
                            id: 2,
                            name: "Product 2",
                            price: 200,
                            image: "/path-to-image2.png",
                        },
                        {
                            id: 3,
                            name: "Product 3",
                            price: 300,
                            image: "/path-to-image3.png",
                        },
                        {
                            id: 4,
                            name: "Product 4",
                            price: 400,
                            image: "/path-to-image4.png",
                        },
                        {
                            id: 5,
                            name: "Product 5",
                            price: 500,
                            image: "/path-to-image5.png",
                        },
                        {
                            id: 6,
                            name: "Product 6",
                            price: 600,
                            image: "/path-to-image6.png",
                        },
                        {
                            id: 7,
                            name: "Product 7",
                            price: 700,
                            image: "/path-to-image7.png",
                        },
                    ])}
                />
            </Card>
        </main>
    );
}
