import type { Metadata } from "next";

import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse Swat Valley's beauty through mountain meadows, heritage landmarks, and local culture.",
};

export default function GalleryPage() {
  return (
    <main className="section-shell py-16 md:py-20">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">Gallery</p>
        <h1 className="text-4xl font-bold tracking-tight text-[#123D2B] md:text-6xl">See the beauty of Swat Valley.</h1>
      </div>

      <GalleryGrid />
    </main>
  );
}
