import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elite Cars — Unrivaled Luxury Car Rental",
  description:
    "Experience the pinnacle of automotive luxury. Rent world-class supercars and premium vehicles with white-glove concierge service.",
  keywords: [
    "luxury car rental",
    "supercar rental",
    "premium vehicles",
    "elite cars",
    "exotic car rental",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-950 text-white antialiased">
        <Providers>
          <Navbar />
          {children}
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                border: "1px solid rgba(212, 168, 67, 0.3)",
                color: "#fff",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
