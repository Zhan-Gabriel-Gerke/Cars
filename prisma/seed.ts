import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 12);
    const admin = await prisma.user.upsert({
        where: { email: "admin@elitecars.com" },
        update: {},
        create: {
            email: "admin@elitecars.com",
            name: "Admin User",
            password: adminPassword,
            role: Role.ADMIN,
        },
    });

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 12);
    const user = await prisma.user.upsert({
        where: { email: "user@elitecars.com" },
        update: {},
        create: {
            email: "user@elitecars.com",
            name: "Regular User",
            password: userPassword,
            role: Role.USER,
        },
    });

    console.log("✅ Seeded users:");
    console.log(`   Admin: ${admin.email} (role: ${admin.role})`);
    console.log(`   User:  ${user.email} (role: ${user.role})`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("❌ Seed error:", e);
        await prisma.$disconnect();
        process.exit(1);
    });
