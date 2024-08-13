"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Heading, Center, Flex } from "@neodyland/ui";

import mikan from "@/app/assets/mikan.png";
import { PiSpinnerBold } from "react-icons/pi";

interface AccButtonProps {
    children?: React.ReactNode;
}

const AnimatedButton = ({
    onClick,
    status,
}: {
    onClick: () => void;
    status: "authenticated" | "loading" | "unauthenticated";
}) => {
    let buttonContent;
    let buttonClass =
        "py-1 px-1 border-2 rounded-full cursor-pointer w-[60px] h-[60px] flex items-center justify-center";

    switch (status) {
        case "authenticated":
            buttonContent = (
                <Image src={mikan.src} alt="MikanDev" width={50} height={50} />
            );
            buttonClass += " bg-primary";
            break;
        case "unauthenticated":
            buttonContent = (
                <Image src={mikan.src} alt="MikanDev" width={50} height={50} />
            );
            buttonClass += " bg-red-500";
            break;
        case "loading":
            buttonContent = (
                <PiSpinnerBold className="animate-spin text-white" size={40} />
            );
            buttonClass += " bg-gray-500";
            break;
    }

    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{
                scale: 0.8,
                borderRadius: "100%",
            }}
        >
            <div className={buttonClass} onClick={onClick}>
                {buttonContent}
            </div>
        </motion.div>
    );
};

export default function AccButton({ children }: AccButtonProps) {
    const [open, setOpen] = useState(false);
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleClick = () => {
        if (status === "unauthenticated") {
            signIn("logto");
        } else {
            setOpen(!open);
        }
    };

    useEffect(() => {
        if (
            status === "authenticated" &&
            (!session.user.name ||
                session.user.image == null ||
                !session.user.image.startsWith(
                    "https://cdn.mdusercontent.com/",
                ))
        ) {
            if (searchParams?.get("update") === "true") {
                update();
                router.push(window.location.pathname);
            }
            if (!pathname?.endsWith("account")) {
                router.push(
                    `https://mikn.dev/account?onboarding=true&redirect=${window.location.origin}${pathname}`,
                );
            }
        }
    }, [status, session, pathname]);

    if (
        status === "authenticated" &&
        (!session.user.name ||
            session.user.image == null ||
            !session.user.image.startsWith("https://cdn.mdusercontent.com/"))
    ) {
        if (pathname?.endsWith("account")) {
            return null;
        }
    }

    return (
        <div className="fixed z-50 bottom-10 left-10">
            <AnimatedButton onClick={handleClick} status={status} />
            <AnimatePresence>
                {open && status === "authenticated" && (
                    <motion.div
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 7 }}
                        className="absolute bottom-full mb-5 bg-white shadow-lg rounded-lg p-4 w-80"
                    >
                        <Center>
                            <Heading size="md" className="text-primary mb-5">
                                MikanDev Account
                            </Heading>
                        </Center>
                        <Center>
                            <Image
                                src={session.user.image}
                                alt="MikanDev"
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                        </Center>
                        <Center className="mt-5">
                            <Heading size="sm" className="text-primary">
                                {session.user.name}
                            </Heading>
                        </Center>
                        <Center>
                            <Heading
                                size="sm"
                                className="text-primary mt-2 mb-5"
                            >
                                UID {session.user.id}
                            </Heading>
                        </Center>
                        <ul>
                            <li
                                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                                onClick={() =>
                                    router.push("https://mikn.dev/account")
                                }
                            >
                                Profile
                            </li>
                            <li
                                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                                onClick={() => signOut()}
                            >
                                Logout
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </div>
    );
}
