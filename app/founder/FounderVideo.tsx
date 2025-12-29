"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT?: {
      Player: new (element: HTMLIFrameElement, options: Record<string, unknown>) => {
        destroy: () => void;
      };
      PlayerState?: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YOUTUBE_API_SRC = "https://www.youtube.com/iframe_api";

export default function FounderVideo() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const ensureYouTubeApi = () =>
      new Promise<void>((resolve) => {
        if (window.YT?.Player) {
          resolve();
          return;
        }

        const existing = document.querySelector(`script[src="${YOUTUBE_API_SRC}"]`);
        if (existing) {
          const check = () => {
            if (window.YT?.Player) {
              resolve();
              return;
            }
            window.setTimeout(check, 50);
          };
          check();
          return;
        }

        const script = document.createElement("script");
        script.src = YOUTUBE_API_SRC;
        document.head.appendChild(script);
        window.onYouTubeIframeAPIReady = () => resolve();
      });

    const initPlayer = async () => {
      if (!iframeRef.current) {
        return;
      }

      await ensureYouTubeApi();

      if (!isMounted || !window.YT?.Player || !iframeRef.current) {
        return;
      }

      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event: { data: number }) => {
            const state = window.YT?.PlayerState;
            if (!state) {
              return;
            }

            if (event.data === state.PLAYING) {
              window.dispatchEvent(new Event("bg-audio-pause"));
            } else if (event.data === state.PAUSED || event.data === state.ENDED) {
              window.dispatchEvent(new Event("bg-audio-resume"));
            }
          }
        }
      });
    };

    void initPlayer();

    return () => {
      isMounted = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      <iframe
        ref={iframeRef}
        className="h-full w-full"
        src="https://www.youtube.com/embed/wfA0RP6SC6Y?si=N9d_TQ4XJU1OWvQ3&enablejsapi=1"
        title="Founder Presentation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
