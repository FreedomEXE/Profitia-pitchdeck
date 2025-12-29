import Link from "next/link";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/app/deck/actions";
import BackgroundAudio from "@/app/components/BackgroundAudio";
import FounderVideo from "./FounderVideo";

export default async function FounderPresentationPage() {
  const session = await getSession();

  return (
    <main className="min-h-screen">
      <BackgroundAudio src="/audio/background-track.mp3" />
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/30 px-6 py-4">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="text-base font-semibold text-slate-100">{session.user ?? "viewer"}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/deck"
              className="rounded-full border border-white/15 px-3 py-1.5 text-slate-200 transition hover:border-white/40"
            >
              Deck
            </Link>
            <Link
              href="/whitepaper"
              className="rounded-full border border-white/15 px-3 py-1.5 text-slate-200 transition hover:border-white/40"
            >
              Whitepaper
            </Link>
            <span className="rounded-full bg-sky-400/15 px-3 py-1.5 text-sky-200">
              Founder Presentation
            </span>
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-3">
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

      <section className="px-6 py-10">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-black/30 p-6 shadow-[0_0_80px_-30px_rgba(56,189,248,0.35)] sm:p-8">
          <FounderVideo />
        </div>
      </section>
    </main>
  );
}
