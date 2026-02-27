import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// @ts-expect-error - CredentialsSignin is not typed
import { CredentialsSignin, AuthError } from "next-auth";
import Link from "next/link";

export default async function SignInPage(
    props: {
        searchParams: Promise<{ callbackUrl?: string; error?: string; registered?: string }>;
    }
) {
    const searchParams = await props.searchParams;
    const error = searchParams?.error;
    const registered = searchParams?.registered;

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-dark-900/60 p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-center mb-10">
                    <p className="text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase mb-4">
                        Elite Cars
                    </p>
                    <h1 className="text-3xl font-bold text-white mb-2">Member Access</h1>
                    <p className="text-dark-300 text-sm">
                        Sign in to access your exclusive benefits.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-md bg-red-500/10 border border-red-500/20 p-4 text-center">
                        <p className="text-sm text-red-400">
                            Invalid email or password. Please try again.
                        </p>
                    </div>
                )}

                {registered && (
                    <div className="mb-6 rounded-md bg-green-500/10 border border-green-500/20 p-4 text-center">
                        <p className="text-sm text-green-400">
                            Account created successfully! Please sign in.
                        </p>
                    </div>
                )}

                <form
                    action={async (formData) => {
                        "use server";
                        try {
                            await signIn("credentials", formData);
                        } catch (error: any) {
                            console.log("LOGIN CATCH:", {
                                name: error?.name,
                                message: error?.message,
                                type: error?.type,
                            });

                            // Check if it's a redirect error from next/navigation
                            if (error?.message === "NEXT_REDIRECT") {
                                // Let Next.js handle it
                                throw error;
                            }

                            // If it's an AuthError or CredentialsSignin, redirect manually
                            if (error?.name === "CredentialsSignin" || error?.type === "CredentialsSignin" || error instanceof CredentialsSignin || error?.name === "u") {
                                revalidatePath("/auth/signin");
                                redirect("/auth/signin?error=CredentialsSignin");
                            }

                            // Fallback for NextAuth errors
                            if (error?.message?.includes("Credential") || String(error).includes("Credentials") || error?.message?.includes("errors.authjs.dev")) {
                                revalidatePath("/auth/signin");
                                redirect("/auth/signin?error=CredentialsSignin");
                            }

                            throw error;
                        }
                    }}
                    className="space-y-6"
                >
                    <input
                        type="hidden"
                        name="redirectTo"
                        value={searchParams.callbackUrl || "/dashboard"}
                    />

                    <div>
                        <label className="block text-sm font-medium text-dark-200 mb-2">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="admin@elitecars.com"
                            className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-3 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-dark-200">
                                Password
                            </label>
                            <a href="#" className="text-xs text-gold-400 hover:text-gold-300 transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-3 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-sm bg-gold-400 px-4 py-3 text-sm font-semibold text-dark-950 uppercase tracking-wider transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/20"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center bg-dark-950/30 p-4 rounded-lg border border-white/5">
                    <p className="text-sm text-dark-300 mb-3">
                        Don't have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="font-medium text-gold-400 hover:text-gold-300 transition-colors"
                        >
                            Create one now
                        </Link>
                    </p>
                    <div className="border-t border-white/5 pt-3 mt-3">
                        <p className="text-xs text-dark-400">
                            Demo: admin@elitecars.com / admin123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
