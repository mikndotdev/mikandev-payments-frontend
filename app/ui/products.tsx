import { useSession, signIn, signOut } from "next-auth/react";
import {
    Card,
    Heading,
    Button,
    Center,
    useToast,
    Flex,
    ToastProvider,
    AlertDialog,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogDescription,
} from "@neodyland/ui";
import Image from "next/image";
import { useEffect, useState } from "react";

import MikanMascot from "@/app/assets/MikanMascotFull.png";

export default function ProdList({ products }) {
    const json = JSON.parse(products);
    const { data: session, status } = useSession();
    const toast = useToast();
    const [open, setOpen] = useState(false);

    // Helper function to split the products into chunks of three
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const chunkArray = (array: any[], chunkSize: number) => {
        const results = [];
        while (array.length) {
            results.push(array.splice(0, chunkSize));
        }
        return results;
    };

    const productChunks = chunkArray([...json], 3);

    return (
        <main>
            {productChunks.map((chunk, chunkIndex) => (
                // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                <Center>
                    <Flex
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={chunkIndex}
                        direction="row"
                        className="items-center mb-4"
                    >
                        {chunk.map((product) => (
                            <Card
                                key={product.id}
                                className="min-w-80 min-h-96 mx-2"
                            >
                                <Heading size="3xl" className="text-center">
                                    {product.name}
                                </Heading>
                                <Center className="mt-5 mb-5">
                                    <Image
                                        src={product.image || MikanMascot.src}
                                        alt="Product Image"
                                        width={200}
                                        height={200}
                                    />
                                </Center>
                                <Heading
                                    size="xl"
                                    className="text-center mt-3 mb-3"
                                >
                                    ${product.price}
                                </Heading>
                                <Button
                                    onClick={() => {
                                        //purchaseProduct(product.id);
                                    }}
                                    className="w-full text-white bg-primary"
                                >
                                    Purchase
                                </Button>
                            </Card>
                        ))}
                    </Flex>
                </Center>
            ))}
        </main>
    );
}
