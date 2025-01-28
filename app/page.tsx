export const runtime = "edge";
import { ProductCard } from "@/app/ui/payments/ProductCard";
import { api } from "@/polar";

export default async function Home() {
    const { result } = await api.products.list({
        organizationId: process.env.POLAR_ORGANIZATION_ID!,
        isArchived: false,
    });

    return (
        <main className="mt-10">
            <h1 className="text-4xl text-center mt-10 font-bold text-white">
                Products
            </h1>
            <div
                className={
                    "card w-xl min-h-16 mt-5 bg-surface bg-opacity-10 text-on-surface shadow"
                }
            >
                <div className="px-5 py-5 flex flex-wrap justify-center gap-5">
                    {result.items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}
