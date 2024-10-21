import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import AccButton from "./ui/AccButton";
import "./globals.css";

const hsr = localFont({ src: "./assets/HSR.woff2" });

export const metadata: Metadata = {
    title: "MikanDev Payments",
    description: "Make a donation, or buy some our cool stuff :)",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            className={hsr.className}
            lang={headers().get("x-locale")?.split("-")[0]}
        >
            <body>
                <SessionProvider>
                    {children}
                    <AccButton />
                </SessionProvider>
                <script
                    async
                    src="https://analytics.mikandev.tech/script.js"
                    data-website-id="0b14f82a-e300-4920-8195-5ac2ca8d1161"
                />
            </body>
        </html>
    );
}
