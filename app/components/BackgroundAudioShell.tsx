"use client";

import { usePathname } from "next/navigation";
import BackgroundAudio from "./BackgroundAudio";

const AUDIO_SRC = "/audio/background-track.mp3";

export default function BackgroundAudioShell() {
  const pathname = usePathname();
  const isProtected =
    pathname === "/portal" ||
    pathname.startsWith("/deck") ||
    pathname.startsWith("/whitepaper") ||
    pathname.startsWith("/founder");

  if (!isProtected) {
    return null;
  }

  return <BackgroundAudio src={AUDIO_SRC} />;
}
