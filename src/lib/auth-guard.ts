import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Server-side guard for pages/components that require a specific role.
 * Use in Server Components or Server Actions.
 *
 * @example
 * // In a Server Component:
 * export default async function AdminPage() {
 *   const session = await requireRole("ADMIN");
 *   return <div>Welcome, {session.user.name}</div>;
 * }
 */
export async function requireRole(role: string) {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    if (session.user?.role !== role) {
        redirect("/unauthorized");
    }

    return session;
}

/**
 * Server-side guard that requires any authenticated user.
 *
 * @example
 * export default async function DashboardPage() {
 *   const session = await requireAuth();
 *   return <div>Welcome, {session.user.name}</div>;
 * }
 */
export async function requireAuth() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    return session;
}

/**
 * Get session without redirecting — useful for conditional rendering.
 */
export async function getSession() {
    return auth();
}
