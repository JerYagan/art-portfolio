"use client";
import { SectionCard } from "./SectionCard";

const constellations = [
  {
    id: "C1",
    name: "Éveil Silencieux",
    icon: "/images/magnolia/constellations/C1.png",
    description:
      "Magnolia’s melody lingers, hesitant to fade, as if the wind itself listens in quiet attention. The duration of her Elemental Skill is increased, allowing her song to remain upon the field longer before dissolving into silence."
  },
  {
    id: "C2",
    name: "Gentle Zephyr",
    icon: "/images/magnolia/constellations/C2.png",
    description:
      "The currents Magnolia weaves are neither harsh nor forceful, yet they restrain all the same. Enemies affected by her Anemo abilities have their Movement Speed reduced for a short duration, caught within a calm but unyielding flow of wind."
  },
  {
    id: "C3",
    name: "Song of Dawn",
    icon: "/images/magnolia/constellations/C3.png",
    description:
      "With each quiet note, Magnolia’s resolve grows clearer, like the first light breaking through the night. Increases the Level of her Elemental Skill by 3."
  },
  {
    id: "C4",
    name: "Whispering Wind",
    icon: "/images/magnolia/constellations/C4.png",
    description:
      "Every Swirl leaves behind unseen echoes, returning softly to their source. When Magnolia triggers Swirl, she restores a small amount of Elemental Energy, as the lingering wind answers her call once more."
  },
  {
    id: "C5",
    name: "Echoing Skies",
    icon: "/images/magnolia/constellations/C5.png",
    description:
      "Her melody rises higher, carried across open skies where it may finally be heard. Increases the Level of Magnolia’s Elemental Burst by 3."
  },
  {
    id: "C6",
    name: "Final Refrain",
    icon: "/images/magnolia/constellations/C6.png",
    description:
      "At the height of her performance, Magnolia no longer plays for herself alone. After casting her Elemental Burst, all nearby party members gain an Anemo DMG Bonus for a duration, guided forward by a melody born of endurance and renewal."
  }
];

export default function ConstellationCard() {
  return (
    <SectionCard title="Constellation">
      <div className="space-y-6">
        {constellations.map((c) => (
          <ConstellationItem key={c.id} {...c} />
        ))}
      </div>
    </SectionCard>
  );
}

function ConstellationItem({ id, name, description, icon }) {
  return (
    <div className="flex gap-4 items-start">
      {/* Icon */}
      <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0">
        <img
          src={icon}
          alt={name}
          className="w-12 h-12 object-contain opacity-90"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-1">{name}</h3>
        <p className="text-sm opacity-80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
