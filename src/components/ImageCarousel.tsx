"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[]; // e.g. ["/about-1.jpg", "/about-2.jpg", ...]
  intervalMs?: number; // autoplay interval
  objectPosition?: "top" | "center" | "bottom";
};

export default function ImageCarousel({
  images,
  intervalMs = 4000,
  objectPosition = "center",
}: Props) {
  const [i, setI] = useState(0);

  // autoplay (pause on hover if you want: add onMouseEnter/Leave to root)
  useEffect(() => {
    const id = setInterval(
      () => setI((p) => (p + 1) % images.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  const go = (dir: number) =>
    setI((p) => (p + dir + images.length) % images.length);

  return (
    <div className="relative overflow-hidden rounded-2xl border shadow-md">
      {/* Slides */}
      <div
        className="relative h-[550px]"
        aria-roledescription="carousel"
        aria-label="Bakery images"
      >
        {images.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${idx + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`Bakery photo ${idx + 1}`}
              fill
              priority={idx === 0}
              className={`object-cover ${
                objectPosition === "top"
                  ? "object-top"
                  : objectPosition === "bottom"
                  ? "object-bottom"
                  : "object-center"
              }`}
              sizes="(min-width: 1024px) 600px, 100vw"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              idx === i ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
