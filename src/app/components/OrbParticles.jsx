"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ORB_COUNT = 15;

export default function OrbParticles() {
  const orbsRef = useRef(null);
  const [, forceRender] = useState(0);

  // Generate orbs ONCE
  if (!orbsRef.current) {
    orbsRef.current = Array.from({ length: ORB_COUNT }).map(() => {
      const startX = Math.random() * 100;
      const startY = 100 + Math.random() * 30;

      return {
        startX,
        startY,
        size: 6 + Math.random() * 6,
        duration: 18 + Math.random() * 14,
        delay: Math.random() * 8,
        scale: 0.9 + Math.random() * 0.5,
        hue: Math.random() * 16 - 8,

        // RANDOM AIR PATH
        xPath: [
          startX,
          startX + (Math.random() * 20 - 10),
          startX + (Math.random() * 30 - 15),
          startX + (Math.random() * 20 - 10),
          startX,
        ],
        yPath: [
          startY,
          startY - (20 + Math.random() * 20),
          startY - (40 + Math.random() * 30),
          startY - (60 + Math.random() * 40),
          -20,
        ],
      };
    });

    // Force one render after ref init
    forceRender((v) => v + 1);
  }

  const orbs = orbsRef.current;
  if (!orbs) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: `${orb.startX}vw`,
            y: `${orb.startY}vh`,
            opacity: 0,
          }}
          animate={{
            x: orb.xPath.map((x) => `${x}vw`),
            y: orb.yPath.map((y) => `${y}vh`),
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* ✨ GLOWING ORB */}
          <motion.div
            animate={{
              scale: [orb.scale, orb.scale + 0.2, orb.scale],
            }}
            transition={{
              duration: orb.duration * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-full"
            style={{
              width: orb.size,
              height: orb.size,

              background: `
                radial-gradient(
                  circle,
                  hsla(${170 + orb.hue}, 100%, 97%, 1) 0%,
                  hsla(${170 + orb.hue}, 90%, 85%, 0.95) 25%,
                  hsla(${170 + orb.hue}, 80%, 70%, 0.6) 45%,
                  transparent 70%
                )
              `,

              boxShadow: `
                0 0 ${orb.size * 2}px hsla(${170 + orb.hue}, 100%, 85%, 0.9),
                0 0 ${orb.size * 5}px hsla(${170 + orb.hue}, 90%, 70%, 0.6),
                0 0 ${orb.size * 10}px hsla(${170 + orb.hue}, 80%, 60%, 0.35),
                0 0 ${orb.size * 16}px hsla(${170 + orb.hue}, 70%, 55%, 0.2)
              `,

              mixBlendMode: "screen",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
