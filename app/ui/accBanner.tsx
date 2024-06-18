import { useSession, signIn, signOut } from "next-auth/react";
import {
    Card,
    Heading,
    Button,
    Center,
    useToast,
    ToastProvider,
    AlertDialog,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogDescription,
} from "@neodyland/ui";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ImSpinner2 } from "react-icons/im";
import { FaQuestionCircle } from "react-icons/fa";
import { CiLogout, CiLogin } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";

import MDAccount from "@/app/assets/MDAccount.png";

export default function AccBanner() {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!session) {
            setOpen(true);
        }
    }, [session]);

    if (status === "loading") {
        return (
            <main>
            <Card className="min-w-96">
                <Center>
                    <MdAccountCircle size={75} className="text-primary"/>
                    <Heading className="ml-5 mt-6" size="xl">Verifying account...</Heading>
                    <ImSpinner2 className="animate-spin text-primary ml-3 mt-7" size={25} />
                </Center>
            </Card>
            </main>
        );
    }
    if (session) {
        return (
            <main>
                <Card className="min-w-96 flex justify-between items-center">
                    <div>
                        <Heading size="xl">Hello, {session.user.name}</Heading>
                        <Heading size="md">UID {session.user.discord}</Heading>
                    </div>
                    <Image
                        src={session.user.image}
                        alt="User Avatar"
                        className="rounded-full"
                        width={75}
                        height={75}
                    />
                </Card>
                <Card className="min-w-96 mt-5">
                    <Center>
                    <CiLogout
                        size="40"
                        className="text-red-500"
                        onClick={() => signOut()}
                    />
                    </Center>
                </Card>
            </main>
        );
    }
        return (
            <main>
                <AlertDialog open={open} onClose={() => setOpen(false)}>
                    <Center>
                        <Image
                            src={MDAccount.src}
                            alt="MikanDev Logo"
                            width={240}
                            height={120}
                        />
                    </Center>
                    <AlertDialogDescription className="text-center">
                        Login to access your account
                    </AlertDialogDescription>
                    <Center>
                    <AlertDialogFooter
                        actionText="Login with MikanDev Account"
                        cancelText="Browse as Guest"
                        actionColor="success"
                        onAction={() => signIn("logto")}
                        onCancel={() => setOpen(false)}
                    />
                    </Center>
                </AlertDialog>
                <Card className="min-w-96 flex justify-between items-center">
                    <div>
                        <Heading size="xl">Not logged in</Heading>
                    </div>
                    <FaQuestionCircle size="75" className="text-primary" />
                </Card>
                <Card className="min-w-96 mt-5">
                    <Center>
                    <CiLogin
                        size="40"
                        className="text-green-500"
                        onClick={() => signIn("logto")}
                    />
                    </Center>
                </Card>
            </main>
        );
    }
