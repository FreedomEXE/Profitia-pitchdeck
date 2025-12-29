import Link from "next/link";
import { getSession } from "@/lib/session";
import { logoutAction } from "./actions";
import BackgroundAudio from "@/app/components/BackgroundAudio";

type DeckPageProps = {
  searchParams?: {
    present?: string;
  };
};

export default async function DeckPage({ searchParams }: DeckPageProps) {
  const session = await getSession();
  const isPresenting = searchParams?.present === "1";

  return (
    <main className={`flex min-h-screen flex-col ${isPresenting ? "bg-black" : ""}`}>
      <BackgroundAudio src="/audio/background-track.mp3" />
      {!isPresenting ? (
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/30 px-6 py-4">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm text-slate-400">Signed in as</p>
              <p className="text-base font-semibold text-slate-100">{session.user ?? "viewer"}</p>
            </div>
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-sky-400/15 px-3 py-1.5 text-sky-200">
                Deck
              </span>
              <Link
                href="/whitepaper"
                className="rounded-full border border-white/15 px-3 py-1.5 text-slate-200 transition hover:border-white/40"
              >
                Whitepaper
              </Link>
              <Link
                href="/founder"
                className="rounded-full border border-white/15 px-3 py-1.5 text-slate-200 transition hover:border-white/40"
              >
                Founder Presentation
              </Link>
            </nav>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/deck?present=1"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-white/40"
            >
              Presentation mode
            </a>
            <a
              href="https://www.beautiful.ai/player/-Oh4pMQi9aF1_a6xVbE9"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-white/40"
            >
              Open fullscreen
            </a>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/20"
              >
                Logout
              </button>
            </form>
          </div>
        </header>
      ) : (
        <div className="absolute right-6 top-6 z-10 flex items-center gap-3">
          <a
            href="/deck"
            className="rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm text-slate-200 backdrop-blur transition hover:border-white/40"
          >
            Exit
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm text-slate-200 backdrop-blur transition hover:border-white/40"
            >
              Logout
            </button>
          </form>
        </div>
      )}

      <section className={`flex-1 bg-black ${isPresenting ? "h-screen w-screen" : ""}`}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="aspect-video w-full max-w-[100vw] max-h-[100vh]">
            <iframe
              title="Pitch deck"
              src="https://www.beautiful.ai/player/-Oh4pMQi9aF1_a6xVbE9"
              className="h-full w-full border-0"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
