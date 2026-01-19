import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Database, Layers, Globe } from "lucide-react";
import JsonDemoCard from "@/components/website/Demo/JsonDemoCard";

export default function DemoPage() {
    const demos = [
        {
            title: "E-Commerce Products",
            endpoint: "GET /api/v1/products",
            data: {
                status: "success",
                total: 2,
                products: [
                    {
                        id: "p1",
                        name: "Premium Headphones",
                        price: 299.99,
                        category: "Electronics",
                        stock: 15,
                        rating: 4.8,
                        images: ["h1.jpg", "h2.jpg"]
                    },
                    {
                        id: "p2",
                        name: "Mechanical Keyboard",
                        price: 149.50,
                        category: "Peripherals",
                        stock: {
                            status: "in_stock",
                            quantity: 42
                        }
                    }
                ]
            }
        },
        {
            title: "User Profile Data",
            endpoint: "GET /api/v1/users/me",
            data: {
                id: "usr_882",
                profile: {
                    username: "arif_ahmed",
                    full_name: "Arif Ahmed",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg",
                    bio: "Frontend Developer & MockAPI Enthusiast"
                },
                stats: {
                    projects: 12,
                    endpoints_created: 156,
                    active_since: "2024-01-15T10:30:00Z"
                },
                tags: ["Premium", "Early Adopter"]
            }
        },
        {
            title: "Analytics Overview",
            endpoint: "GET /api/v1/dashboard/stats",
            data: {
                period: "Last 30 Days",
                metrics: {
                    total_revenue: {
                        value: 45280.00,
                        currency: "USD",
                        growth: "+12.5%"
                    },
                    active_users: 12450,
                    bounce_rate: 0.34
                },
                top_regions: [
                    { country: "USA", traffic: 4500 },
                    { country: "GER", traffic: 2800 }
                ]
            }
        },
        {
            title: "Weather Service",
            endpoint: "GET /api/v1/weather/london",
            data: {
                location: "London, UK",
                coordinates: { lat: 51.5074, lon: -0.1278 },
                current: {
                    temp_c: 14,
                    condition: "Partly Cloudy",
                    wind_kph: 12,
                    humidity: 68
                },
                forecast: [
                    { day: "Tue", max: 16, min: 10 },
                    { day: "Wed", max: 15, min: 9 }
                ]
            }
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-indigo-500/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-violet-600/5 blur-[120px] rounded-full"></div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:scale-105 transition-transform"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div className="hidden h-6 w-px bg-slate-200 dark:bg-white/10 sm:block"></div>
                        <div className="flex items-center gap-3">
                            <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Watch Demo</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95"
                        >
                            Start Free
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 py-16 px-6 sm:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 max-w-2xl">
                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                            Professional <span className="text-indigo-600">Mock Data</span> Gallery.
                        </h2>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Explore our curated sets of industry-standard JSON responses.
                            Designed for developers who demand clean architecture and instant reliability.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Database, title: "Structured Schema", desc: "Predictable, nested JSON objects for complex apps." },
                            { icon: Layers, title: "Industry Ready", desc: "Templates for e-commerce, social, weather, and more." },
                            { icon: Globe, title: "CDN Fast", desc: "Simulated low-latency responses for real-world testing." }
                        ].map((f, i) => (
                            <div key={i} className="flex flex-col gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                                    <f.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{f.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Demo Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {demos.map((demo, index) => (
                            <JsonDemoCard
                                key={index}
                                title={demo.title}
                                endpoint={demo.endpoint}
                                data={demo.data}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer Meta */}
            <footer className="relative z-10 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/5 py-12 px-6">
                <div className="mx-auto max-w-7xl text-center">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
                        MockAPI Service &copy; {new Date().getFullYear()} &bull; Professional Developer Tools
                    </p>
                </div>
            </footer>
        </div>
    );
}
