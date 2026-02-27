import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminCarsTable } from "@/components/admin/AdminCarsTable";

export const metadata = {
    title: "Admin - Fleet Management",
};

export default async function AdminFleetPage() {
    const session = await auth();

    // Extra layer of protection on the server component
    if (!session || session.user?.role !== "ADMIN") {
        redirect("/");
    }

    // Fetch all cars ordered by newest
    const cars = await prisma.car.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <div className="min-h-screen bg-dark-950 p-6 pt-24">
            <div className="max-w-6xl mx-auto">
                <AdminCarsTable cars={cars} />
            </div>
        </div>
    );
}
