import Link from "next/link";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/app/deck/actions";

const cards = [
  {
    title: "Founder Presentation",
    description: "Watch the founder story, strategy, and the ask in a single narrative.",
    href: "/founder",
    accent: "from-sky-400/20 via-transparent to-transparent",
    tag: "Video"
  },
  {
    title: "Deck",
    description: "Browse the full investor deck with visuals, metrics, and key milestones.",
    href: "/deck",
    accent: "from-emerald-400/20 via-transparent to-transparent",
    tag: "Slides"
  },
  {
    title: "Whitepaper",
    description: "Dive into the technical and economic details behind Profitia.",
    href: "/whitepaper",
    accent: "from-amber-400/20 via-transparent to-transparent",
    tag: "Docs"
  }
];

export default async function PortalPage() {
  const session = await getSession();

  return (
    <main className="min-h-screen">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/30 px-6 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-slate-400">Signed in as</p>
          <p className="text-base font-semibold text-slate-100">{session.user ?? "viewer"}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/20"
          >
            Logout
          </button>
        </form>
      </header>

      <section className="px-6 py-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Choose your path</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-100 sm:text-5xl">
              Start with the experience that fits your time
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Each card opens a curated view of Profitia. You can jump between them at any time.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_-30px_rgba(56,189,248,0.35)] transition hover:-translate-y-1 hover:border-white/30"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80`} />
                <div className="relative flex h-full flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                      {card.tag}
                    </span>
                    <h2 className="text-2xl font-semibold text-slate-100">{card.title}</h2>
                    <p className="text-sm text-slate-300">{card.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                    Open
                    <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-200">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
