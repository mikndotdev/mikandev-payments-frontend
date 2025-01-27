export const runtime = "edge";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();

    return (
        <main className="mt-10">
            <h1 className="text-2xl text-center mt-10">
                MikanBot Premium (one time payment)
            </h1>
            <h1 className="text-2xl text-center mt-10">
                sukushocloud Pro subscriptions
            </h1>
        </main>
    );
}
