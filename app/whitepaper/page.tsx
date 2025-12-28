import { readFile } from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import WhitepaperShell from "./WhitepaperShell";
import { WHITEPAPER_DOCS } from "./docs";

export default async function WhitepaperPage() {
  const whitepaperPath = path.join(process.cwd(), "WHITEPAPER.md");
  const content = await readFile(whitepaperPath, "utf8");
  const appendixDocs = WHITEPAPER_DOCS.filter((doc) => doc.slug !== "whitepaper");

  return (
    <WhitepaperShell activeSlug="whitepaper">
      <article className="whitepaper">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>

      <div className="mt-10 border-t border-white/10 pt-6">
        <h2 className="text-xl font-semibold text-slate-100">Technical appendices</h2>
        <p className="mt-2 text-sm text-slate-400">
          Detailed system specs and Pandora integration notes.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {appendixDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/whitepaper/${doc.slug}`}
              className="rounded-2xl border border-white/10 bg-black/40 p-4 transition hover:border-white/30"
            >
              <p className="text-sm font-semibold text-slate-100">{doc.title}</p>
              <p className="mt-1 text-sm text-slate-400">{doc.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </WhitepaperShell>
  );
}
