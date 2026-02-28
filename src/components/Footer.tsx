"use client";

import { motion } from "framer-motion";
import { Crown, Info } from "lucide-react";
import { toast } from "sonner";
import NewsletterForm from "./NewsletterForm";

const exploreLinks = ["The Fleet", "Chauffeur Service", "Wedding Cars", "Corporate Events"];
const companyLinks = ["About Us", "Testimonials", "Careers", "Press"];

export default function Footer() {
    const handleMockLink = (e: React.MouseEvent, linkName: string) => {
        e.preventDefault();
        toast("Portfolio Demo", {
            description: `The ${linkName} page is not implemented for this demonstration.`,
            icon: <Info className="h-5 w-5 text-gold-400" />,
        });
    };

    return (
        <footer id="contact" className="border-t border-white/[0.06] bg-dark-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        className="sm:col-span-2 lg:col-span-1"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Crown className="h-5 w-5 text-gold-400" />
                            <span className="text-base font-bold tracking-widest text-white uppercase">
                                Elite Cars
                            </span>
                        </div>
                        <p className="text-sm text-dark-300 leading-relaxed max-w-xs">
                            Redefining luxury mobility for the modern connoisseur — our world-class fleet of exotic automobiles await.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-6">
                            {["IG", "TW", "LI"].map((s) => (
                                <a
                                    key={s}
                                    href="#"
                                    onClick={(e) => handleMockLink(e, `${s} Profile`)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-xs font-bold text-dark-300 transition-all duration-300 hover:border-gold-400/50 hover:text-gold-400 hover:bg-gold-400/5"
                                >
                                    {s}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Explore */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
                    >
                        <h4 className="text-[11px] font-semibold tracking-[0.2em] text-dark-400 uppercase mb-5">
                            Explore
                        </h4>
                        <ul className="space-y-3">
                            {exploreLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleMockLink(e, link)}
                                        className="text-sm text-dark-300 transition-colors duration-300 hover:text-gold-400"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
                    >
                        <h4 className="text-[11px] font-semibold tracking-[0.2em] text-dark-400 uppercase mb-5">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleMockLink(e, link)}
                                        className="text-sm text-dark-300 transition-colors duration-300 hover:text-gold-400"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
                    >
                        <h4 className="text-[11px] font-semibold tracking-[0.2em] text-dark-400 uppercase mb-5">
                            Newsletter
                        </h4>
                        <p className="text-sm text-dark-300 mb-4">
                            Join the inner circle for exclusive offers.
                        </p>
                        <NewsletterForm />
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] py-6">
                    <p className="text-xs text-dark-500">
                        &copy; 2026 Elite Cars Group. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" onClick={(e) => handleMockLink(e, "Privacy Policy")} className="text-xs text-dark-500 transition-colors hover:text-dark-300">
                            Privacy Policy
                        </a>
                        <a href="#" onClick={(e) => handleMockLink(e, "Terms of Service")} className="text-xs text-dark-500 transition-colors hover:text-dark-300">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
