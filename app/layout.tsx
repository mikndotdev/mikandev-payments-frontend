import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import ClientSessionProvider from "@/app/lib/session";
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
                <ClientSessionProvider>{children}</ClientSessionProvider>
                <script
                    async
                    src="https://analytics.mikandev.tech/script.js"
                    data-website-id="58744762-f124-4ce3-8ec3-20a9081c196b"
                ></script>
            </body>
        </html>
    );
}
