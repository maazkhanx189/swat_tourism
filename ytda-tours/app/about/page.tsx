import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, Landmark, ShieldCheck, Users } from "lucide-react";

import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about YTDA Tours and the local hospitality-led approach behind unforgettable Swat experiences.",
};

const values = [
  { icon: Landmark, title: "Founded in 2018", description: "Built in Swat by a hospitality professional who understands the valley." },
  { icon: Users, title: "Local Swat expertise", description: "We know the roads, hotels, and hidden gems that matter most to travelers." },
  { icon: HeartHandshake, title: "Hospitality-focused service", description: "Thoughtful guidance and personalized care throughout each journey." },
  { icon: ShieldCheck, title: "Safe and comfortable journeys", description: "Reliable planning that prioritizes comfort, clarity, and confidence." },
];

export default function AboutPage() {
  return (
    <main className="section-shell py-16 md:py-20">
      <section className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">About YTDA Tours</p>
          <h1 className="text-4xl font-bold tracking-tight text-[#123D2B] md:text-6xl">Our story begins with local knowledge, care, and trust.</h1>
          <p className="mt-6 text-lg leading-8 text-[#4A5950]">
            YTDA Tours was founded in 2018 in Swat by a hospitality professional who knows every road, hotel,
            and hidden spot in the valley. We make travel simple, safe, and personal.
          </p>

          <div className="mt-8">
            <WhatsAppButton label="Plan My Trip on WhatsApp" />
          </div>
        </div>

        <div className="overflow-hidden rounded-[30px] shadow-[0_24px_60px_rgba(18,61,43,0.12)]">
          <Image
            src="/swat valley.jpeg"
            alt="Beautiful Swat Valley landscape"
            width={1200}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {values.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-[28px] border border-[#E3E7E1] bg-white p-6 shadow-[0_18px_40px_rgba(18,61,43,0.04)]">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123D2B] text-[#D6AE55]">
              <Icon size={22} />
            </div>
            <h2 className="mb-3 text-xl font-bold text-[#123D2B]">{title}</h2>
            <p className="text-base leading-7 text-[#4A5950]">{description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
