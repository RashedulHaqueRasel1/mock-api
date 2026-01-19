"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const token = searchParams.get("token");
        const email = searchParams.get("email");

        if (!token || !email) {
            setStatus("error");
            setMessage("Invalid verification link.");
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch("/api/auth/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, email }),
                });

                const data = await res.json();

                if (res.ok) {
                    // Store Access Token in localStorage
                    localStorage.setItem("accessToken", data.accessToken);
                    setStatus("success");
                    setMessage("Login successful! Redirecting...");

                    // Redirect to home/dashboard after a delay
                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                } else {
                    setStatus("error");
                    setMessage(data.error || "Verification failed.");
                }
            } catch (err) {
                setStatus("error");
                setMessage("Something went wrong. Please try again.");
            }
        };

        verify();
    }, [searchParams, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 px-6">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-xl text-center">
                {status === "verifying" && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{message}</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Success!</h2>
                        <p className="text-slate-600 dark:text-slate-400">{message}</p>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                            <XCircle className="h-10 w-10 text-rose-600" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Oops!</h2>
                        <p className="text-slate-600 dark:text-slate-400">{message}</p>
                        <button
                            onClick={() => router.push("/login")}
                            className="mt-4 font-bold text-indigo-600 hover:text-indigo-500"
                        >
                            Back to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}
