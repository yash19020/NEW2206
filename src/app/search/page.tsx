import { readFile } from "node:fs/promises";
import path from "node:path";
import { SiteSearch, type SearchItem } from "@/components/site-search";
import { LEGACY_ORIGIN } from "@/lib/navigation";

type LegacySnapshot = {
  pages: Record<
    string,
    {
      path: string;
      ok: boolean;
      html: string;
      title: string;
      url: string;
    }
  >;
};

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function decodeTitle(input: string) {
  return input
    .replace(/\.(shtml|html|htm)$/i, "")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .trim();
}

function extractAnchors(html: string) {
  const out: Array<{ href: string; text: string }> = [];
  for (const m of html.matchAll(/<a[^>]*href=(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = (m[2] ?? "").trim();
    const text = stripHtml(m[3] ?? "");
    if (!href || !text || text.length < 2) continue;
    out.push({ href, text });
  }
  return out;
}

function normalizeHref(href: string) {
  if (!href) return "";
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith("/library/")) return href;
  if (href.startsWith("/")) return `${LEGACY_ORIGIN}${href}`;
  if (href.toLowerCase().endsWith(".shtml")) return `/library/${href.replace(/^\/+/, "")}`;
  return `${LEGACY_ORIGIN}/${href.replace(/^\/+/, "")}`;
}

async function getSearchItems(): Promise<SearchItem[]> {
  const filePath = path.join(process.cwd(), "src/data/legacy-pages.json");
  const raw = await readFile(filePath, "utf8");
  const snapshot = JSON.parse(raw) as LegacySnapshot;

  const items: SearchItem[] = [];
  for (const [pagePath, page] of Object.entries(snapshot.pages)) {
    if (!page.ok) continue;
    const plain = stripHtml(page.html);
    items.push({
      id: `page:${pagePath}`,
      href: `/library/${pagePath}`,
      title: decodeTitle(page.title || pagePath),
      sourcePath: pagePath,
      text: plain,
      kind: "page",
    });

    const anchors = extractAnchors(page.html);
    anchors.forEach((a, idx) => {
      items.push({
        id: `entry:${pagePath}:${idx}`,
        href: normalizeHref(a.href),
        title: a.text,
        sourcePath: pagePath,
        text: plain,
        kind: "entry",
      });
    });
  }

  return items;
}

type SearchPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const items = await getSearchItems();
  const params = searchParams ? await searchParams : {};
  const raw = params.q;
  const initialQuery = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  return <SiteSearch items={items} initialQuery={initialQuery} />;
}

