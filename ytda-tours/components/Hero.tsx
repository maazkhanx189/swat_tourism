import Image from "next/image";

import WhatsAppButton from "@/components/WhatsAppButton";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/swat valley.jpeg"
          alt="Swat Valley mountain landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,42,30,0.86),rgba(18,61,43,0.68),rgba(18,61,43,0.38))]" />
      </div>

      <div className="section-shell relative z-10 grid min-h-[560px] items-center py-16 md:py-24">
        <div className="max-w-xl text-white">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5E7BF] backdrop-blur-sm">
            YTDA Tours – Discover Swat
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-[-0.03em] md:text-6xl">
            Discover the Switzerland of the Pakistan
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-[#E7F0EA] md:text-xl">
            Trusted local guides, comfortable stays, and unforgettable trips across Swat Valley.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppButton />
            <a
              href="/tours"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Explore Our Tours
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
