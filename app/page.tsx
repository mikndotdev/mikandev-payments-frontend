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
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { data: session, status } = useSession();
    const toast = useToast();
    const searchParams = useSearchParams();

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      const isCanceled = searchParams?.get("canceled");
      if (isCanceled === "true") {
          toast.open({
              title: "Payment failed",
              description: "Something went wrong with your payment. Please try again, or contact support if the issue persists.",
              type: "error",
          });
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
                            id: 1,
                            name: "Small Donation",
                            price: 3,
                            image: MDHeart.src,
                        },
                        {
                            id: 2,
                            name: "Bigger Donation",
                            price: 5,
                            image: MDHeart.src,
                        },
                        {
                            id: 3,
                            name: "Even Bigger Donation",
                            price: 10,
                            image: MDHeart.src,
                        },
                        {
                            id: 4,
                            name: "Huge Donation",
                            price: 50,
                            image: MDHeart.src,
                        },
                        {
                            id: 5,
                            name: "Insane Donation",
                            price: 100,
                            image: MDHeart.src,
                        },
                        {
                            id: 6,
                            name: "Whale tier",
                            price: 500,
                            image: MDHeart.src,
                        },
                        {
                            id: 7,
                            name: "Megawhale tier",
                            price: 1000,
                            image: MDHeart.src,
                        },
                        {
                            id: 8,
                            name: "Kraken tier",
                            price: 2500,
                            image: MDHeart.src,
                        },
                        {
                            id: 9,
                            name: "Elon Musk tier",
                            price: 5000,
                            image: MDHeart.src,
                        },
                    ])}
                />
            </Card>
        </main>
    );
}
