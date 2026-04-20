"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] overflow-visible px-3 pb-3 pt-3 sm:px-5">
      <motion.div
        className="relative mx-auto max-w-7xl overflow-visible rounded-2xl border-2 border-[#c9a227]/50 bg-[#fffdf9]/93 shadow-[0_16px_48px_-12px_rgba(114,47,55,0.22)] backdrop-blur-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div
          className="h-1 w-full rounded-t-[0.9rem] bg-gradient-to-r from-[#722f37] via-[#c9a227] to-[#1a5c3a]"
          aria-hidden
        />
        <div className="flex flex-col items-stretch gap-5 overflow-visible px-4 py-4 sm:px-6 lg:px-10 lg:flex-row lg:items-center lg:gap-8">
          <Link href="/" className="group min-w-0 shrink-0 text-center lg:text-left">
            <span className="block font-serif text-2xl font-semibold tracking-tight text-[#722f37] transition-colors group-hover:text-[#5a252c] sm:text-[1.65rem]">
              {site.name}
            </span>
            <span className="mt-1 block text-xs font-medium text-[#5c4a3d] sm:text-sm">{site.tagline}</span>
          </Link>

          <div className="relative z-0 flex min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center overflow-visible lg:items-end">
            <MainNav />
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 border-t border-[#c9a227]/25 pt-4 lg:flex-col lg:items-end lg:justify-center lg:border-t-0 lg:pt-0">
            <ThemeToggle />
            <motion.a
              href="https://www.facebook.com/pushtisahitya"
              rel="noopener noreferrer"
              target="_blank"
              className="rounded-full border border-[#722f37]/25 bg-[#fdf6e8] px-3 py-1.5 text-xs font-semibold text-[#4a1c24] transition hover:border-[#722f37]/45 hover:bg-[#f5e6c8]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Facebook
            </motion.a>
            <motion.a
              href="https://twitter.com/pushtisahitya"
              rel="noopener noreferrer"
              target="_blank"
              className="rounded-full border border-[#722f37]/25 bg-[#fdf6e8] px-3 py-1.5 text-xs font-semibold text-[#4a1c24] transition hover:border-[#722f37]/45 hover:bg-[#f5e6c8]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Twitter
            </motion.a>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
