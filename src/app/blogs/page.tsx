import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";

type BlogItem = {
  title: string;
  href: string;
  excerpt?: string;
};

type BlogsSnapshot = {
  generatedAt: string | null;
  source: string;
  count: number;
  unavailable?: boolean;
  items: BlogItem[];
};

async function getBlogsSnapshot(): Promise<BlogsSnapshot> {
  const filePath = path.join(process.cwd(), "src/data/pushtipedia-blogs.json");
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as BlogsSnapshot;
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const snapshot = await getBlogsSnapshot();
  const filtered = query
    ? snapshot.items.filter((item) => {
        const text = `${item.title} ${item.excerpt ?? ""}`.toLowerCase();
        return text.includes(query);
      })
    : snapshot.items;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <section className="glass-panel px-6 py-8 sm:px-10 sm:py-10">
        <h1 className="font-serif text-3xl font-semibold text-[#722f37]">Pushtipedia Blogs</h1>
        <p className="mt-2 text-sm text-[#5b3a2f]">
          Search and browse blog articles sourced from{" "}
          <a
            href={snapshot.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a5c3a] underline underline-offset-2"
          >
            pushtipedia.com
          </a>
          .
        </p>

        <form action="/blogs" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search blogs..."
            className="w-full rounded-xl border-2 border-[#c9a227]/50 bg-[#fffdf8]/95 px-4 py-3 text-[#3d1620] outline-none placeholder:text-[#8b7355] focus:border-[#722f37]"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#722f37] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f2730]"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8b7355]">
          <span>Total blogs: {snapshot.count}</span>
          {snapshot.generatedAt ? <span>Last synced: {new Date(snapshot.generatedAt).toLocaleString()}</span> : null}
        </div>

        {snapshot.unavailable ? (
          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50/80 p-4 text-sm text-amber-900">
            Pushtipedia is currently unavailable from the source host, so blogs could not be synced.
            Once it is back, run <code>npm run scrape:blogs</code> and this page will auto-populate.
          </div>
        ) : null}

        <div className="mt-6 space-y-3">
          {filtered.map((item) => (
            <article
              key={item.href}
              className="rounded-xl border border-[#c9a227]/35 bg-[#fff9ed]/85 p-4 shadow-sm"
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#1a5c3a] hover:underline"
              >
                {item.title}
              </a>
              {item.excerpt ? <p className="mt-1.5 text-sm text-[#3d1620]">{item.excerpt}</p> : null}
            </article>
          ))}
          {!filtered.length ? (
            <div className="rounded-xl border border-[#c9a227]/30 bg-[#fffdf8]/80 p-4 text-sm text-[#5b3a2f]">
              No blogs found for this search.
              <div className="mt-2">
                <Link href="/blogs" className="text-[#722f37] underline underline-offset-2">
                  Clear search
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

