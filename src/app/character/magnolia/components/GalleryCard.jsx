"use client";

import { useState, useEffect } from "react";
import { SectionCard } from "./SectionCard";
import { basePath } from "@/lib/basePath";

const images = [
  `${basePath}/images/magnolia/magnolia-portrait.jpg`,
  `${basePath}/images/magnolia/magnolia-drip-close.jpg`,
  `${basePath}/images/magnolia/magnolia-drip-far.jpg`,
  `${basePath}/images/magnolia/magnolia-portrait-2.webp`,
  `${basePath}/images/magnolia/magnolia-concept-1.webp`,
  `${basePath}/images/magnolia/magnolia-concept-2.jpg`,
  `${basePath}/images/magnolia/magnolia-concept-weapon.webp`,
  `${basePath}/images/magnolia/magnolia-constellation.webp`,
  `${basePath}/images/magnolia/magnolia-splash.png`,
  `${basePath}/images/magnolia/magnolia-fanart.png`,
];

export default function GalleryCard() {
  const [activeImage, setActiveImage] = useState(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeImage ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [activeImage]);

  return (
    <>
      <SectionCard title="Gallery">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src) => (
            <button
              key={src}
              onClick={() => setActiveImage(src)}
              className="relative overflow-hidden rounded-lg group"
            >
              <img
                src={src}
                alt="Magnolia artwork"
                className="w-full h-[180px] md:h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* subtle overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-[95vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Magnolia full artwork"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />

            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-black/70 border border-white/20 text-white text-lg flex items-center justify-center hover:bg-black"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
