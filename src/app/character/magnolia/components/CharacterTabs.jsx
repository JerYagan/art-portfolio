"use client";
import { useState } from "react";

const tabs = [
  "Attributes",
  "Talents",
  "Weapon",
  "Story",
  "Music",
];

export default function CharacterTabs({ children }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto p-8 bg-[#071C1C] rounded-xl">
      <div className="flex gap-6 border-b border-white/20 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActive(index)}
            className={`pb-3 whitespace-nowrap ${
              active === index
                ? "border-b-2 border-teal-400"
                : "opacity-60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {children[active]}
      </div>
    </div>
  );
}
