import Link from "next/link";
import { Camera, MapPin, MessageCircle } from "lucide-react";

import { buildWhatsAppUrl } from "@/lib/whatsapp";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Heritage", href: "/heritage" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const tourLinks = [
  "Swat Heritage Day Tour",
  "Malam Jabba & Gabin Jabba Adventure",
  "Kalam & Ushu Forest – 3 Days",
  "Swat Complete Experience – 5 Days",
  "Family Package – 4 Days",
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#0B2A1E] text-white">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D6AE55] text-[#123D2B]">
              <MapPin size={22} />
            </div>
            <div>
              <div className="text-xl font-bold">YTDA Tours</div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#D7E5DB]">Discover Swat</div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#D8E6DC]">
            YTDA Tours helps visitors explore Swat Valley with trusted local guidance, authentic experiences, and comfortable travel plans.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AE55]">Explore</h3>
          <ul className="space-y-3 text-sm text-[#D8E6DC]">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AE55]">Tours</h3>
          <ul className="space-y-3 text-sm text-[#D8E6DC]">
            {tourLinks.map((tour) => (
              <li key={tour}>{tour}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AE55]">Contact</h3>
          <ul className="space-y-3 text-sm text-[#D8E6DC]">
            <li className="flex items-center gap-2">
              <Camera size={16} className="text-[#D6AE55]" />
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={16} className="text-[#D6AE55]" />
              <a href={buildWhatsAppUrl("Hello YTDA Tours! I would like to plan a trip to Swat Valley.")} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>Swat, Khyber Pakhtunkhwa, Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-3 py-5 text-sm text-[#D8E6DC] md:flex-row md:items-center md:justify-between">
          <p>© 2026 YTDA Tours. All rights reserved.</p>
          <p>Designed for memorable Swat Valley journeys.</p>
        </div>
      </div>
    </footer>
  );
}
