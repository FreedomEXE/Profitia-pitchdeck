import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto flex w-full max-w-sm items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_0_60px_-25px_rgba(56,189,248,0.45)]">
          <Image
            src="/logo.png"
            alt="Logo"
            width={240}
            height={240}
            priority
            className="h-auto w-full"
          />
        </div>
        <h1 className="mt-10 text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
          Private deck access
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          Secure, invite-only view for the Profitria pitch deck.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-full bg-sky-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-400/30 transition hover:bg-sky-300"
          >
            Sign in to view deck
          </Link>
        </div>
        <footer className="mt-16 text-sm text-slate-500">Private deck - do not share</footer>
      </div>
    </main>
  );
}
