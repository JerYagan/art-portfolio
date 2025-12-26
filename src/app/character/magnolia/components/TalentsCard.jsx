"use client";
import { useState } from "react";
import { SectionCard } from "./SectionCard";
import Image from "next/image";
import { basePath } from "@/lib/basePath";

const talentIcons = {
  0: `${basePath}/images/magnolia/skills/normal-attack.png`,
  1: `${basePath}/images/magnolia/skills/elemental-skill.png`,
  2: `${basePath}/images/magnolia/skills/elemental-burst.png`,
  3: `${basePath}/images/magnolia/skills/ascension-1.png`,
  4: `${basePath}/images/magnolia/skills/ascension-2.png`,
  5: `${basePath}/images/magnolia/skills/exploration.png`
};

const talents = [
  {
    id: 0,
    name: "Measured Cadence",
    sections: [
      {
        title: "Normal Attack · Measured Cadence",
        text:
          "Performs up to 4 consecutive sword strikes, each executed with calm, deliberate movements. Magnolia favors precision and timing over force, allowing her blade to move in quiet harmony with the surrounding wind."
      },
      {
        title: "Charged Attack · Held Breath",
        text:
          "Consumes a certain amount of Stamina to perform a lingering, measured strike. Magnolia briefly steadies herself before releasing the attack, as if waiting for the wind to settle before committing to motion."
      },
      {
        title: "Plunging Attack · Falling Note",
        text:
          "Plunges from mid-air, gathering Anemo along her descent. Upon impact, deals AoE Anemo DMG as the sound of a fading note ripples outward."
      }
    ]
  },
  {
    id: 1,
    name: "White Clouds at Dawn",
    sections: [
      {
        title: "Elemental Skill",
        text: `Magnolia draws upon the quiet winds of early morning, allowing drifting currents to gather around her.

Upon activation, Magnolia enters the Dawnward Drift state, dealing Anemo DMG to nearby enemies and summoning a gentle current that lingers for a duration.

While in Dawnward Drift:
• Magnolia’s movements become lighter, guided by subtle wind currents.
• Nearby enemies are gently drawn and guided by the wind.
• Magnolia may reposition herself once during this state.

If White Clouds at Dawn ends naturally, lingering currents briefly persist before dissipating.
If Magnolia leaves the field early, the winds quietly disperse without resistance.`
      }
    ]
  },
  {
    id: 2,
    name: "Stars Gather at Dusk",
    sections: [
      {
        title: "Elemental Burst",
        text: `As daylight fades, Magnolia releases a final melody beneath a darkening sky.

Magnolia summons converging wind currents, dealing AoE Anemo DMG and creating a gathering field that steadily pulls nearby enemies inward.

When the effect ends, the wind disperses outward in a final surge, dealing one last instance of Anemo DMG.`
      }
    ]
  },
  {
    id: 3,
    name: "Whispers Between Notes",
    sections: [
      {
        title: "Ascension Passive",
        text: `When Magnolia triggers a Swirl reaction, faint echoes of her melody linger within the wind.

Swirl reactions triggered by Magnolia restore a small amount of Elemental Energy.
This effect can occur once every short interval.`
      }
    ]
  },
  {
    id: 4,
    name: "Stillness After the Storm",
    sections: [
      {
        title: "Ascension Passive",
        text: `After White Clouds at Dawn or Stars Gather at Dusk ends, Magnolia enters a brief state of calm.

During this time, Magnolia gains increased Anemo effectiveness, reflecting the quiet that follows emotional release.`
      }
    ]
  },
  {
    id: 5,
    name: "Familiar Silence",
    sections: [
      {
        title: "Exploration Talent",
        text: `Magnolia moves with ease through quiet spaces, accustomed to listening rather than speaking.

Decreases Stamina consumption for all party members while gliding and exploring.`
      }
    ]
  }
];

export default function TalentsCard() {
  const [active, setActive] = useState(0);
  const talent = talents[active];

  return (
    <SectionCard title="Talents">
      {/* Selector */}
      <div className="flex gap-1 md:gap-4 mb-8 overflow-x-auto">
        {talents.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`w-12 h-12 md:w-18 md:h-18 rounded-full flex items-center justify-center border transition
              ${
                active === t.id
                  ? "border-teal-400 bg-teal-400/10"
                  : "border-white/20 opacity-60 hover:opacity-100"
              }
            `}
          >
            <img
              src={talentIcons[t.id]}
              alt={t.name}
              className="opacity-90 w-[36px] h-[36px] md:w-[40px] md:h-[40px] object-contain"
            />
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-semibold mb-4">{talent.name}</h3>

        <div className="space-y-4 text-sm leading-relaxed">
          {talent.sections.map((s, i) => (
            <div key={i}>
              <p className="text-teal-300 font-medium mb-1">{s.title}</p>
              <p className="opacity-80 whitespace-pre-line">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
