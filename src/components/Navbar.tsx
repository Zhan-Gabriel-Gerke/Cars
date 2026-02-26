"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
    { label: "Fleet", href: "#fleet" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { data: session, status } = useSession();

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Crown className="h-6 w-6 text-gold-400 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-lg font-bold tracking-widest text-white uppercase">
                            Elite Cars
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={`/${link.href}`}
                                className="text-sm font-medium tracking-wider text-dark-200 uppercase transition-colors duration-300 hover:text-gold-400"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        {status === "authenticated" ? (
                            <>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="text-sm font-medium text-dark-200 transition-colors hover:text-white"
                                >
                                    Sign Out
                                </button>
                                <Link
                                    href="/dashboard"
                                    className="rounded-sm bg-gold-400 px-5 py-2.5 text-sm font-semibold text-dark-950 uppercase tracking-wider transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/20"
                                >
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/signin"
                                    className="text-sm font-medium text-dark-200 transition-colors hover:text-white"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signin"
                                    className="rounded-sm bg-gold-400 px-5 py-2.5 text-sm font-semibold text-dark-950 uppercase tracking-wider transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/20"
                                >
                                    Member Access
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-white p-2"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="md:hidden overflow-hidden backdrop-blur-xl bg-dark-950/95 border-b border-white/5"
                    >
                        <div className="px-6 py-6 space-y-4">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-lg font-medium text-dark-200 transition-colors hover:text-gold-400"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <div className="pt-4 border-t border-white/10 space-y-3">
                                {status === "authenticated" ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                setMobileOpen(false);
                                                signOut({ callbackUrl: "/" });
                                            }}
                                            className="block w-full text-left text-dark-200 hover:text-white transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setMobileOpen(false)}
                                            className="block w-full text-center rounded-sm bg-gold-400 px-5 py-2.5 text-sm font-semibold text-dark-950 uppercase tracking-wider"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/auth/signin"
                                            onClick={() => setMobileOpen(false)}
                                            className="block w-full text-left text-dark-200 hover:text-white transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/auth/signin"
                                            onClick={() => setMobileOpen(false)}
                                            className="block w-full text-center rounded-sm bg-gold-400 px-5 py-2.5 text-sm font-semibold text-dark-950 uppercase tracking-wider"
                                        >
                                            Member Access
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
