"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/types";

export default function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const close = () => setOpenIndex(null);
  const next = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  const prev = () =>
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );

  return (
    <section aria-label="Photo gallery" className="my-10">
      {/* Mobile: horizontal swipeable strip. Desktop: masonry columns. */}
      <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpenIndex(i)}
            className="relative h-48 w-64 flex-shrink-0 overflow-hidden rounded-sm border border-fog"
          >
            <Image
              src={img.src}
              alt={img.caption ?? ""}
              fill
              className="object-cover"
              sizes="256px"
            />
          </button>
        ))}
      </div>

      <div className="hidden gap-3 sm:columns-2 sm:[column-gap:0.75rem] lg:columns-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpenIndex(i)}
            className="mb-3 block w-full overflow-hidden rounded-sm border border-fog break-inside-avoid-column"
          >
            <Image
              src={img.src}
              alt={img.caption ?? ""}
              width={600}
              height={i % 3 === 0 ? 800 : 450}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 33vw, 50vw"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 text-paper"
          >
            <X size={28} />
          </button>
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 text-paper"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="relative h-[70vh] w-full max-w-3xl">
            <Image
              src={images[openIndex].src}
              alt={images[openIndex].caption ?? ""}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          {images[openIndex].caption && (
            <p className="mt-4 max-w-xl text-center text-sm text-paper/80">
              {images[openIndex].caption}
            </p>
          )}
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 text-paper"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}
