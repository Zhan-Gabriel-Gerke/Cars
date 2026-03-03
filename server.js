const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { PrismaClient } = require("@prisma/client");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0"; // Принудительно слушаем все интерфейсы (для Render)
const port = parseInt(process.env.PORT || "3000", 10);

// Защита от падений
process.on("uncaughtException", (err) => {
    console.error("FATAL: Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("FATAL: Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});

// Инициализация БД (Prisma 7 fix)
const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
});

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("Internal Server Error");
        }
    });

    server.listen(port, hostname, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });

    // Отказоустойчивость: Graceful Shutdown
    const shutdown = async (signal) => {
        console.log(`\nReceived ${signal}. Gracefully shutting down...`);

        server.close(async (err) => {
            if (err) {
                console.error("Error during server close:", err);
            }
            console.log("HTTP server closed. Disconnecting Prisma...");

            try {
                await prisma.$disconnect();
                console.log("Prisma disconnected successfully.");
                process.exit(err ? 1 : 0);
            } catch (prismaErr) {
                console.error("Error disconnecting Prisma:", prismaErr);
                process.exit(1);
            }
        });

        setTimeout(() => {
            console.error("Forcing shutdown due to timeout.");
            process.exit(1);
        }, 10000).unref();
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
});
