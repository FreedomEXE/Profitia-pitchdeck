import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import WhitepaperShell from "../WhitepaperShell";
import { WHITEPAPER_DOCS } from "../docs";

type WhitepaperDocPageProps = {
  params: {
    slug: string;
  };
};

export default async function WhitepaperDocPage({ params }: WhitepaperDocPageProps) {
  const doc = WHITEPAPER_DOCS.find((item) => item.slug === params.slug);

  if (!doc || doc.slug === "whitepaper") {
    notFound();
  }

  const docPath = path.join(process.cwd(), doc.file);
  const content = await readFile(docPath, "utf8");

  return (
    <WhitepaperShell activeSlug={doc.slug}>
      <article className="whitepaper">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </WhitepaperShell>
  );
}
