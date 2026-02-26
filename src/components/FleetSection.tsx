"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Gauge, Fuel, Settings, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CarSpec {
    icon: React.ReactNode;
    value: string;
}

interface CarCardProps {
    name: string;
    category: string;
    price: string;
    period: string;
    imageBg: string;
    specs: CarSpec[];
    index: number;
}

const cars: Omit<CarCardProps, "index">[] = [
    {
        name: "Lamborghini Aventador",
        category: "SPORTS",
        price: "$2,800",
        period: "/day",
        imageBg: "from-amber-900/20 to-dark-900",
        specs: [
            { icon: <Users className="h-3.5 w-3.5" />, value: "2" },
            { icon: <Gauge className="h-3.5 w-3.5" />, value: "350" },
            { icon: <Fuel className="h-3.5 w-3.5" />, value: "V12" },
            { icon: <Settings className="h-3.5 w-3.5" />, value: "Auto" },
        ],
    },
    {
        name: "Rolls-Royce Phantom",
        category: "ULTRA LUXURY",
        price: "$5,200",
        period: "/day",
        imageBg: "from-slate-800/30 to-dark-900",
        specs: [
            { icon: <Users className="h-3.5 w-3.5" />, value: "4" },
            { icon: <Gauge className="h-3.5 w-3.5" />, value: "250" },
            { icon: <Fuel className="h-3.5 w-3.5" />, value: "V12" },
            { icon: <Settings className="h-3.5 w-3.5" />, value: "Auto" },
        ],
    },
    {
        name: "Porsche 911 GT3",
        category: "SPORTS",
        price: "$1,950",
        period: "/day",
        imageBg: "from-emerald-900/20 to-dark-900",
        specs: [
            { icon: <Users className="h-3.5 w-3.5" />, value: "2" },
            { icon: <Gauge className="h-3.5 w-3.5" />, value: "318" },
            { icon: <Fuel className="h-3.5 w-3.5" />, value: "H6" },
            { icon: <Settings className="h-3.5 w-3.5" />, value: "PDK" },
        ],
    },
    {
        name: "Ferrari SF90 Stradale",
        category: "HYPERCAR",
        price: "$3,500",
        period: "/day",
        imageBg: "from-red-900/20 to-dark-900",
        specs: [
            { icon: <Users className="h-3.5 w-3.5" />, value: "2" },
            { icon: <Gauge className="h-3.5 w-3.5" />, value: "340" },
            { icon: <Fuel className="h-3.5 w-3.5" />, value: "V8+E" },
            { icon: <Settings className="h-3.5 w-3.5" />, value: "Auto" },
        ],
    },
];

function CarCard({ name, category, price, period, specs, index }: CarCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
            className="group relative rounded-xl border border-white/[0.06] bg-dark-900/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-gold-400/30 hover:shadow-lg hover:shadow-gold-400/5 hover:scale-[1.02]"
        >
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
                <span className="rounded-full bg-dark-800/80 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-gold-400 uppercase backdrop-blur-sm border border-white/5">
                    {category}
                </span>
            </div>

            {/* Car Image Placeholder */}
            <div className="relative h-48 bg-gradient-to-b from-dark-800/50 to-dark-900 flex items-center justify-center overflow-hidden">
                <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-110 transform">
                    🏎️
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-4">
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
                        {name}
                    </h3>
                </div>

                {/* Specs Row */}
                <div className="flex items-center gap-3">
                    {specs.map((spec, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-1.5 text-dark-300 text-xs"
                        >
                            <span className="text-dark-400">{spec.icon}</span>
                            <span>{spec.value}</span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/[0.06]" />

                {/* Price + Reserve */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-gold-400">{price}</span>
                        <span className="text-xs text-dark-400 ml-1">{period}</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-gold-400 uppercase tracking-wider transition-all duration-300 hover:gap-3 group/btn">
                        Reserve
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function FleetSection() {
    return (
        <section id="fleet" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 80, damping: 20 }}
                            className="text-[11px] font-semibold tracking-[0.3em] text-gold-400 uppercase mb-3"
                        >
                            Our Selection
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
                            className="text-4xl sm:text-5xl font-serif font-bold text-white"
                        >
                            Curated Fleet
                        </motion.h2>
                    </div>

                    {/* Arrows */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="hidden sm:flex items-center gap-2"
                    >
                        <button className="p-2.5 rounded-full border border-white/10 text-dark-300 transition-all duration-300 hover:border-gold-400/50 hover:text-gold-400 hover:bg-gold-400/5">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button className="p-2.5 rounded-full border border-white/10 text-dark-300 transition-all duration-300 hover:border-gold-400/50 hover:text-gold-400 hover:bg-gold-400/5">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </motion.div>
                </div>

                {/* Car Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {cars.map((car, i) => (
                        <CarCard key={car.name} {...car} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
