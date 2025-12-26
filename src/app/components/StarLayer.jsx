"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Star4SVG from "./Star4SVG";

const STAR_COLORS = [
  "#e8fffa", // soft white
  "#9ff5e5", // mint
  "#6fdad3", // teal
  "#f6e6b5", // pale gold
];

export default function StarLayer({ debug = false }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 60 }).map(() => {
      const startY = Math.random() * 120;

      return {
        x: Math.random() * 100,
        y: startY,
        driftY: startY - (40 + Math.random() * 40), // SLOW vertical drift
        driftX: Math.random() * 100 - (40 + Math.random() * 40), // SLOW horizontal drift
        size: Math.random() * 6 + 4,
        rotation: Math.random() * 360,
        duration: 50 + Math.random() * 50, // VERY slow
        delay: Math.random() * 10,
        opacity: Math.random() * 0.4 + 0.3,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      };
    });

    setStars(generated);
  }, []);

  if (!stars.length) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${star.x}vw`,
            y: `${star.y}vh`,
            rotate: star.rotation,
            opacity: star.opacity,
          }}
          animate={{
            y: `${star.driftY}vh`,
            rotate: star.rotation + 90,
            opacity: [
              star.opacity,
              star.opacity + 0.3,
              star.opacity,
            ],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{
            width: star.size,
            height: star.size,
            filter: debug
              ? "drop-shadow(0 0 10px red)"
              : "drop-shadow(0 0 4px rgba(255,255,255,0.4))",
          }}
        >
          <Star4SVG color={star.color} />
        </motion.div>
      ))}
    </div>
  );
}
