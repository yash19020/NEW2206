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
    items = pages
      .map((p) => p.title)
      .filter((t) => typeof t === "string" && isUsefulTitle(t))
      .map((title) => ({
        title: formatTitle(title),
        href: `${BASE}/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`,
        excerpt: "",
      }));
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

