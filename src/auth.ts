// @ts-expect-error - CredentialsSignin is not typed in this NextAuth beta version but is exported at runtime
import NextAuth, { CredentialsSignin } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// @ts-expect-error - NextAuth ESM default export resolution under react-jsx
export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" as const },

    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },

    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new CredentialsSignin();
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.password) {
                    throw new CredentialsSignin();
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new CredentialsSignin();
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.role = user.role ?? "USER";
                token.id = user.id;
            }
            return token;
        },

        session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },

        signIn({ user }: { user: any }) {
            if (!user?.email) return false;
            return true;
        },
    },
});
