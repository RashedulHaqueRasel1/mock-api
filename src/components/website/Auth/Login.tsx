"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react"; // Added React import for useState

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const name = formData.get("name");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSent(true);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="w-full text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Check your inbox
        </h1>
        <p className="mt-6 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          We've sent a verification link to your email. Please{' '}
          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-600  hover:underline"
          >
            check your inbox
          </a>{' '}
          and click the link to secure your session. If you don't see it, check your spam folder.
        </p>

        <button
          onClick={() => setIsSent(false)}
          className="mt-10 text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          ← Try another email
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Back navigation for mobile/desktop */}
      <Link
        href="/"
        className="group mb-8 flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors lg:hidden"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Link>

      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Sign In
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Access your mock API dashboard and <br className="hidden sm:block" />
          manage your JSON endpoints.
        </p>
      </div>

      <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            Full Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3.5 px-4 text-slate-900 dark:text-white shadow-sm ring-inset ring-indigo-500 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all outline-none"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            Email Address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3.5 px-4 text-slate-900 dark:text-white shadow-sm ring-inset ring-indigo-500 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all outline-none"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-xl cursor-pointer bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all active:scale-[0.98]"
          >
            Continue to Workspace
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </form>


      <p className="mt-20 text-center sm:text-left text-xs text-slate-400 px-0">
        By continuing, you agree to our Terms of Service and Privacy Policy.
        MockAPI secures your data in industry-standard JSON format.
      </p>
    </div>
  );
}
