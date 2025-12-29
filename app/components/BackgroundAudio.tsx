"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundAudioProps = {
  src: string;
  volume?: number;
};

export default function BackgroundAudio({ src, volume = 0.35 }: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = volume;

    const attemptPlay = async () => {
      try {
        await audio.play();
        setNeedsInteraction(false);
      } catch {
        setNeedsInteraction(true);
      }
    };

    attemptPlay();

    const handlePause = () => {
      audio.pause();
    };

    const handleResume = () => {
      void attemptPlay();
    };

    window.addEventListener("bg-audio-pause", handlePause);
    window.addEventListener("bg-audio-resume", handleResume);

    return () => {
      window.removeEventListener("bg-audio-pause", handlePause);
      window.removeEventListener("bg-audio-resume", handleResume);
    };
  }, [volume]);

  const handleEnableAudio = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    try {
      await audio.play();
      setNeedsInteraction(false);
    } catch {
      setNeedsInteraction(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop playsInline />
      {needsInteraction ? (
        <button
          type="button"
          onClick={handleEnableAudio}
          className="fixed bottom-6 right-6 z-50 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-slate-100 backdrop-blur transition hover:border-white/40"
        >
          Enable audio
        </button>
      ) : null}
    </>
  );
}
