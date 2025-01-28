export const runtime = "edge";

import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";

const hsr = localFont({ src: "./assets/HSR.woff2" });

export default function NotFound() {
    return (
        <>
            <html className={hsr.className} lang="en">
                <body>
                    <div className="h-screen flex flex-col items-center justify-center">
                        <h1 className={"text-4xl text-center text-white"}>
                            404 - Page Not Found
                        </h1>
                        <Link href={"/"}>
                            <button
                                className={"btn btn-primary text-white mt-5"}
                            >
                                Take me back
                            </button>
                        </Link>
                    </div>
                </body>
            </html>
        </>
    );
}
