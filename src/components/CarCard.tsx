"use client";

import { motion } from "framer-motion";
import { Users, Gauge, Fuel, Settings, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Car } from "@/types/car";

interface CarCardProps {
    car: Car;
    index: number;
}

export function CarCard({ car, index }: CarCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
            className="group relative rounded-xl border border-white/[0.06] bg-dark-900/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-gold-400/30 hover:shadow-lg hover:shadow-gold-400/5 hover:scale-[1.02] flex flex-col min-w-[280px]"
        >
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
                <span className="rounded-full bg-dark-800/80 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-gold-400 uppercase backdrop-blur-sm border border-white/5 shadow-sm">
                    {car.category}
                </span>
            </div>

            {/* Car Image Placeholder or next/image */}
            <div className="relative h-48 bg-gradient-to-b from-dark-800/50 to-dark-900 flex items-center justify-center overflow-hidden">
                {car.imageUrl ? (
                    <Image
                        src={car.imageUrl}
                        alt={car.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                ) : (
                    <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-110 transform">
                        🏎️
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col flex-1 space-y-4">
                <div className="flex-1">
                    <h3 className="line-clamp-2 text-lg font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
                        {car.name}
                    </h3>
                </div>

                {/* Specs Row */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 text-dark-300 text-xs">
                        <span className="text-dark-400"><Users className="h-3.5 w-3.5" /></span>
                        <span>{car.seats}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-dark-300 text-xs">
                        <span className="text-dark-400"><Gauge className="h-3.5 w-3.5" /></span>
                        <span>{car.topSpeed}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-dark-300 text-xs">
                        <span className="text-dark-400"><Fuel className="h-3.5 w-3.5" /></span>
                        <span>{car.engine}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-dark-300 text-xs">
                        <span className="text-dark-400"><Settings className="h-3.5 w-3.5" /></span>
                        <span>{car.transmission}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/[0.06]" />

                {/* Price + Reserve */}
                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-xl font-bold text-gold-400">${car.pricePerDay.toLocaleString()}</span>
                        <span className="text-xs text-dark-400 ml-1">/day</span>
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
