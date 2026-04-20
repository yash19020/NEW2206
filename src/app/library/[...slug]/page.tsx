import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { LegacyHtmlContent } from "@/components/legacy-html-content";
import { VitthalnathCharts } from "@/components/vitthalnath-charts";
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
    // Remove legacy global header/sidebar blocks that are unrelated to page-specific content.
    .replace(/<div[^>]+id=["']masthead["'][\s\S]*?<\/div>\s*<\/div>/gi, "")
    .replace(/<div[^>]+id=["']navBar["'][\s\S]*?<!--\s*end navBar div\s*-->/gi, "")
    .replace(/<div[^>]+id=["']headlines["'][\s\S]*?<\/div>\s*<\/div>/gi, "")
    .replace(/<div[^>]+id=["']fb-root["'][\s\S]*?<\/div>/gi, "")
    .replace(/<div[^>]+id=["']siteInfo["'][\s\S]*?<\/div>/gi, "")
    .replace(/<img[^>]*TitleImage1\.jpg[^>]*>/gi, "")
    .replace(/<marquee[\s\S]*?<\/marquee>/gi, "")
    .replace(
      /<p[^>]*>\s*Note:\s*If any author or publisher has any issues with copyright[\s\S]*?<\/p>/gi,
      "",
    )
    .replace(
      /<p[^>]*>\s*\*{0,2}\s*Disclaimer:\s*If anyone has any type of copyright issues[\s\S]*?<\/p>/gi,
      "",
    )
    .replace(/<table\b/gi, '<div class="legacy-table-wrap"><table')
    .replace(/<\/table>/gi, "</table></div>");
}

function replaceAcharyaHeroImages(html: string, legacyPath: string) {
  const config: Record<string, { src: string; alt: string; large?: boolean; remove: RegExp[] }> = {
    "Shreevallabhacharyaji.shtml": {
      src: "/pichwai/Vallabhacharyaji.png",
      alt: "Shree Vallabhacharyaji",
      large: true,
      remove: [
        /<img[^>]*src=["']https:\/\/www\.pushtisahitya\.org\/images\/slide0052_image100\.jpg["'][^>]*>/gi,
      ],
    },
    "ShreeGopinathji.shtml": {
      src: "/pichwai/Gopinathji.png",
      alt: "Shree Gopinathji",
      remove: [/<img[^>]*src=["']https:\/\/www\.pushtisahitya\.org\/images\/ShreeGopinathji\.jpg["'][^>]*>/gi],
    },
    "ShreeVitthalnathji.shtml": {
      src: "/pichwai/Vitthalnathji.png",
      alt: "Shree Vitthalnathji",
      large: true,
      remove: [/<img[^>]*src=["']https:\/\/www\.pushtisahitya\.org\/images\/Shri_Gusainji\.jpg["'][^>]*>/gi],
    },
  };

  const item = config[legacyPath];
  if (!item) return html;

  let out = html;
  for (const pattern of item.remove) {
    out = out.replace(pattern, "");
  }

  const sizeClass = item.large ? " acharya-hero-image--large" : "";
  const injected = `<div class="acharya-hero-wrap"><img src="${item.src}" alt="${item.alt}" class="acharya-hero-image${sizeClass}" data-no-save draggable="false"></div>`;
  return `${injected}\n${out}`;
}

function normalizeTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/\.(shtml|html|htm)$/gi, "")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function removeDuplicateLeadingHeading(html: string, pageTitle: string) {
  const normalizedPageTitle = normalizeTitle(pageTitle);
  if (!normalizedPageTitle) return html;

  const leadingHeadingMatch = html.match(/^\s*<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/i);
  if (!leadingHeadingMatch) return html;

  const headingText = leadingHeadingMatch[2]
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const normalizedHeading = normalizeTitle(headingText);
  if (!normalizedHeading) return html;

  // Remove only when the leading heading mirrors the page title.
  if (
    normalizedHeading === normalizedPageTitle ||
    normalizedHeading.includes(normalizedPageTitle) ||
    normalizedPageTitle.includes(normalizedHeading)
  ) {
    return html.replace(/^\s*<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/i, "").trimStart();
  }

  return html;
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
  const responsiveHtml = removeDuplicateLeadingHeading(
    sanitizeLegacyHtml(replaceAcharyaHeroImages(pageHtml, legacyPath)),
    legacyPath.replace(/\.shtml$/i, ""),
  );

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
          <>
            <LegacyHtmlContent html={responsiveHtml} />
            {legacyPath === "ShreeVitthalnathji.shtml" ? <VitthalnathCharts /> : null}
          </>
        )}
      </div>
    </div>
  );
}

