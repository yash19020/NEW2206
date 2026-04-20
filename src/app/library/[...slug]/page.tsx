import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { LegacyHtmlContent } from "@/components/legacy-html-content";
import { LEGACY_ORIGIN } from "@/lib/navigation";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

type LegacySnapshot = {
  generatedAt: string;
  source: string;
  count: number;
  pages: Record<
    string,
    {
      path: string;
      url: string;
      ok: boolean;
      status: number;
      title: string;
      html: string;
      error?: string;
    }
  >;
};

async function readLegacySnapshot(): Promise<LegacySnapshot | null> {
  try {
    const filePath = path.join(process.cwd(), "src/data/legacy-pages.json");
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as LegacySnapshot;
  } catch {
    return null;
  }
}

function sanitizeLegacyHtml(html: string) {
  return html
    .replace(/<!doctype[\s\S]*?>/gi, "")
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<\/?head[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<\/?body[^>]*>/gi, "")
    .replace(/<marquee[\s\S]*?<\/marquee>/gi, "")
    .replace(/<table\b/gi, '<div class="legacy-table-wrap"><table')
    .replace(/<\/table>/gi, "</table></div>");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  return {
    title: path.replace(/\.shtml$/i, "").replaceAll("-", " "),
  };
}

export default async function LibraryLegacyPage({ params }: PageProps) {
  const { slug } = await params;
  const legacyPath = slug.join("/");
  const legacyUrl = `${LEGACY_ORIGIN}/${legacyPath}`;
  const snapshot = await readLegacySnapshot();
  const page = snapshot?.pages?.[legacyPath];

  const fetchError = !snapshot
    ? "Local content snapshot not found."
    : !page
      ? "This page is not present in local snapshot."
      : !page.ok
        ? `This page could not be scraped earlier (${page.status}).`
        : "";
  const pageHtml = page?.html ?? "";
  const responsiveHtml = sanitizeLegacyHtml(pageHtml);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="glass-panel px-6 py-8 sm:px-10 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#c9a227]/30 pb-4">
          <h1 className="font-serif text-2xl font-semibold text-[#722f37] sm:text-3xl">
            {legacyPath.replace(/\.shtml$/i, "").replaceAll("-", " ")}
          </h1>
          <a
            href={legacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#1a5c3a] underline underline-offset-2"
          >
            Open original page ↗
          </a>
        </div>

        {fetchError ? (
          <div className="space-y-4 text-[#4a3728]">
            <p>{fetchError}</p>
            <p className="text-sm">
              Run <code>npm run scrape:legacy</code> from project root to build local pages.
            </p>
            <p>
              <Link href="/" className="text-[#722f37] underline underline-offset-2">
                Go back home
              </Link>
            </p>
          </div>
        ) : (
          <LegacyHtmlContent html={responsiveHtml} />
        )}
      </div>
    </div>
  );
}

