import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Mission and scope of the Pushti Sahitya digital grantha repository.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="glass-panel px-8 py-10 sm:px-10 sm:py-12">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#722f37]">
          About {site.name}
        </h1>
        <p className="mt-4 text-lg text-[#5c4a3d]">{site.tagline}</p>

        <div className="mt-10 space-y-6 leading-relaxed text-[#4a3728]">
          <p>
            This redesigned front-end is a modern, fast companion view of the long-standing resource
            at{" "}
            <a
              href={site.url}
              className="font-medium text-[#722f37] underline decoration-[#c9a227]/60 underline-offset-2 hover:text-[#5a252c]"
            >
              pushtisahitya.org
            </a>
            . The canonical files, PDFs, audio, and policies remain on the original server unless you
            migrate them here.
          </p>
          <p>
            The project&apos;s purpose is to make original Pushtimargiya granthas easy to find and
            download, so Vallabhiya Vaishnavas can study the acharyas&apos; works directly — in
            Sanskrit, Braj, Hindi, and Gujarati.
          </p>
          <p>
            All materials on the portal are intended to be free. The site is not the official website
            of Pushti Sampraday; it is an independent, non-profit effort to preserve and share texts.
          </p>
        </div>

        <p className="mt-12">
          <Link
            href="/contact"
            className="text-sm font-semibold text-[#1a5c3a] hover:text-[#722f37] hover:underline"
          >
            Contact →
          </Link>
        </p>
      </div>
    </div>
  );
}
