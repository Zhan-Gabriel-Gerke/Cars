"use client";

import { motion, type Variants } from "framer-motion";
import { ShieldCheck, Headphones, MapPin, Gem } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: ShieldCheck,
        title: "Guaranteed Model",
        description:
            "The car you book is exactly what you drive. No substitutes.",
    },
    {
        icon: Headphones,
        title: "24/7 Concierge",
        description:
            "Our dedicated team is available around the clock for anything you need.",
    },
    {
        icon: MapPin,
        title: "Door-to-Door",
        description:
            "We deliver to your hotel, villa, or terminal at a moment's notice.",
    },
    {
        icon: Gem,
        title: "Exclusive Perks",
        description:
            "Access to private events, partner discounts, and VIP benefits.",
    },
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 80, damping: 20 },
    },
};

export default function LifestyleSection() {
    return (
        <section id="experience" className="py-24 sm:py-32 bg-dark-900/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <motion.p
                            variants={item}
                            className="text-[11px] font-semibold tracking-[0.3em] text-gold-400 uppercase mb-4"
                        >
                            The Elite Standard
                        </motion.p>

                        <motion.h2
                            variants={item}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                        >
                            Beyond Rentals.
                            <br />
                            <span className="font-serif italic text-gold-400">
                                A Lifestyle.
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={item}
                            className="mt-6 text-dark-200 leading-relaxed max-w-lg"
                        >
                            Elite Cars isn&apos;t just about getting from A to B. It&apos;s about the
                            feeling of command, the smell of premium leather, and the sound of
                            engineering perfection. We provide white-glove concierge service
                            from booking to return.
                        </motion.p>

                        {/* Features Bento Grid */}
                        <motion.div
                            variants={container}
                            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5"
                        >
                            {features.map((feat) => {
                                const Icon = feat.icon;
                                return (
                                    <motion.div
                                        key={feat.title}
                                        variants={item}
                                        className="group rounded-xl border border-white/[0.06] bg-dark-800/30 p-5 backdrop-blur-sm transition-all duration-500 hover:border-gold-400/25 hover:bg-dark-800/50 hover:shadow-lg hover:shadow-gold-400/5"
                                    >
                                        <div className="mb-3 inline-flex rounded-lg bg-gold-400/10 p-2.5 text-gold-400 transition-colors duration-300 group-hover:bg-gold-400/20">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-sm font-bold text-white mb-1">
                                            {feat.title}
                                        </h3>
                                        <p className="text-xs text-dark-300 leading-relaxed">
                                            {feat.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                            <Image
                                src="/interior.png"
                                alt="Luxury car interior"
                                fill
                                className="object-cover"
                                quality={85}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
                            {/* Decorative border glow */}
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                        </div>
                        {/* Decorative accent */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gold-400/10 blur-2xl" />
                        <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-gold-400/5 blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
