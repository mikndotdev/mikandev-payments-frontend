"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
    Card,
    Button,
    Center,
    Heading,
} from "@neodyland/ui";

import { useRouter } from "next/navigation";
import MDHeart from "@/app/assets/MDHeart.png";

export default function DonateThankYou() {
    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <Center className="min-w-96">
            <Card className="min-w-80 mt-10">
            <div className="flex-grow flex items-center justify-center mb-4">
                <Image src={MDHeart.src} alt="Thanks!" className="mt-5" width={500} height={400} />
            </div>
                <Heading size="2xl" className="font-bold text-center mt-4">
                    Thank you for your donation!
                </Heading>
                <Heading className="text-center mt-4">
                    Your donation helps us keep the lights on and continue
                    developing cool stuff for you!
                </Heading>
                <Center>
                <Button
                    className="mt-4 mb-10 bg-primary"
                    onClick={() => router.push("/")}
                >
                    Go back to the homepage
                </Button>
                </Center>
            </Card>
        </Center>
    );
}