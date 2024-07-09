import { Heading } from "@neodyland/ui";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import crown from "@/app/assets/mikan.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoWallet } from "react-icons/io5";

export default function Loading() {
    return (
        <main>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 flex-col">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <AiOutlineLoading3Quarters
                        size="125"
                        className="text-primary animate-spin absolute"
                    />
                    <IoWallet
                        size="75"
                        className="text-primary animate-pulse"
                    />
                </div>
                <div>
                    <Heading size="4xl" className="text-white mt-20">
                        {Array.from("Processing payment...").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 0 }}
                                animate={{ y: [0, -30, 0] }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                    delay: i * 0.1,
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </Heading>
                </div>
            </div>
        </main>
    );
}
