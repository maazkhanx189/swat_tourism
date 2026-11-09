"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, MapPinned, X } from "lucide-react";

import WhatsAppButton from "@/components/WhatsAppButton";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Heritage", href: "/heritage" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#EAECE7] bg-[#F7F8F5]/90 backdrop-blur-md">
      <div className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123D2B] text-[#D6AE55] shadow-sm">
            <MapPinned size={22} />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-[#123D2B]">YTDA Tours</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5B645F]">
              Discover Swat
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-semibold transition-colors ${
                  active ? "text-[#123D2B]" : "text-[#485A50] hover:text-[#123D2B]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton label="Plan My Trip on WhatsApp" />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#DBE0DA] bg-white p-3 text-[#123D2B] md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-[#EAECE7] bg-white md:hidden">
          <div className="section-shell flex flex-col gap-4 py-4">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold ${
                    active ? "text-[#123D2B]" : "text-[#485A50]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <WhatsAppButton label="Plan My Trip on WhatsApp" className="w-full" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
