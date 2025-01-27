import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import AccButton from "./ui/AccButton";
import "./globals.css";

const hsr = localFont({ src: "./assets/HSR.woff2" });

export const metadata: Metadata = {
    title: "MikanDev Payments",
    description: "Make a donation, or buy some our cool stuff :)",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            className={hsr.className}
            lang={await headers().get("x-locale")?.split("-")[0]}
        >
            <body>
                <SessionProvider>
                    {children}
                    <AccButton />
                    <Toaster />
                </SessionProvider>
            </body>
        </html>
    );
}
