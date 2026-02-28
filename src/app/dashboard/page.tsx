import { requireAuth } from "@/lib/auth-guard";
import { signOut } from "@/auth";
import Link from "next/link";

export default async function DashboardPage() {
    const session = await requireAuth();

    return (
        <div className="min-h-screen bg-dark-950 pt-32 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <header className="flex items-center justify-between border-b border-white/10 pb-8 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Welcome back, <span className="font-serif italic text-gold-400">{session.user.name || "Member"}</span>
                        </h1>
                        <p className="text-dark-300">
                            Manage your reservations and exclusive perks.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-sm font-medium text-dark-200 transition-colors hover:text-white"
                        >
                            Back to Home
                        </Link>
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}
                        >
                            <button
                                type="submit"
                                className="rounded-sm border border-white/10 bg-dark-900/50 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-dark-900 relative z-50 cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Role Status (Debug) */}
                    <div className="rounded-xl border border-white/10 bg-dark-900/40 p-6 backdrop-blur-md">
                        <h2 className="text-sm font-medium text-dark-300 uppercase tracking-wider mb-4">
                            Account Status
                        </h2>
                        <div className="space-y-3">
                            <p className="text-sm text-white">
                                <span className="text-dark-400">Email:</span> {session.user.email}
                            </p>
                            <p className="text-sm text-white">
                                <span className="text-dark-400">Role:</span>{" "}
                                <span className="inline-flex rounded-full bg-gold-400/10 px-2.5 py-0.5 text-xs font-semibold text-gold-400 border border-gold-400/20">
                                    {session.user.role}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Admin Actions */}
                {session.user.role === "ADMIN" && (
                    <div className="mt-8 rounded-xl border border-gold-400/20 bg-dark-900/40 p-6 backdrop-blur-md">
                        <h2 className="text-sm font-medium text-gold-400 uppercase tracking-wider mb-4">
                            Admin Portal
                        </h2>
                        <div className="flex items-center">
                            <Link
                                href="/admin/fleet"
                                className="inline-flex items-center justify-center rounded-md bg-gold-400 px-6 py-3 text-sm font-semibold text-dark-950 transition-colors hover:bg-gold-300 uppercase tracking-wider"
                            >
                                Manage Fleet
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
