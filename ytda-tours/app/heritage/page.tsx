import type { Metadata } from "next";
import Image from "next/image";

import WhatsAppButton from "@/components/WhatsAppButton";
import { destinationHighlights } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Heritage",
  description: "Explore the cultural landmarks and Buddhist heritage that define Swat&apos;s rich history.",
};

export default function HeritagePage() {
  return (
    <main className="section-shell py-16 md:py-20">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">Heritage</p>
        <h1 className="text-4xl font-bold tracking-tight text-[#123D2B] md:text-6xl">Walk Through 2,000 Years of Swat&apos;s History</h1>
      </div>

      <div className="space-y-8">
        {destinationHighlights.map((site, index) => (
          <section
            key={site.title}
            className="grid overflow-hidden rounded-[30px] border border-[#E3E8E1] bg-white shadow-[0_18px_45px_rgba(18,61,43,0.06)] md:grid-cols-2"
          >
            <div className={index % 2 === 0 ? "order-1" : "order-2 md:order-2"}>
              <div className="relative h-full min-h-[280px]">
                <Image src={site.image} alt={site.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>

            <div className={index % 2 === 0 ? "order-2 flex items-center p-8 md:p-10" : "order-1 flex items-center p-8 md:p-10"}>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#123D2B]">Swat heritage</p>
                <h2 className="text-3xl font-bold tracking-tight text-[#123D2B]">{site.title}</h2>
                <p className="mt-4 text-lg leading-8 text-[#4A5950]">{site.description}</p>
                <div className="mt-8">
                  <WhatsAppButton
                    label="Book a Heritage Tour"
                    message={`Hello YTDA Tours! I would like to book a heritage tour to ${site.title}. Please share details.`}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
