import { auth } from "@/auth";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: any) => {
    const { pathname } = req.nextUrl;
    const session = req.auth;

    // ─── Protect /admin routes: require ADMIN role ───
    if (pathname.startsWith("/admin")) {
        if (!session) {
            const signInUrl = new URL("/auth/signin", req.nextUrl.origin);
            signInUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(signInUrl);
        }

        if (session.user?.role !== "ADMIN") {
            return NextResponse.redirect(
                new URL("/unauthorized", req.nextUrl.origin)
            );
        }
    }

    // ─── Protect /dashboard routes: require any authenticated user ───
    if (pathname.startsWith("/dashboard")) {
        if (!session) {
            const signInUrl = new URL("/auth/signin", req.nextUrl.origin);
            signInUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
});

// Run middleware on all routes except static files and API auth
export const config = {
    matcher: [
        "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
    ],
};
