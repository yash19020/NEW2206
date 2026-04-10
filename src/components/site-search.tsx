"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type SearchItem = {
  id: string;
  href: string;
  title: string;
  sourcePath: string;
  text: string;
  kind: "page" | "entry";
};

type IndexedItem = SearchItem & {
  normalizedTitle: string;
  normalizedText: string;
  tokens: string[];
};

const SYNONYMS: Record<string, string[]> = {
  krishna: ["shree", "thakurji", "gopal", "govind"],
  vallabh: ["vallabhacharya", "mahaprabhuji", "acharya"],
  seva: ["service", "vidhi", "sadhana"],
  bhakti: ["devotion", "satsang", "stotra"],
  geeta: ["gita", "gitopanishad"],
  granth: ["granthas", "scripture", "text", "book"],
};

function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(input: string) {
  return normalize(input)
    .split(" ")
    .filter((w) => w.length > 1);
}

function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function bestFuzzyScore(queryToken: string, tokens: string[]) {
  if (queryToken.length < 4) return 0;
  let best = 0;
  for (const t of tokens) {
    if (Math.abs(t.length - queryToken.length) > 2) continue;
    const d = levenshtein(queryToken, t);
    if (d <= 2) best = Math.max(best, d === 1 ? 2.4 : 1.3);
  }
  return best;
}

function excerpt(text: string, queryTokens: string[]) {
  if (!text) return "";
  const lowered = text.toLowerCase();
  let start = 0;
  for (const token of queryTokens) {
    const idx = lowered.indexOf(token.toLowerCase());
    if (idx >= 0) {
      start = Math.max(0, idx - 80);
      break;
    }
  }
  const end = Math.min(text.length, start + 220);
  return `${start > 0 ? "..." : ""}${text.slice(start, end)}${end < text.length ? "..." : ""}`;
}

export function SiteSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");

  const indexed = useMemo<IndexedItem[]>(
    () =>
      items.map((i) => ({
        ...i,
        normalizedTitle: normalize(i.title),
        normalizedText: normalize(i.text),
        tokens: Array.from(new Set(words(`${i.title} ${i.text}`))).slice(0, 220),
      })),
    [items],
  );

  const results = useMemo(() => {
    const q = normalize(submitted);
    if (!q) return [];
    const qTokens = Array.from(new Set(words(q)));
    const expandedTokens = Array.from(
      new Set(
        qTokens.flatMap((t) => {
          const s = SYNONYMS[t] ?? [];
          return [t, ...s];
        }),
      ),
    );

    const ranked = indexed
      .map((item) => {
        let score = 0;
        if (item.normalizedTitle.includes(q)) score += 12;
        if (item.normalizedText.includes(q)) score += 7;

        for (const token of qTokens) {
          if (item.normalizedTitle.includes(token)) score += 4;
          if (item.normalizedText.includes(token)) score += 2;
          if (item.tokens.some((t) => t.startsWith(token))) score += 1.4;
          score += bestFuzzyScore(token, item.tokens);
        }

        for (const token of expandedTokens) {
          if (token.length < 3) continue;
          if (item.normalizedTitle.includes(token)) score += 1.5;
          else if (item.normalizedText.includes(token)) score += 0.8;
        }

        return { item, score };
      })
      .filter((r) => r.score >= 2.2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);

    return ranked.map(({ item, score }) => ({
      ...item,
      score,
      preview: excerpt(item.text, qTokens),
    }));
  }, [indexed, submitted]);

  const defaultMaterials = useMemo(
    () =>
      indexed
        .filter((i) => i.kind === "entry")
        .sort((a, b) => a.title.localeCompare(b.title))
        .slice(0, 240),
    [indexed],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <section className="glass-panel px-6 py-8 sm:px-10 sm:py-10">
        <h1 className="font-serif text-3xl font-semibold text-[#722f37]">Search Granth Library</h1>
        <p className="mt-2 text-sm text-[#5b3a2f]">
          Search across locally saved website pages with typo-tolerant and meaning-based matching.
        </p>

        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(query);
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: yamunashtakam, anubhasya, pushti seva, vallabh vedant..."
            className="w-full rounded-xl border-2 border-[#c9a227]/50 bg-[#fffdf8]/95 px-4 py-3 text-[#3d1620] outline-none ring-0 placeholder:text-[#8b7355] focus:border-[#722f37]"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#722f37] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f2730]"
          >
            Search
          </button>
        </form>

        {submitted ? (
          <div className="mt-6">
            <p className="mb-3 text-sm text-[#5b3a2f]">
              {results.length} result{results.length === 1 ? "" : "s"} for{" "}
              <span className="font-semibold text-[#722f37]">“{submitted}”</span>
            </p>
            <div className="space-y-3">
              {results.map((r) => (
                <article
                  key={r.id}
                  className="rounded-xl border border-[#c9a227]/35 bg-[#fff9ed]/85 p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {r.href.startsWith("/") ? (
                      <Link href={r.href} className="font-medium text-[#1a5c3a] hover:underline">
                        {r.title}
                      </Link>
                    ) : (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1a5c3a] hover:underline"
                      >
                        {r.title}
                      </a>
                    )}
                    <span className="rounded-md bg-[#f5e6c8] px-2 py-0.5 text-xs text-[#6b4c2f]">
                      {r.kind === "page" ? "Page" : "Entry"}
                    </span>
                    <span className="text-xs text-[#8b7355]">{r.sourcePath}</span>
                  </div>
                  {r.preview ? <p className="mt-2 text-sm text-[#3d1620]">{r.preview}</p> : null}
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <p className="mb-3 text-sm text-[#6b5344]">
              Showing listed materials from across the local library. Use search for faster lookup.
            </p>
            <div className="space-y-3">
              {defaultMaterials.map((r) => (
                <article
                  key={r.id}
                  className="rounded-xl border border-[#c9a227]/35 bg-[#fff9ed]/85 p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {r.href.startsWith("/") ? (
                      <Link href={r.href} className="font-medium text-[#1a5c3a] hover:underline">
                        {r.title}
                      </Link>
                    ) : (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1a5c3a] hover:underline"
                      >
                        {r.title}
                      </a>
                    )}
                    <span className="text-xs text-[#8b7355]">{r.sourcePath}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

