export const runtime = "edge";
import { auth, signIn, signOut } from "@/auth";
import { api } from "@/polar";
import { notFound } from "next/navigation";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug: id } = await params;
    const session = await auth();

    if (!session) {
        signIn("logto");
    }

    try {
        const result = await api.products.get({
            id,
        });

        return (
            <div>
            </div>
        );
    } catch (e) {
        return notFound();
    }
}