import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Landmark,
  MapPinned,
  ShieldCheck,
  Trees,
  Users,
} from "lucide-react";

import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { destinationHighlights, featuredTourPackages, galleryImages } from "@/lib/tours";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="section-shell py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Users}
            title="Local Experts"
            description="Explore Swat with experienced local guides who know the valley."
          />
          <FeatureCard
            icon={Compass}
            title="Custom Packages"
            description="Trips designed around your interests, budget, and schedule."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Safe & Comfortable"
            description="Enjoy comfortable transport, trusted accommodation, and reliable service."
          />
        </div>
      </section>

      <section className="section-shell pb-16 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">About us</p>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-[#123D2B] md:text-5xl">
              Local travel expertise rooted in Swat&apos;s heart.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#4A5950]">
              YTDA Tours was founded in 2018 in Swat by a hospitality professional who knows every road,
              hotel, and hidden spot in the valley. We make travel simple, safe, and personal.
            </p>
            <div className="mt-8 space-y-4 text-base text-[#3C4A40]">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#D6AE55]">•</span>
                <span>Founded in 2018</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#D6AE55]">•</span>
                <span>Local Swat expertise</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#D6AE55]">•</span>
                <span>Hospitality-focused service</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#D6AE55]">•</span>
                <span>Personalized travel experiences</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] shadow-[0_30px_70px_rgba(18,61,43,0.12)]">
            <Image
              src="/swat valley.jpeg"
              alt="Scenic Swat Valley mountains"
              width={800}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="section-shell">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">Featured packages</p>
              <h2 className="text-3xl font-bold tracking-tight text-[#123D2B] md:text-5xl">Trips designed for every kind of traveler.</h2>
            </div>
            <Link href="/tours" className="inline-flex items-center gap-2 text-sm font-semibold text-[#123D2B]">
              View all tours <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredTourPackages.slice(0, 3).map((tour) => (
              <TourCard key={tour.name} packageItem={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">Popular destinations</p>
          <h2 className="text-3xl font-bold tracking-tight text-[#123D2B] md:text-5xl">Discover the masterpieces of Swat.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {destinationHighlights.map((spot) => (
            <div key={spot.title} className="overflow-hidden rounded-[28px] border border-[#E5E9E3] bg-white shadow-[0_18px_45px_rgba(18,61,43,0.06)]">
              <div className="relative h-56">
                <Image src={spot.image} alt={spot.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-[#123D2B]">{spot.title}</h3>
                <p className="text-sm leading-6 text-[#4A5950]">{spot.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#123D2B] py-16 text-white md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AE55]">Heritage and culture</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Walk through 2,000 years of Swat&apos;s history.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#DCECE2]">
              From Gandhara Buddhist heritage to royal gardens and scenic mountain retreats, Swat offers a journey through history, nature, and culture.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/heritage" className="inline-flex items-center gap-2 rounded-full bg-[#D6AE55] px-5 py-3 text-sm font-semibold text-[#123D2B] transition hover:bg-[#e2c276]">
                Explore Heritage <ArrowRight size={16} />
              </Link>
              <WhatsAppButton label="Book a Heritage Tour" message="Hello YTDA Tours! I want to book a heritage tour in Swat Valley." variant="secondary" className="border-white/20 bg-transparent text-white hover:bg-white/5" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] bg-white/5 p-5 backdrop-blur-sm">
              <Landmark className="mb-4 text-[#D6AE55]" size={30} />
              <h3 className="mb-2 text-xl font-bold">Gandhara History</h3>
              <p className="text-sm leading-6 text-[#DCECE2]">Ancient sites, carved relics, and remarkable cultural memory.</p>
            </div>
            <div className="rounded-[28px] bg-white/5 p-5 backdrop-blur-sm">
              <Trees className="mb-4 text-[#D6AE55]" size={30} />
              <h3 className="mb-2 text-xl font-bold">Forest Landscapes</h3>
              <p className="text-sm leading-6 text-[#DCECE2]">Vast meadows, lush valleys, and unforgettable mountain views.</p>
            </div>
            <div className="rounded-[28px] bg-white/5 p-5 backdrop-blur-sm sm:col-span-2">
              <MapPinned className="mb-4 text-[#D6AE55]" size={30} />
              <h3 className="mb-2 text-xl font-bold">Local Knowledge</h3>
              <p className="text-sm leading-6 text-[#DCECE2]">Guided by people who know the valley, the stories, and the roads best.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">Gallery preview</p>
            <h2 className="text-3xl font-bold tracking-tight text-[#123D2B] md:text-5xl">A glimpse of Swat&apos;s beauty.</h2>
          </div>
          <Link href="/gallery" className="hidden text-sm font-semibold text-[#123D2B] md:inline-flex md:items-center md:gap-2">
            View full gallery <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {galleryImages.slice(0, 6).map((image, index) => (
            <div key={`${image.caption}-${index}`} className="relative h-72 overflow-hidden rounded-[26px] shadow-[0_18px_40px_rgba(18,61,43,0.08)]">
              <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A1E]/65 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-base font-semibold text-white">{image.caption}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell pb-16 md:pb-20">
        <div className="rounded-[32px] bg-[#F3E8C8] p-8 text-center shadow-[0_25px_60px_rgba(18,61,43,0.08)] md:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#123D2B]">Start planning</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#123D2B] md:text-5xl">Ready to discover Swat Valley?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#3D4E44]">
            Our local team can shape the perfect itinerary for you, your family, or your group.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton label="Plan My Trip on WhatsApp" />
          </div>
        </div>
      </section>
    </main>
  );
}
