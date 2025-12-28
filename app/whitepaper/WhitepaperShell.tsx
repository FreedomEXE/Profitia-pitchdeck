import Link from "next/link";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/app/deck/actions";
import { WHITEPAPER_DOCS } from "./docs";

type WhitepaperShellProps = {
  activeSlug: string;
  children: React.ReactNode;
};

export default async function WhitepaperShell({ activeSlug, children }: WhitepaperShellProps) {
  const session = await getSession();

  return (
    <main className="min-h-screen">
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
            <span className="rounded-full bg-sky-400/15 px-3 py-1.5 text-sky-200">
              Whitepaper
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
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            {WHITEPAPER_DOCS.map((doc) => {
              const href = doc.slug === "whitepaper" ? "/whitepaper" : `/whitepaper/${doc.slug}`;
              const isActive = doc.slug === activeSlug;
              return (
                <Link
                  key={doc.slug}
                  href={href}
                  className={
                    isActive
                      ? "rounded-full bg-sky-400/20 px-3 py-1.5 text-sky-100"
                      : "rounded-full border border-white/15 px-3 py-1.5 text-slate-200 transition hover:border-white/40"
                  }
                >
                  {doc.title}
                </Link>
              );
            })}
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-8 shadow-[0_0_80px_-30px_rgba(56,189,248,0.35)] sm:p-10">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
