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
    <section aria-label="Photo gallery" className="my-10 w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={img.caption ? `View photo: ${img.caption}` : `View photo ${i + 1}`}
            className="relative block aspect-[4/3] w-full overflow-hidden rounded-sm border border-fog bg-fog"
          >
            <Image
              src={img.src}
              alt={img.caption ?? ""}
              fill
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded photo gallery"
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
            if (event.key === "ArrowRight") next();
            if (event.key === "ArrowLeft") prev();
          }}
          tabIndex={-1}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-10 text-paper"
          >
            <X size={28} />
          </button>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-2 z-10 text-paper sm:left-6"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="relative h-[70vh] w-full max-w-5xl">
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
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="absolute right-2 z-10 text-paper sm:right-6"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}
