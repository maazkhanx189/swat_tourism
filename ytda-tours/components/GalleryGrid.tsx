"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import { galleryImages } from "@/lib/tours";

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = selectedIndex !== null ? galleryImages[selectedIndex] : null;

  const showPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryImages.length);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <button
            key={`${image.caption}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative overflow-hidden rounded-[26px] border border-[#E3E8E2] bg-white text-left shadow-[0_16px_30px_rgba(18,61,43,0.06)]"
          >
            <div className="relative h-72 overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A1E]/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="text-lg font-semibold">{image.caption}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedImage ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B2A1E]/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/10 bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#123D2B]"
              aria-label="Close gallery image"
            >
              <X size={18} />
            </button>

            <div className="relative h-[65vh] w-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="flex items-center justify-between gap-4 bg-white p-4">
              <div>
                <p className="text-lg font-semibold text-[#123D2B]">{selectedImage.caption}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={showPrev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D9DFD7] text-[#123D2B]"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D9DFD7] text-[#123D2B]"
                  aria-label="Next image"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
