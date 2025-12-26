"use client";

import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

export default function BackgroundParticles() {
  const init = useCallback(async (engine) => {
    console.log("tsParticles init");
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="test"
      init={init}
      loaded={() => console.log("tsParticles loaded")}
      options={{
        fullScreen: true,
        particles: {
          number: { value: 10 },
          color: { value: "#ff0000" },
          size: { value: 5 },
          move: { enable: true, speed: 2 },
        },
      }}
    />
  );
}