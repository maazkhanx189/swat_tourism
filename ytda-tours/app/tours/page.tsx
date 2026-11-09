import type { Metadata } from "next";

import TourCard from "@/components/TourCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { featuredTourPackages } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Tours",
  description: "Browse premium Swat Valley tour packages, adventure experiences, and family-friendly escapes.",
};

export default function ToursPage() {
  return (
    <main className="section-shell py-16 md:py-20">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">Tours</p>
        <h1 className="text-4xl font-bold tracking-tight text-[#123D2B] md:text-6xl">Choose your perfect Swat experience.</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {featuredTourPackages.map((tour) => (
          <TourCard key={tour.name} packageItem={tour} />
        ))}
      </div>

      <div className="mt-16 rounded-[32px] bg-[#123D2B] p-8 text-center text-white md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AE55]">Tailored experiences</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Custom packages and group discounts available.</h2>
        <div className="mt-8 flex justify-center">
          <WhatsAppButton label="Plan My Trip on WhatsApp" />
        </div>
      </div>
    </main>
  );
}
