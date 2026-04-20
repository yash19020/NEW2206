import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const OUTPUT_DIR = path.join(PROJECT_ROOT, "src/data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "pushtipedia-blogs.json");
const BASE = "https://www.pushtipedia.com";
const API = "https://pushtipedia.mywikis.wiki/w139/api.php";

function formatTitle(title) {
  return title.replaceAll("_", " ").replaceAll("-", " ");
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(html) {
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

function sanitizeHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/\s(on\w+)=(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/\sstyle=(".*?"|'.*?'|[^\s>]+)/gi, "");
}

function rewriteBlogLinks(html, titleToSlug) {
  return html
    .replace(/href=(["'])(.*?)\1/gi, (_, q, raw) => {
      const href = String(raw).trim();
      if (!href || href.startsWith("#")) return `href=${q}${href}${q}`;
      if (/^(mailto:|tel:)/i.test(href)) return `href=${q}${href}${q}`;

      // /wiki/<Title>
      const wikiMatch = href.match(/^\/wiki\/(.+)$/i);
      if (wikiMatch) {
        const wikiTitle = decodeURIComponent(wikiMatch[1]).replaceAll("_", " ");
        const slug = titleToSlug.get(wikiTitle);
        return `href=${q}${slug ? `/blogs/${slug}` : `${BASE}${href}`}${q}`;
      }

      // /w139/index.php?title=<Title>
      const indexMatch = href.match(/^\/w139\/index\.php\?title=([^&]+).*$/i);
      if (indexMatch) {
        const wikiTitle = decodeURIComponent(indexMatch[1]).replaceAll("_", " ");
        const slug = titleToSlug.get(wikiTitle);
        return `href=${q}${slug ? `/blogs/${slug}` : `${BASE}${href}`}${q}`;
      }

      if (/^https?:\/\//i.test(href)) return `href=${q}${href}${q}`;
      if (href.startsWith("/")) return `href=${q}${BASE}${href}${q}`;
      return `href=${q}${BASE}/${href}${q}`;
    })
    .replace(/src=(["'])(.*?)\1/gi, (_, q, raw) => {
      const src = String(raw).trim();
      if (!src) return `src=${q}${src}${q}`;
      if (/^(https?:|data:)/i.test(src)) return `src=${q}${src}${q}`;
      if (src.startsWith("/")) return `src=${q}${BASE}${src}${q}`;
      return `src=${q}${BASE}/${src}${q}`;
    });
}

async function fetchPageContent(title) {
  const url = `${API}?action=parse&page=${encodeURIComponent(title)}&prop=text|displaytitle&format=json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const html = data?.parse?.text?.["*"];
  if (typeof html !== "string" || !html.trim()) return null;
  const displayTitle = data?.parse?.displaytitle;
  return {
    html,
    displayTitle: typeof displayTitle === "string" ? stripHtml(displayTitle) : formatTitle(title),
  };
}

function isUsefulTitle(title) {
  const lower = title.toLowerCase();
  if (lower === "main page") return false;
  if (lower.endsWith(".php")) return false;
  return true;
}

async function main() {
  let data = null;
  let fetchError = "";
  try {
    const res = await fetch(`${API}?action=query&list=allpages&aplimit=max&format=json`);
    if (!res.ok) {
      fetchError = `API returned status ${res.status}`;
    } else {
      data = await res.json();
    }
  } catch (error) {
    fetchError = error instanceof Error ? error.message : "Unknown fetch error";
  }

  const pages = data?.query?.allpages ?? [];
  const looksUnavailable = Boolean(fetchError) || !Array.isArray(pages) || pages.length === 0;

  let items = [];
  if (!looksUnavailable) {
    const titles = pages
      .map((p) => p.title)
      .filter((t) => typeof t === "string" && isUsefulTitle(t));

    const taken = new Set();
    const titleToSlug = new Map();
    for (const title of titles) {
      const base = slugify(title) || "blog";
      let slug = base;
      let i = 2;
      while (taken.has(slug)) {
        slug = `${base}-${i}`;
        i += 1;
      }
      taken.add(slug);
      titleToSlug.set(title, slug);
    }

    for (const title of titles) {
      const parsed = await fetchPageContent(title);
      if (!parsed) continue;
      const clean = sanitizeHtml(parsed.html);
      const rewritten = rewriteBlogLinks(clean, titleToSlug);
      const plain = stripHtml(rewritten);
      items.push({
        id: title,
        slug: titleToSlug.get(title),
        sourceTitle: title,
        sourceUrl: `${BASE}/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`,
        title: parsed.displayTitle || formatTitle(title),
        excerpt: plain.slice(0, 260),
        plainText: plain,
        html: rewritten,
      });
    }
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: BASE,
        count: items.length,
        unavailable: looksUnavailable,
        fetchError: fetchError || undefined,
        items,
      },
      null,
      2,
    ),
    "utf8",
  );

  if (looksUnavailable) {
    console.log("Pushtipedia appears unavailable right now. Saved empty dataset with status flag.");
  } else {
    console.log(`Saved ${items.length} Pushtipedia blog pages.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

