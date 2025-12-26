import { basePath } from "@/lib/basePath";
import { SectionCard } from "./SectionCard";
import Image from "next/image";

const ascensionMaterials = [
  { src: `${basePath}/images/magnolia/level-up-materials/Item_Vayuda_Turquoise_Sliver.webp`, name: "Vayuda Turquoise" },
  { src: `${basePath}/images/magnolia/level-up-materials/Item_Dandelion_Seed.webp`, name: "Dandelion Seed" },
  { src: `${basePath}/images/magnolia/level-up-materials/Item_Meshing_Gear.webp`, name: "Meshing Gear" },
  { src: `${basePath}/images/magnolia/level-up-materials/Item_Fragment_of_a_Golden_Melody.webp`, name: "Fragment of a Golden Melody" },
];

const talentMaterials = [
  { src: `${basePath}/images/magnolia/level-up-materials/Item_Teachings_of_Justice.webp`, name: "Teachings of Justice" },
  { src: `${basePath}/images/magnolia/level-up-materials/Item_Meshing_Gear.webp`, name: "Meshing Gear" },
  { src: `${basePath}/images/magnolia/level-up-materials/Item_Lightless_Mass.webp`, name: "Lightless Mass" },
];


export default function InfoCard() {
  return (
    <SectionCard title="Personal Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <Row label="Vision" value="Anemo" />
        <Row label="Weapon" value="Sword" />
        <Row label="Region" value="Court of Fontaine" />
        <Row label="Birthday" value="April 8" />
        <Row label="Constellation" value="Demain des l'aube" />
        <Row label="Arkhe" value="Pneuma" />
      </div>

      <div className="space-y-10 mt-8">
        <MaterialSection
          title="Ascension Materials"
          materials={ascensionMaterials}
        />

        <MaterialSection
          title="Talent Level-Up Materials"
          materials={talentMaterials}
        />
      </div>
    </SectionCard>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/5 py-2">
      <span className="opacity-60">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function MaterialSection({ title, materials }) {
  return (
    <div>
      <h3 className="text font-semibold tracking-wide mb-4 opacity-80">
        {title}
      </h3>

      <div className="flex flex-wrap gap-4">
        {materials.map((mat, i) => (
          <MaterialItem key={i} {...mat} />
        ))}
      </div>
    </div>
  );
}


function MaterialItem({ src, name }) {
  return (
    <div className="flex flex-col items-center gap-2 w-20 md:w-20">
      {/* Icon */}
      <div className="w-16 h-16 md:w-18 md:h-18 rounded-xl bg-white/10 flex items-center justify-center">
        <img
          src={src}
          alt={name}
          className="object-contain w-14 h-14 md:w-16 md:h-16"
        />
      </div>

      {/* Name */}
      <p className="text-sm text-center leading-tight opacity-80">
        {name}
      </p>
    </div>
  );
}

