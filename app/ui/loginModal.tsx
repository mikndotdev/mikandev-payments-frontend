"use client";
import { signIn } from "next-auth/react";
import { PiSignInBold } from "react-icons/pi";

export const LoginModal = () => {
    return (
        <dialog className="modal" open={true}>
            <div className="modal-box w-11/12 max-w-xl min-w-xl bg-secondary text-center">
                <h3 className="font-bold text-lg">Sign in to complete your purchase.</h3>
                <div className="modal-action flex-wrap gap-2 justify-center">
                    <button
                        className="btn btn-info text-white"
                        onClick={() => signIn("logto")}
                    >
                            <PiSignInBold className="text-white w-5 h-5"/>
                        Sign in
                    </button>
                </div>
            </div>
        </dialog>
    )
}