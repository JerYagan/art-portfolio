"use client";

import { motion } from "framer-motion";

export default function SmokeLayer({ debug = false }) {
  return (
    <>
      {/* Smoke layer 1 */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
        }}
        transition={{
          duration: 180,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, rgba(159,245,229,0.58), transparent 65%),
            radial-gradient(circle at 70% 60%, rgba(232,255,250,0.52), transparent 70%)
          `,
          filter: "blur(70px)",
          opacity: debug ? 0.6 : 0.18,
        }}
      />

      {/* Smoke layer 2 (slightly different drift) */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          x: ["5%", "-5%", "5%"],
          y: ["5%", "-5%", "5%"],
        }}
        transition={{
          duration: 240,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 40% 30%, rgba(111,218,211,0.34), transparent 90%),
            radial-gradient(circle at 60% 70%, rgba(246,230,181,0.30), transparent 95%)
          `,
          filter: "blur(90px)",
          opacity: debug ? 0.5 : 0.14,
        }}
      />
    </>
  );
}
