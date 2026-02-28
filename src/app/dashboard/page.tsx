import { requireAuth } from "@/lib/auth-guard";
import { signOut } from "@/auth";
import Link from "next/link";
import { Calendar, Award, User } from "lucide-react";
import ViewBenefitsButton from "@/components/ViewBenefitsButton";

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

                    {/* Account Status */}
                    <div className="rounded-xl border border-white/10 bg-dark-900/40 p-6 backdrop-blur-md flex flex-col justify-between">
                        <div>
                            <h2 className="text-sm font-medium text-dark-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <User className="h-4 w-4 text-gold-400" />
                                Account Status
                            </h2>
                            <div className="space-y-3">
                                <p className="text-sm text-white">
                                    <span className="text-dark-400">Email:</span> {session.user.email}
                                </p>
                                <p className="text-sm text-white flex items-center gap-2">
                                    <span className="text-dark-400">Role:</span>
                                    <span className="inline-flex rounded-full bg-gold-400/10 px-2.5 py-0.5 text-xs font-semibold text-gold-400 border border-gold-400/20">
                                        {session.user.role}
                                    </span>
                                </p>
                                <p className="text-xs text-dark-400 mt-4 italic">
                                    (Demo Mode) Profile editing is disabled.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Active Reservations */}
                    <div className="rounded-xl border border-white/10 bg-dark-900/40 p-6 backdrop-blur-md flex flex-col justify-between">
                        <div>
                            <h2 className="text-sm font-medium text-dark-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gold-400" />
                                Active Reservations
                            </h2>
                            <div className="flex flex-col items-center justify-center py-4 text-center">
                                <p className="text-sm text-dark-400 mb-2">You have no upcoming trips.</p>
                            </div>
                        </div>
                        <Link
                            href="/#fleet"
                            className="mt-4 w-full rounded-md border border-gold-400/30 bg-gold-400/5 px-4 py-2.5 text-center text-sm font-medium text-gold-400 transition-colors hover:bg-gold-400 hover:text-dark-950"
                        >
                            Book a Vehicle
                        </Link>
                    </div>

                    {/* Elite Status */}
                    <div className="rounded-xl border border-white/10 bg-dark-900/40 p-6 backdrop-blur-md flex flex-col justify-between">
                        <div>
                            <h2 className="text-sm font-medium text-dark-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Award className="h-4 w-4 text-gold-400" />
                                Elite Tier
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white font-medium">Gold Member</span>
                                        <span className="text-gold-400">2,450 pts</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-dark-800 overflow-hidden">
                                        <div className="h-full bg-gold-400 w-[65%] rounded-full"></div>
                                    </div>
                                    <p className="text-xs text-dark-400 mt-2">550 pts to Platinum Tier</p>
                                </div>
                            </div>
                        </div>
                        <ViewBenefitsButton />
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
