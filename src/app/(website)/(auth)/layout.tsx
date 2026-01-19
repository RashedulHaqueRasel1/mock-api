import type { Metadata } from "next";
import { Command } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome!",
  description: "Securely access your Mock API workspace.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Visual Side (Consistent with Banner) */}
      <div className="relative hidden w-full overflow-hidden bg-slate-950 lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#020617_100%)]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>

        {/* Branding Overlay */}
        <div className="absolute left-12 top-12 z-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20 transition-transform group-hover:scale-110">
              <Command className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">MockAPI</span>
          </Link>
        </div>

        <div className="relative flex h-full items-center justify-center p-12">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              The missing piece in your <br />
              <span className="text-indigo-400">frontend workflow.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Join thousands of developers building faster with reliable mock data.
              Simple, scalable, and always in JSON.
            </p>
          </div>

          {/* Subtle decoration */}
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-indigo-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 dark:bg-slate-900 lg:w-1/2 lg:px-12 xl:px-24">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
