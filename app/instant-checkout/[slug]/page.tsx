export const runtime = "edge";
import { auth, signIn } from "@/auth";
import { api } from "@/polar";
import { notFound } from "next/navigation";
import { ConfirmationModal } from "@/app/ui/payments/confirmationModal";
import { LoginModal } from "@/app/ui/loginModal";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug: id } = await params;
    const session = await auth();

    if (!session?.user) {
        return (
            <div>
                <LoginModal />
            </div>
        )
    }

    try {
        const result = await api.products.get({
            id,
        });

        return (
            <div>
                <ConfirmationModal product={result} session={session} />
            </div>
        );
    } catch (e) {
        return notFound();
    }
}
