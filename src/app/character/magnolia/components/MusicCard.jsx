"use client";

import { useEffect, useRef, useState } from "react";
import { SectionCard } from "./SectionCard";

const tracks = [
  { title: "Brûler Les Ruines", file: "/music/Brûler Les Ruines.mp3" },
  { title: "Cantique du Venin", file: "/music/Cantique du Venin.mp3" },
  { title: "Chanson des Aurores Perdues", file: "/music/Chanson des Aurores Perdues.mp3" },
  { title: "Chanson des Lointains", file: "/music/Chanson des Lointains.mp3" },
  { title: "Chant de la Dernière Aube", file: "/music/Chant de la Dernière Aube.mp3" },
  { title: "Magnolia Lathien", file: "/music/Magnolia Lathien.mp3" },
  { title: "Song of the Old Riverstone", file: "/music/Song of the Old Riverstone.mp3" },
  { title: "Virer la Lumeris", file: "/music/Virer la Lumeris.mp3" },
];

const DEFAULT_INDEX = tracks.findIndex(
  t => t.title === "Song of the Old Riverstone"
);

export default function MusicPlayer() {
  const audioRef = useRef(null);

  const [current, setCurrent] = useState(DEFAULT_INDEX);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [unmuted, setUnmuted] = useState(false);

  // 🔹 Load & autoplay (muted)
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = tracks[current].file;
    audioRef.current.muted = true;
    audioRef.current.play().catch(() => {});
    setPlaying(true);
    setTime(0);
  }, [current]);

  // 🔹 First interaction = unmute
  const unlockAudio = () => {
    if (!audioRef.current || unmuted) return;
    audioRef.current.muted = false;
    audioRef.current.play();
    setUnmuted(true);
  };

  const togglePlay = () => {
    unlockAudio();
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const format = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <SectionCard title="Music">
      <div className="space-y-6">

        {/* 🔹 TOP PLAYER (same look) */}
        <div className="relative rounded-2xl bg-[#0b3a38] p-6 flex flex-col md:flex-row gap-6 items-center">

          <img
            src="/images/magnolia/magnolia-portrait.jpg"
            className="w-40 h-40 rounded-xl object-cover"
            alt=""
          />

          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-semibold text-white">
              {tracks[current].title}
            </h3>
            <p className="text-sm opacity-70 text-white">
              Magnolia • Original Soundtrack
            </p>

            <input
              type="range"
              min="0"
              max={duration}
              value={time}
              onChange={(e) => {
                unlockAudio();
                audioRef.current.currentTime = e.target.value;
                setTime(e.target.value);
              }}
              className="w-full accent-white"
            />

            <div className="flex justify-between text-xs opacity-60 text-white">
              <span>{format(time)}</span>
              <span>{format(duration)}</span>
            </div>

            <div className="flex items-center justify-center gap-6 pt-2">
              <button onClick={() => setCurrent((current - 1 + tracks.length) % tracks.length)}>⏮</button>
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-lg"
              >
                {playing ? "❚❚" : "▶"}
              </button>
              <button onClick={() => setCurrent((current + 1) % tracks.length)}>⏭</button>
            </div>
          </div>
        </div>

        {/* 🔹 PLAYLIST */}
        <div className="rounded-xl overflow-hidden">
          {tracks.map((track, index) => {
            const active = index === current;
            return (
              <button
                key={track.title}
                onClick={() => {
                  unlockAudio();
                  setCurrent(index);
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 text-left
                  ${active ? "bg-white/10" : "hover:bg-white/5"}
                  transition
                `}
              >
                <img
                  src="/images/magnolia/magnolia-portrait.jpg"
                  className="w-10 h-10 rounded object-cover"
                  alt=""
                />

                <div className="flex-1">
                  <p className={`text-sm ${active ? "text-white font-semibold" : "text-white/80"}`}>
                    {track.title}
                  </p>
                </div>

                <span className="text-xs opacity-50 text-white">
                  {active ? "Playing" : "▶"}
                </span>
              </button>
            );
          })}
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={() => setTime(audioRef.current.currentTime)}
          onLoadedMetadata={() => setDuration(audioRef.current.duration || 0)}
          onEnded={() => setPlaying(false)}
        />
      </div>
    </SectionCard>
  );
}
