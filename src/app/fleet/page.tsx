import { prisma } from "@/lib/prisma";
import { CarCard } from "@/components/CarCard";

export const metadata = {
    title: "Our Fleet - Elite Cars",
    description: "Browse our entire collection of premium sports, luxury, and hypercars.",
};

export const dynamic = "force-dynamic";

export default async function FleetPage() {
    // Fetch all cars from the database, ordered newest first
    const cars = await prisma.car.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <main className="min-h-screen bg-dark-950 pt-32 pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16">
                    <h2 className="text-sm font-semibold tracking-widest text-gold-400 uppercase mb-3">
                        Entire Collection
                    </h2>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
                        Our Fleet
                    </h1>
                </div>

                {/* Grid */}
                {cars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((car, index) => (
                            <div key={car.id} className="w-full h-full">
                                <CarCard car={car} index={index} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 border border-white/10 rounded-2xl bg-dark-900/30 backdrop-blur-sm">
                        <p className="text-dark-400 text-lg">
                            Our fleet is currently being updated. Please check back later.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
