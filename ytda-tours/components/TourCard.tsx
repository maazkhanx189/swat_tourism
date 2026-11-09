import Image from "next/image";

import WhatsAppButton from "@/components/WhatsAppButton";
import type { TourPackage } from "@/lib/tours";

type TourCardProps = {
  packageItem: TourPackage;
};

export default function TourCard({ packageItem }: TourCardProps) {
  const bookingMessage = `Hello YTDA Tours! I am interested in booking the ${packageItem.name}. Please share availability and booking details.`;

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#E6E9E4] bg-white shadow-[0_18px_45px_rgba(18,61,43,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        {packageItem.badge ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#D6AE55] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#123D2B]">
            {packageItem.badge}
          </span>
        ) : null}
        <Image
          src={packageItem.image}
          alt={packageItem.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-[#123D2B]">{packageItem.name}</h3>
          <span className="whitespace-nowrap text-base font-semibold text-[#D6AE55]">{packageItem.price}</span>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#3D4E44]">
          <span>{packageItem.duration}</span>
          <span className="text-[#D6AE55]">•</span>
          <span>{packageItem.destinations.length} destinations</span>
        </div>

        <p className="mb-5 text-base leading-7 text-[#4A5950]">{packageItem.description}</p>

        <div className="mb-5">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#123D2B]">Highlights</h4>
          <ul className="space-y-2 text-sm text-[#3C4A40]">
            {packageItem.destinations.map((destination) => (
              <li key={destination} className="flex gap-2">
                <span className="mt-1 text-[#D6AE55]">•</span>
                <span>{destination}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#123D2B]">Includes</h4>
          <ul className="space-y-2 text-sm text-[#3C4A40]">
            {packageItem.includes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 text-[#D6AE55]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <WhatsAppButton
            label="Book Now on WhatsApp"
            message={bookingMessage}
            className="w-full"
          />
        </div>
      </div>
    </article>
  );
}
