"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

export default function SearchBar() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 1.2 }}
            className="relative z-20 -mt-16 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        >
            <div className="rounded-2xl border border-white/10 bg-dark-900/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-black/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-semibold tracking-[0.2em] text-dark-300 uppercase">
                            Pick-up Location
                        </label>
                        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-dark-800/50 px-4 py-3 transition-all duration-300 focus-within:border-gold-400/50 focus-within:shadow-sm focus-within:shadow-gold-400/10">
                            <MapPin className="h-4 w-4 text-gold-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="City, Airport, or Hotel"
                                className="w-full bg-transparent text-sm text-white placeholder:text-dark-400 outline-none"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-semibold tracking-[0.2em] text-dark-300 uppercase">
                            Select Date
                        </label>
                        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-dark-800/50 px-4 py-3 transition-all duration-300 focus-within:border-gold-400/50 focus-within:shadow-sm focus-within:shadow-gold-400/10">
                            <Calendar className="h-4 w-4 text-gold-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Select Date"
                                className="w-full bg-transparent text-sm text-white placeholder:text-dark-400 outline-none"
                            />
                        </div>
                    </div>

                    {/* Trip Type */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-semibold tracking-[0.2em] text-dark-300 uppercase">
                            Trip Type
                        </label>
                        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-dark-800/50 px-4 py-3 transition-all duration-300 focus-within:border-gold-400/50">
                            <select className="w-full bg-transparent text-sm text-white outline-none cursor-pointer appearance-none">
                                <option value="one-way" className="bg-dark-800">One-Way</option>
                                <option value="round-trip" className="bg-dark-800">Round Trip</option>
                                <option value="multi-city" className="bg-dark-800">Multi-City</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-gold-400 px-6 py-3.5 text-sm font-semibold text-dark-950 uppercase tracking-wider transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/20 group">
                        Search
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
