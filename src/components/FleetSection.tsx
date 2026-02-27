import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Car } from "@/types/car";
import { CarCarousel } from "@/components/CarCarousel";

// Simulate database fetch
async function getCuratedFleet(): Promise<Car[]> {
    return [
        {
            id: "1",
            category: "SPORTS",
            name: "Lamborghini Aventador",
            seats: 2,
            topSpeed: 350,
            engine: "V12",
            transmission: "Auto",
            pricePerDay: 2800,
            imageUrl: "", // Left empty to show the placeholder emoji per original UI
        },
        {
            id: "2",
            category: "ULTRA LUXURY",
            name: "Rolls-Royce Phantom",
            seats: 4,
            topSpeed: 250,
            engine: "V12",
            transmission: "Auto",
            pricePerDay: 5200,
            imageUrl: "",
        },
        {
            id: "3",
            category: "SPORTS",
            name: "Porsche 911 GT3",
            seats: 2,
            topSpeed: 318,
            engine: "H6",
            transmission: "PDK",
            pricePerDay: 1950,
            imageUrl: "",
        },
        {
            id: "4",
            category: "HYPERCAR",
            name: "Ferrari SF90 Stradale",
            seats: 2,
            topSpeed: 340,
            engine: "V8+E",
            transmission: "Auto",
            pricePerDay: 3500,
            imageUrl: "",
        },
    ];
}

export default async function FleetSection() {
    const cars = await getCuratedFleet();

    return (
        <section id="fleet" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-end justify-between mb-12 relative">
                    <div>
                        <p className="text-[11px] font-semibold tracking-[0.3em] text-gold-400 uppercase mb-3">
                            Our Selection
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white flex items-center gap-6">
                            Curated Fleet

                            <Link
                                href="/fleet"
                                className="hidden sm:flex items-center gap-2 mt-2 text-sm font-sans font-semibold text-gold-400 uppercase tracking-wider transition-all duration-300 hover:text-gold-300 group"
                            >
                                View All Fleet
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </h2>
                    </div>
                </div>

                {/* Car Carousel Client Component */}
                <CarCarousel cars={cars} />

                {/* Mobile View All button */}
                <div className="mt-8 flex justify-center sm:hidden">
                    <Link
                        href="/fleet"
                        className="flex items-center gap-2 text-sm font-semibold text-gold-400 uppercase tracking-wider transition-all duration-300 hover:text-gold-300 group border border-gold-400/20 px-6 py-3 rounded-full hover:bg-gold-400/5"
                    >
                        View All Fleet
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
