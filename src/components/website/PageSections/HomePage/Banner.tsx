"use client";

import { ArrowRight, Code2, Command, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Content Side */}
        <div className="flex w-full flex-col justify-center bg-white px-8 py-20 dark:bg-slate-900 lg:w-1/2 lg:px-16 xl:px-24">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Branding (Consistent with Login) */}
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-xl shadow-indigo-600/20">
                <Command className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">MockAPI</span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl dark:text-white leading-[1.05]">
              Prototype with <br />
              <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Confidence.
              </span>
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              The professional environment for frontend developers to create,
              manage, and test APIs instantly. No backend required—just pure
              <span className="font-bold text-indigo-500 mx-1">JSON</span> agility.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "Instant endpoint generation",
                "Fully customizable JSON schemas",
                "Publicly accessible stable URLs"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-10 py-4.5 text-base font-bold text-white shadow-2xl shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.98]"
              >
                Start Creating Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-2xl px-10 py-4.5 text-base font-bold text-slate-700 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </div>


        {/* Visual Side (Consistent with Login Page Visuals) */}
        <div className="relative hidden w-full overflow-hidden bg-slate-950 lg:block lg:w-1/2">
          {/* Background decoration: Mesh and Noise */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1e1b4b_0%,#020617_100%)]"></div>
            <div className="absolute top-0 left-0 h-[600px] w-[600px] bg-indigo-600/20 blur-[130px] rounded-full -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-violet-600/10 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
          </div>

          <div className="relative z-10 flex h-full items-center justify-center p-12">
            {/* High-end Visual Element: Interactive-looking Code Card */}
            <div className="relative group max-w-lg w-full">
              <div className="absolute inset-0 rounded-4xl bg-indigo-500/10 blur-[100px] transition-opacity group-hover:opacity-100"></div>

              <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-900/50 p-1 shadow-2xl backdrop-blur-2xl">
                {/* Window Header */}
                <div className="flex items-center gap-1.5 px-6 py-4 border-b border-white/5 bg-white/5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/20 border border-rose-500/40"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                  <div className="ml-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">GET /api/v1/mock-data</div>
                </div>

                {/* Code Body */}
                <div className="p-8 font-mono text-sm leading-relaxed">
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">01</span>
                    <span className="text-indigo-400">{"{"}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">02</span>
                    <span className="pl-4">
                      <span className="text-emerald-400">"status"</span>: <span className="text-indigo-300">"success"</span>,
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">03</span>
                    <span className="pl-4">
                      <span className="text-emerald-400">"message"</span>: <span className="text-indigo-300">"API Mock Rendered"</span>,
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">04</span>
                    <span className="pl-4">
                      <span className="text-emerald-400">"payload"</span>: <span className="text-white">{"["}</span>
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">05</span>
                    <span className="pl-10">
                      <span className="text-indigo-400">{"{"}</span> <span className="text-emerald-400">"id"</span>: <span className="text-amber-400">1</span>, <span className="text-emerald-400">"title"</span>: <span className="text-indigo-300">"Build faster"</span> <span className="text-indigo-400">{"}"}</span>
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">06</span>
                    <span className="pl-4">
                      <span className="text-white">{"]"}</span>
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">07</span>
                    <span className="text-indigo-400">{"}"}</span>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-8 py-4 border-t border-white/5 bg-white/5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-tighter">Response: 200 OK</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">142ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
