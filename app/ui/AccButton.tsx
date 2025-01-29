"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
        if (searchParams?.get("update") === "true") {
            update();
        }
    }, [searchParams, session]);

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
                        <div className="flex justify-center">
                            <h2 className="text-primary mb-5 text-md">
                                MikanDev Account
                            </h2>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src={session?.user?.image}
                                alt="MikanDev"
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex justify-center mt-5">
                            <h3 className="text-primary text-sm">
                                {session?.user?.name}
                            </h3>
                        </div>
                        <div className="flex justify-center">
                            <h3 className="text-primary mt-2 mb-5 text-sm">
                                UID {session?.user?.id}
                            </h3>
                        </div>
                        <ul>
                            <li
                                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                                onClick={() =>
                                    router.push(
                                        "https://my.mikandev.com/init?url=https://payments.mikandev.com",
                                    )
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
