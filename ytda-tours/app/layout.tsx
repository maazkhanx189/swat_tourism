import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "YTDA Tours – Discover Swat",
    template: "%s | YTDA Tours",
  },
  description:
    "Premium local tours in Swat Valley, Pakistan with trusted guides, heritage experiences, and family-friendly travel packages.",
  openGraph: {
    title: "YTDA Tours – Discover Swat",
    description:
      "Discover Swat Valley with trusted local experts, cultural heritage, mountain escapes, and comfortable travel plans.",
    url: "https://example.com",
    siteName: "YTDA Tours",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/swat valley.jpeg",
        width: 1200,
        height: 800,
        alt: "Swat Valley landscape",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-[#F7F8F5] text-[#26352D] antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
