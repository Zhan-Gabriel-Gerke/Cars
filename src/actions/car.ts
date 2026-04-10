"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ===========================================
// Zod Schema for Validation
// ===========================================
const CarSchema = z.object({
    category: z.string().min(1, "Category is required"),
    name: z.string().min(1, "Name is required"),
    seats: z.coerce.number().min(1, "Must have at least 1 seat").max(20, "Too many seats"),
    topSpeed: z.coerce.number().min(50, "Top speed too low").max(600, "Top speed too high"),
    engine: z.string().min(1, "Engine is required"),
    transmission: z.string().min(1, "Transmission is required"),
    pricePerDay: z.coerce.number().min(0, "Price cannot be negative"),
    imageUrl: z.string().optional(),
});

export type CarActionState = {
    error?: string;
    fieldErrors?: {
        [K in keyof z.infer<typeof CarSchema>]?: string[];
    };
    success?: boolean;
};

// ===========================================
// Reusable Security Check
// ===========================================
async function verifyAdmin() {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("Unauthorized: Admin privileges required.");
    }
}

// ===========================================
// Server Actions
// ===========================================

export async function createCar(prevState: CarActionState, formData: FormData): Promise<CarActionState> {
    try {
        await verifyAdmin();

        const imageFile = formData.get("imageFile") as File | null;
        let finalImageUrl = formData.get("imageUrl") as string | null;

        if (!imageFile || imageFile.size === 0 || imageFile.name === "undefined") {
            return { error: "Image file is required." };
        }
        if (imageFile.size > 5 * 1024 * 1024) {
            return { error: "Image size exceeds 5MB limit." };
        }
        if (!imageFile.type.startsWith("image/")) {
            return { error: "Invalid file type. Only images are allowed." };
        }

        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const mimeType = imageFile.type;

        const rawData = {
            category: formData.get("category"),
            name: formData.get("name"),
            seats: formData.get("seats"),
            topSpeed: formData.get("topSpeed"),
            engine: formData.get("engine"),
            transmission: formData.get("transmission"),
            pricePerDay: formData.get("pricePerDay"),
            imageUrl: finalImageUrl || null,
        };

        const validatedFields = CarSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                fieldErrors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const car = await prisma.car.create({
            data: {
                ...validatedFields.data,
                image: buffer,
                mimeType,
            },
        });

        // Set the imageUrl pointing to the API route dynamically based on the DB ID.
        await prisma.car.update({
            where: { id: car.id },
            data: { imageUrl: `/api/images/${car.id}` },
        });

        revalidatePath("/admin/fleet");
        revalidatePath("/fleet");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Failed to create car:", error);
        return { error: error.message || "Failed to create car." };
    }
}

export async function updateCar(id: string, prevState: CarActionState, formData: FormData): Promise<CarActionState> {
    try {
        await verifyAdmin();

        const imageFile = formData.get("imageFile") as File | null;
        let finalImageUrl = formData.get("imageUrl") as string | null;

        let buffer: Buffer | undefined;
        let mimeType: string | undefined;

        if (imageFile && imageFile.name && imageFile.name !== "undefined" && imageFile.size > 0) {
            if (imageFile.size > 5 * 1024 * 1024) {
                return { error: "Image size exceeds 5MB limit." };
            }
            if (!imageFile.type.startsWith("image/")) {
                return { error: "Invalid file type. Only images are allowed." };
            }
            buffer = Buffer.from(await imageFile.arrayBuffer());
            mimeType = imageFile.type;
        }

        const rawData = {
            category: formData.get("category"),
            name: formData.get("name"),
            seats: formData.get("seats"),
            topSpeed: formData.get("topSpeed"),
            engine: formData.get("engine"),
            transmission: formData.get("transmission"),
            pricePerDay: formData.get("pricePerDay"),
            imageUrl: finalImageUrl || null,
        };

        const validatedFields = CarSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                fieldErrors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const updateData: any = { ...validatedFields.data };
        if (buffer && mimeType) {
            updateData.image = buffer;
            updateData.mimeType = mimeType;
            updateData.imageUrl = `/api/images/${id}`;
        }

        await prisma.car.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/admin/fleet");
        revalidatePath("/fleet");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Failed to update car:", error);
        return { error: error.message || "Failed to update car." };
    }
}

export async function deleteCar(id: string) {
    try {
        await verifyAdmin();

        await prisma.car.delete({
            where: { id },
        });

        revalidatePath("/admin/fleet");
        revalidatePath("/fleet");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete car:", error);
        return { error: error.message || "Failed to delete car." };
    }
}
