import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return new NextResponse("Invalid ID", { status: 400 });
    }

    try {
        const car = await prisma.car.findUnique({
            where: { id },
            select: { image: true, mimeType: true },
        });

        if (!car || !car.image || !car.mimeType) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return new NextResponse(car.image, {
            status: 200,
            headers: {
                "Content-Type": car.mimeType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error fetching image:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
