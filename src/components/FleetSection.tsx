import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CarCarousel } from "@/components/CarCarousel";
import { prisma } from "@/lib/prisma";

// Fetch up to 4 cars from the real database for the Curated Fleet section
async function getCuratedFleet() {
    return await prisma.car.findMany({
        take: 4,
        orderBy: {
            createdAt: "desc"
        }
    });
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
