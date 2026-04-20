import { readFile } from "node:fs/promises";
import path from "node:path";

export type PushtipediaBlogItem = {
  id: string;
  slug: string;
  sourceTitle: string;
  sourceUrl: string;
  title: string;
  excerpt: string;
  plainText: string;
  html: string;
};

export type PushtipediaSnapshot = {
  generatedAt: string | null;
  source: string;
  count: number;
  unavailable?: boolean;
  fetchError?: string;
  items: PushtipediaBlogItem[];
};

export async function readPushtipediaSnapshot(): Promise<PushtipediaSnapshot> {
  const filePath = path.join(process.cwd(), "src/data/pushtipedia-blogs.json");
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as PushtipediaSnapshot;
}

