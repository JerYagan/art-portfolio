"use client";

import { basePath } from "@/lib/basePath";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const MusicContext = createContext(null);

export const tracks = [
  "Brûler Les Ruines",
  "Chanson des Lointains",
  "Chant de la Dernière Aube",
  "Magnolia Lathien",
  "Song of the Old Riverstone",
  "Virel a Lumeris",
].map((title) => ({
  title,
  file: `${basePath}/music/${encodeURIComponent(title)}.mp3`,
}));

const DEFAULT_INDEX_RAW = tracks.findIndex((t) => t.title === "Song of the Old Riverstone");
const DEFAULT_INDEX = DEFAULT_INDEX_RAW >= 0 ? DEFAULT_INDEX_RAW : 0;

export function MusicProvider({ children }) {
  const audioRef = useRef(null);

  const [current, setCurrent] = useState(DEFAULT_INDEX);
  const [playing, setPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const safeTrack = useMemo(() => tracks[current], [current]);

  // ✅ Load correct track when current changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !safeTrack) return;

    audio.src = safeTrack.file;
    audio.load();

    // If user already "started" audio once, keep music flowing as tracks change
    if (hasStarted) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // If play is blocked for some reason, keep state consistent
          setPlaying(false);
        });
    }
  }, [current, hasStarted, safeTrack]);

  // ✅ Loop the entire playlist (not one song)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      setCurrent((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  // ✅ First interaction = start music (your old behavior)
  useEffect(() => {
    const startMusic = () => {
      const audio = audioRef.current;
      if (!audio || hasStarted) return;

      audio
        .play()
        .then(() => {
          setHasStarted(true);
          setPlaying(true);
        })
        .catch(() => {});
    };

    window.addEventListener("scroll", startMusic, { once: true });
    window.addEventListener("click", startMusic, { once: true });
    window.addEventListener("touchstart", startMusic, { once: true });

    return () => {
      window.removeEventListener("scroll", startMusic);
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, [hasStarted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // If not started yet, treat play as first interaction
    if (!hasStarted) {
      audio
        .play()
        .then(() => {
          setHasStarted(true);
          setPlaying(true);
        })
        .catch(() => {});
      return;
    }

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const playNext = () => setCurrent((prev) => (prev + 1) % tracks.length);
  const playPrev = () => setCurrent((prev) => (prev - 1 + tracks.length) % tracks.length);

  return (
    <MusicContext.Provider
      value={{
        tracks,
        current,
        setCurrent,
        playing,
        togglePlay,
        playNext,
        playPrev,
        hasStarted,
        showPlaylist,
        setShowPlaylist,
        audioRef, // ✅ required for progress bar + timers
      }}
    >
      {children}
      {/* ❌ IMPORTANT: remove loop here — we handle looping playlist via "ended" */}
      <audio ref={audioRef} />
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
