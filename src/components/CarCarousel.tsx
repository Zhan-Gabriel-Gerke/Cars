"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Car } from "@/types/car";
import { CarCard } from "@/components/CarCard";

interface CarCarouselProps {
    cars: Car[];
}

export function CarCarousel({ cars }: CarCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350; // Approximate width of a card + gap
            const currentScroll = scrollContainerRef.current.scrollLeft;

            scrollContainerRef.current.scrollTo({
                left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="relative">
            {/* Header / Arrows */}
            <div className="absolute -top-20 right-0 hidden sm:flex items-center gap-2">
                <button
                    onClick={() => scroll("left")}
                    className="p-2.5 rounded-full border border-white/10 text-dark-300 transition-all duration-300 hover:border-gold-400/50 hover:text-gold-400 hover:bg-gold-400/5"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    onClick={() => scroll("right")}
                    className="p-2.5 rounded-full border border-white/10 text-dark-300 transition-all duration-300 hover:border-gold-400/50 hover:text-gold-400 hover:bg-gold-400/5"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-5 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {cars.map((car, i) => (
                    <div key={car.id} className="snap-start shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]">
                        <CarCard car={car} index={i} />
                    </div>
                ))}
            </div>

            {/* Standard Grid Fallback / Container Alternative for smaller lists if needed */}
            {cars.length === 0 && (
                <div className="text-center py-20 text-dark-400 border border-white/5 rounded-2xl bg-dark-900/30">
                    No vehicles currently available in the fleet.
                </div>
            )}
        </div>
    );
}
