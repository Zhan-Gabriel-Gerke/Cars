"use server";

import { signIn } from "@/auth";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
// @ts-expect-error - AuthError is not typed in this NextAuth beta version
import { AuthError } from "next-auth";

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

    // Auto sign-in
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });
    } catch (error: any) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
            throw error;
        }
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials during auto-login." };
                default:
                    return { error: "Something went wrong during auto-login." };
            }
        }
        // Fallback for NextAuth errors or Next.js internal redirects
        if (error?.message?.includes("NEXT_REDIRECT")) {
            throw error;
        }

        // Final fallback if signIn fails to redirect properly
        redirect("/auth/signin?registered=true");
    }

    return null;
}
