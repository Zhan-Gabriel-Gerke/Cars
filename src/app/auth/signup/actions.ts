"use server";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function registerUser(prevState: { error: string } | null, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        return { error: "Missing required fields" };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "User with this email already exists" };
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "USER", // Default role
        },
    });

    // Redirect to signin page on success
    redirect("/auth/signin?registered=true");
}
