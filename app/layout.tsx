import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["400", "600", "700"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex", weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "BookShelf | Your Independent Bookstore Online",
  description: "Manage inventory, showcase books, and sell direct with a digital catalog built for independent bookstores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
