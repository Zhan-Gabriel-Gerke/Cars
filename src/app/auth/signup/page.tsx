"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "./actions";

export default function SignUpPage() {
    const [state, formAction, pending] = useActionState(registerUser, null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-dark-900/60 p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-center mb-10">
                    <p className="text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase mb-4">
                        Elite Cars
                    </p>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-dark-300 text-sm">
                        Join us to reserve your dream car today.
                    </p>
                </div>

                {state?.error && (
                    <div className="mb-6 rounded-md bg-red-500/10 border border-red-500/20 p-4 text-center">
                        <p className="text-sm text-red-400">{state.error}</p>
                    </div>
                )}

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-2">
                            Full Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-3 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-2">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-3 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-2">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            placeholder="••••••••"
                            className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-3 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full rounded-sm bg-gold-400 px-4 py-3 text-sm font-semibold text-dark-950 uppercase tracking-wider transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {pending ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 text-center bg-dark-950/30 p-4 rounded-lg border border-white/5">
                    <p className="text-sm text-dark-300">
                        Already have an account?{" "}
                        <Link
                            href="/auth/signin"
                            className="font-medium text-gold-400 hover:text-gold-300 transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
