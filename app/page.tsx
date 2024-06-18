"use client";
import Image from "next/image";
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

export default function Home() {
  const { data: session, status } = useSession();
    return <main className="mt-10">
      <Heading size="2xl" className="text-center">Make a donation</Heading>
      <Card className="min-w-96 mt-3">
      </Card>
    </main>;
}
