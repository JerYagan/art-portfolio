"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMusic } from "./MusicContext";
import { basePath } from "@/lib/basePath";

const formatTime = (t = 0) =>
  `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

export default function StickyMiniPlayer() {
  const {
    tracks,
    current,
    playing,
    togglePlay,
    playNext,
    playPrev,
    setShowPlaylist,
    audioRef,
  } = useMusic();

  const track = tracks?.[current];
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const barRef = useRef(null);
  const draggingRef = useRef(false);

  const progressPct = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  // Sync timer
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const update = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);

    update();
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
    };
  }, [audioRef]);

  // --- SEEK LOGIC ---
  const seekFromClientX = (clientX) => {
    const bar = barRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !duration) return;

    const rect = bar.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    audio.currentTime = pct * duration;
  };

  const startDrag = (e) => {
    e.stopPropagation();
    draggingRef.current = true;
    seekFromClientX(e.clientX);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const onDrag = (e) => {
    if (!draggingRef.current) return;
    seekFromClientX(e.clientX);
  };

  const stopDrag = () => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
  };

  if (!track) return null;

  return (
    // 🔥 NOT A BUTTON ANYMORE
    <div
      role="button"
      tabIndex={0}
      onClick={() => setShowPlaylist(true)}
      className="fixed bottom-4 left-4 right-4 z-40 bg-[#0b3a38]/90 backdrop-blur rounded-2xl p-3 border border-white/10 text-left cursor-pointer max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3">
        <img
          src={`${basePath}/images/magnolia/magnolia-portrait.jpg`}
          alt=""
          className="w-12 h-12 rounded-xl object-cover border border-white/10"
        />

        <div className="min-w-0 flex-1">
          <div className="text-white font-medium truncate">
            {track.title}
          </div>

          {/* PROGRESS BAR (click + drag seek) */}
          <div
            ref={barRef}
            onMouseDown={startDrag}
            onClick={(e) => {
              e.stopPropagation();
              seekFromClientX(e.clientX);
            }}
            className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer"
          >
            <div
              className="h-full bg-white/70"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="mt-1 flex justify-between text-[11px] text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              playPrev();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white grid place-items-center"
          >
            ⏮
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-10 h-10 rounded-full bg-white text-[#0b3a38] grid place-items-center font-bold"
          >
            {playing ? "❚❚" : "▶"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              playNext();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white grid place-items-center"
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
