"use client";

import { motion, type Variants } from "framer-motion";
import {
    Shield,
    Clock,
    MapPin,
    Wrench,
    Plane,
    Sparkles,
} from "lucide-react";

const services = [
    {
        icon: Shield,
        title: "Full Insurance Coverage",
        description:
            "Comprehensive protection on every journey. Drive with absolute peace of mind knowing you're fully covered.",
    },
    {
        icon: Clock,
        title: "24/7 Concierge Support",
        description:
            "Round-the-clock personal assistance for anything you need — from route planning to restaurant reservations.",
    },
    {
        icon: MapPin,
        title: "Doorstep Delivery",
        description:
            "Your vehicle arrives wherever you are. Airport, hotel, or home — we deliver and collect at your convenience.",
    },
    {
        icon: Wrench,
        title: "Roadside Assistance",
        description:
            "Instant help anywhere, anytime. Our rapid response team ensures you're never stranded.",
    },
    {
        icon: Plane,
        title: "Airport Transfers",
        description:
            "Seamless luxury transitions. Step off your flight and into the driver's seat of an exotic vehicle.",
    },
    {
        icon: Sparkles,
        title: "Bespoke Experiences",
        description:
            "Curated driving tours, track days, and exclusive events tailored to the most discerning clients.",
    },
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

export default function ServicesSection() {
    return (
        <section id="services" className="relative py-28 bg-dark-900">
            {/* Decorative top gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <p className="text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase mb-4">
                        Premium Services
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                        Beyond the{" "}
                        <span className="font-serif italic text-gold-400">Drive</span>
                    </h2>
                    <p className="mt-5 text-dark-300 text-base sm:text-lg leading-relaxed">
                        Every detail is handled so you can focus on the experience.
                        World-class service at every touchpoint.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={item}
                            className="group relative rounded-lg border border-white/5 bg-dark-950/60 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold-400/20 hover:bg-dark-950/80"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative z-10">
                                <div className="mb-5 inline-flex rounded-md bg-gold-400/10 p-3">
                                    <service.icon className="h-6 w-6 text-gold-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-dark-300 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Decorative bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        </section>
    );
}
