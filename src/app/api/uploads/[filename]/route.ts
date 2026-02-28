import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;

    // Basic security check to prevent directory traversal
    if (!filename || filename.includes("/") || filename.includes("..")) {
        return new NextResponse("Invalid filename", { status: 400 });
    }

    const filePath = path.join(process.cwd(), "uploads", filename);

    try {
        const fileBuffer = await fs.promises.readFile(filePath);

        // Determine Content-Type
        const ext = path.extname(filename).toLowerCase();
        let mimeType = "application/octet-stream";
        if (ext === ".png") mimeType = "image/png";
        else if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
        else if (ext === ".gif") mimeType = "image/gif";
        else if (ext === ".webp") mimeType = "image/webp";
        else if (ext === ".svg") mimeType = "image/svg+xml";

        // Cache for 1 day
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": mimeType,
                "Cache-Control": "public, max-age=86400",
            },
        });
    } catch (error) {
        return new NextResponse("File not found", { status: 404 });
    }
}
