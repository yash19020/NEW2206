import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const NAV_FILE = path.join(PROJECT_ROOT, "src/lib/navigation.ts");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "src/data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "legacy-pages.json");
const LEGACY_ORIGIN = "https://www.pushtisahitya.org";

function extractPathsFromNavigation(tsSource) {
  const matches = [...tsSource.matchAll(/L\("([^"]+)"\)/g)].map((m) => m[1]);
  return [...new Set(matches)].filter((p) => {
    const lower = p.toLowerCase();
    return lower.endsWith(".shtml") || lower.endsWith(".htm") || lower.endsWith(".html");
  });
}

function sanitizeHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/\s(on\w+)=(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/\sstyle=(".*?"|'.*?'|[^\s>]+)/gi, "");
}

function extractMainContent(html) {
  const contentMatch = html.match(/<div[^>]+id=["']content["'][^>]*>([\s\S]*?)<\/div>/i);
  if (contentMatch) return contentMatch[1];

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) return bodyMatch[1];

  return html;
}

function mapHrefToLocalOrAbsolute(href, baseDir) {
  if (!href || href.startsWith("#")) return href;
  if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) return href;

  const cleaned = href.replace(/^(\.\.\/)+/g, "");
  const target = cleaned.startsWith("/") ? cleaned.slice(1) : `${baseDir}${cleaned}`;
  const lower = target.toLowerCase();

  if (lower.endsWith(".shtml") || lower.endsWith(".htm") || lower.endsWith(".html")) {
    return `/library/${target}`;
  }
  return `${LEGACY_ORIGIN}/${target}`;
}

function absolutizeRelativeLinks(fragment, legacyPath) {
  const baseDir =
    legacyPath.includes("/") ? legacyPath.slice(0, legacyPath.lastIndexOf("/") + 1) : "";

  let out = fragment.replace(/href=(["'])(.*?)\1/gi, (_, q, raw) => {
    const href = String(raw).trim();
    const mapped = mapHrefToLocalOrAbsolute(href, baseDir);
    return `href=${q}${mapped}${q}`;
  });

  out = out.replace(/src=(["'])(.*?)\1/gi, (_, q, raw) => {
    const src = String(raw).trim();
    if (!src) return `src=${q}${src}${q}`;
    if (/^(https?:|data:)/i.test(src)) return `src=${q}${src}${q}`;
    const cleaned = src.replace(/^(\.\.\/)+/g, "");
    const full = cleaned.startsWith("/")
      ? `${LEGACY_ORIGIN}/${cleaned.slice(1)}`
      : `${LEGACY_ORIGIN}/${baseDir}${cleaned}`;
    return `src=${q}${full}${q}`;
  });

  return out;
}

function titleFromPath(p) {
  return p
    .replace(/\.(shtml|html|htm)$/i, "")
    .replaceAll("-", " ")
    .replaceAll("_", " ");
}

async function scrapePath(legacyPath) {
  const legacyUrl = `${LEGACY_ORIGIN}/${legacyPath}`;
  const res = await fetch(legacyUrl);
  if (!res.ok) {
    return {
      path: legacyPath,
      url: legacyUrl,
      ok: false,
      status: res.status,
      title: titleFromPath(legacyPath),
      html: "",
    };
  }
  const raw = await res.text();
  const extracted = extractMainContent(raw);
  const cleaned = sanitizeHtml(extracted);
  const normalized = absolutizeRelativeLinks(cleaned, legacyPath);
  return {
    path: legacyPath,
    url: legacyUrl,
    ok: true,
    status: 200,
    title: titleFromPath(legacyPath),
    html: normalized,
  };
}

async function main() {
  const navSource = await readFile(NAV_FILE, "utf8");
  const legacyPaths = extractPathsFromNavigation(navSource);

  const pages = {};
  for (const p of legacyPaths) {
    process.stdout.write(`Scraping ${p}...\n`);
    try {
      pages[p] = await scrapePath(p);
    } catch (error) {
      pages[p] = {
        path: p,
        url: `${LEGACY_ORIGIN}/${p}`,
        ok: false,
        status: 0,
        title: titleFromPath(p),
        html: "",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: LEGACY_ORIGIN,
        count: legacyPaths.length,
        pages,
      },
      null,
      2,
    ),
    "utf8",
  );

  const okCount = Object.values(pages).filter((p) => p.ok).length;
  process.stdout.write(`Saved ${okCount}/${legacyPaths.length} pages to src/data/legacy-pages.json\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

