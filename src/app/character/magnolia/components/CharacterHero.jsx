"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

const splashImages = [
  `${basePath}/images/magnolia/magnolia-splash-2.png`,
  `${basePath}/images/magnolia/magnolia-drip-far.jpg`,
];

export default function CharacterHero() {
  const [index, setIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % splashImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden text-white">

      {/* Main layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start">

          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col gap-4">
            {/* Breadcrumb */}
            <p className="text-xs opacity-70">
              Home / Character Archive / <span className="text-white">Magnolia</span>
            </p>

            {/* Name + Portrait */}
            <div className="flex gap-4 items-start">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden bg-white/10 shrink-0">
                <img
                  src={`${basePath}/images/magnolia/magnolia-portrait.jpg`}
                  alt="Magnolia portrait"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-character-name text-4xl tracking-wide">
                    Magnolia
                  </h1>
                  <img
                    src={`${basePath}/images/magnolia/anemo-logo.png`}
                    alt="Anemo"
                    className="h-8 w-8"
                  />
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-[#FFD94E] leading-none mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["Anemo", "Sword", "CRIT DMG", "5-Star", "Fontaine"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#071C1C]/60 backdrop-blur text-yellow-150"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-sm opacity-80 leading-relaxed mb-2">
            Magnolia often wears a blank expression, making it difficult for those around her to approach or gauge her emotions. Yet, some brave souls muster the courage to stop and ask for pictures.
            </p>
            <p className="text-sm opacity-80 leading-relaxed mb-2"> “If you ask Miss Magnolia for a picture, she just stares at you for a second, and then says, ‘Sure.’ It’s as if she can tell we’re all mesmerized! Honestly, she loves to keep her fans guessing. It’s part of her charm—she has a way of drawing us in with every word and every smile!” — an avid fan</p>
            <p className="text-sm opacity-80 leading-relaxed mb-2">While her fans believe that Magnolia is teasing them with her playful demeanor, the truth is quite different; she’s simply caught off guard by the admiration that surrounds her. Behind her charming smiles lies a shy heart that finds it hard to believe anyone could find her interesting.</p>
          </div>

          {/* ================= RIGHT: SPLASH CAROUSEL ================= */}
          <div className="relative flex justify-center items-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-[380px] mx-auto aspect-[3/4] flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={splashImages[index]}
                  alt="Magnolia splash art"
                  className="absolute inset-0 m-auto max-w-full max-h-full object-contain select-none pointer-events-none"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) {
                      setIndex((prev) => (prev + 1) % splashImages.length);
                    }
                    if (info.offset.x > 80) {
                      setIndex((prev) =>
                        prev === 0 ? splashImages.length - 1 : prev - 1
                      );
                    }
                  }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
