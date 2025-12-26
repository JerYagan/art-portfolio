"use client";

import { useRef, useState } from "react";
import { magnoliaStories } from "@/data/magnolia";
import { SectionCard } from "./SectionCard";

export default function StoryCard() {
  const [activeId, setActiveId] = useState("vision");
  const tabRef = useRef(null);

  const activeStory =
    magnoliaStories.find((s) => s.id === activeId) || magnoliaStories[0];

  const scrollTabs = (dir) => {
    tabRef.current?.scrollBy({
      left: dir * 240,
      behavior: "smooth",
    });
  };

  return (
    <SectionCard title="Story">
      {/* Horizontal Selector */}
      <div className="relative mb-6">
        <div
          ref={tabRef}
          className="flex gap-3 overflow-x-auto no-scrollbar"
        >
          {magnoliaStories.map((story) => {
            const active = story.id === activeId;
            return (
              <button
                key={story.id}
                onClick={() => setActiveId(story.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm border transition
                  ${
                    active
                      ? "bg-white/10 border-white/30 text-white"
                      : "bg-black/10 border-white/10 text-white/60 hover:text-white"
                  }
                `}
              >
                {story.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Story Sheet */}
      <div className="rounded-lg bg-black/10 border border-white/10 overflow-hidden">
        {/* Top Band */}
        <div className="px-5 py-4 bg-white/[0.04] border-b border-white/10">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="text-lg font-semibold">
                {activeStory.title}
              </div>
              <div className="text-xs text-white/60 mt-1">
                {activeStory.friendship}
                {activeStory.subtitle && (
                  <>
                    <span className="mx-2">|</span>
                    {activeStory.subtitle}
                  </>
                )}
              </div>
            </div>

            {/* Decorative placeholder (dragonfly / emblem later) */}
            <div className="h-8 w-8 rounded-md bg-white/10 border border-white/10 shrink-0" />
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-6 text-white/80 text-sm md:text-base">
          {Array.isArray(activeStory.content)
            ? activeStory.content.map((p, i) => (
                <p key={i} className="mb-4 last:mb-0">
                  {p}
                </p>
              ))
            : (
              <p>{activeStory.content}</p>
            )}
        </div>
      </div>
    </SectionCard>
  );
}
