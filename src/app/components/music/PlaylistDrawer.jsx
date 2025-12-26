"use client";

import { useMusic } from "./MusicContext";

export default function PlaylistDrawer() {
  const {
    tracks,
    current,
    setCurrent,
    showPlaylist,
    setShowPlaylist,
    playing,
    togglePlay,
  } = useMusic();

  if (!showPlaylist) return null;

  const track = tracks?.[current];

  return (
    <div
      className="fixed inset-0 z-50 max-w-2xl mx-auto"
      onClick={() => setShowPlaylist(false)} // ✅ tap outside closes
    >
      <div
        className="absolute bottom-0 w-full bg-[#0b3a38] rounded-t-2xl p-6 max-h-[75vh] overflow-y-auto border-t border-white/10"
        onClick={(e) => e.stopPropagation()} // ✅ prevent outside close
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowPlaylist(false)}
            className="text-white/70 hover:text-white text-sm"
          >
            Close
          </button>

          <button
            onClick={togglePlay}
            className="text-white/80 hover:text-white text-sm"
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>

        {track && (
          <div className="mb-4 text-white">
            <div className="text-xs text-white/60">Now Playing</div>
            <div className="font-semibold truncate">{track.title}</div>
          </div>
        )}

        <div className="space-y-2">
          {tracks.map((t, i) => (
            <button
              key={t.title}
              onClick={() => setCurrent(i)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition
                ${i === current ? "bg-white/10" : "hover:bg-white/5"}
              `}
            >
              <img
                src="/images/magnolia/magnolia-portrait.jpg"
                className="w-12 h-12 rounded-md object-cover border border-white/10"
                alt=""
              />
              <span className="text-white text-sm truncate">{t.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
