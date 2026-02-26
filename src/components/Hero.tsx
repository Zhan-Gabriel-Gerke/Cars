"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 80, damping: 20 },
    },
};

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-car.png"
                    alt="Luxury sports car"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                <div className="absolute inset-0 bg-dark-950/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-3xl"
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-gold-400 uppercase mb-6"
                    >
                        The 2026 Collection
                    </motion.p>

                    <motion.h1
                        variants={fadeUp}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
                    >
                        Unrivaled Luxury.
                    </motion.h1>

                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-gold-400 mt-2 leading-[1.1]"
                    >
                        Unforgettable
                        <br />
                        Journeys.
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="mt-8 max-w-xl text-base sm:text-lg text-dark-200 leading-relaxed"
                    >
                        Redefine the driving experience with unmatched perfection —
                        with our world-class fleet of exotic supercars, handcrafted
                        for those who demand excellence.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <a
                            href="#fleet"
                            className="inline-flex items-center gap-2 rounded-sm bg-gold-400 px-8 py-3.5 text-sm font-semibold text-dark-950 uppercase tracking-wider transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/25"
                        >
                            Explore Fleet
                        </a>
                        <a
                            href="#experience"
                            className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-gold-400/50"
                        >
                            Our Experience
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom fade for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent z-10" />
        </section>
    );
}
