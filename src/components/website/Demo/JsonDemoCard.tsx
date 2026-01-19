"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface JsonDemoCardProps {
    title: string;
    endpoint: string;
    data: any;
}

export default function JsonDemoCard({ title, endpoint, data }: JsonDemoCardProps) {
    const [copied, setCopied] = useState(false);
    const jsonString = JSON.stringify(data, null, 2);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const highlightJSON = (json: string) => {
        return json.split("\n").map((line, i) => {
            // Basic syntax highlighting with regex
            const highlightedLine = line
                .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
                    let cls = "text-white";
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = "text-indigo-400"; // Key
                        } else {
                            cls = "text-emerald-400"; // String
                        }
                    } else if (/true|false/.test(match)) {
                        cls = "text-violet-400"; // Boolean
                    } else if (/null/.test(match)) {
                        cls = "text-slate-400"; // Null
                    } else {
                        cls = "text-amber-400"; // Number
                    }
                    return `<span class="${cls}">${match}</span>`;
                });

            return (
                <div key={i} className="flex gap-4 group/line px-6 hover:bg-white/5 transition-colors">
                    <span className="w-10 text-right text-slate-600 select-none text-[11px] font-mono leading-6 mt-[2px]">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                        className="text-slate-300 font-mono leading-6"
                        dangerouslySetInnerHTML={{ __html: highlightedLine }}
                    />
                </div>
            );
        });
    };

    return (
        <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-all hover:border-indigo-500/30">
            {/* Background Glow */}
            <div className="absolute inset-0 z-0 bg-linear-to-br from-indigo-500/5 to-violet-500/5 transition-opacity opacity-0 group-hover:opacity-100"></div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-rose-500/20 border border-rose-500/40"></div>
                        <div className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                        <div className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest">{title}</h3>
                        <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">{endpoint}</p>
                    </div>
                </div>

                <button
                    onClick={handleCopy}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-500/50 transition-all shadow-sm active:scale-95"
                >
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
            </div>

            {/* Body */}
            <div className="relative z-10 py-6 overflow-x-auto custom-scrollbar">
                <div className="min-w-fit">
                    {highlightJSON(jsonString)}
                </div>
            </div>

            {/* Footer Info */}
            <div className="relative z-10 flex items-center justify-between px-6 py-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/5 text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                <span>Application/JSON</span>
                <span>{jsonString.length} Bytes</span>
            </div>
        </div>
    );
}
