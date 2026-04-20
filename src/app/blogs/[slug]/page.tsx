import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readPushtipediaSnapshot } from "@/lib/pushtipedia";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const snapshot = await readPushtipediaSnapshot();
  const blog = snapshot.items.find((item) => item.slug === slug);
  return {
    title: blog ? blog.title : "Blog",
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const snapshot = await readPushtipediaSnapshot();
  const blog = snapshot.items.find((item) => item.slug === slug);
  if (!blog) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <section className="glass-panel px-6 py-8 sm:px-10 sm:py-10">
        <div className="mb-6 border-b border-[#c9a227]/30 pb-4">
          <Link href="/blogs" className="text-sm text-[#1a5c3a] underline underline-offset-2">
            ← Back to Blogs
          </Link>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-[#722f37]">{blog.title}</h1>
          <p className="mt-2 text-xs text-[#8b7355]">
            Source:{" "}
            <a
              href={blog.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a5c3a] underline underline-offset-2"
            >
              Open on Pushtipedia
            </a>
          </p>
        </div>
        <article className="legacy-content text-[#3d1620]" dangerouslySetInnerHTML={{ __html: blog.html }} />
      </section>
    </div>
  );
}

