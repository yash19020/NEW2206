"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UpdateCard } from "@/components/update-card";
import { recentUpdates, site } from "@/lib/content";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <motion.div
          className="glass-panel relative mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16"
          {...fadeUp}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#722f37]">
            Non-profit · Digital library
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[#2d1218] sm:text-5xl lg:text-[3.05rem] lg:leading-[1.12]">
            Original Pushti granthas,{" "}
            <span className="text-[#1a5c3a]">freely available</span> to every Vaishnava
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5c4a3d]">
            {site.tagline}. Sanskrit, Braj, Hindi, and Gujarati texts — preserving and sharing the
            teachings of Jagadguru Shreemad Vallabhacharya Mahaprabhuji and the Pushti lineage.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <motion.a
              href="/search"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#722f37]/40 bg-[#722f37] px-7 py-3.5 text-sm font-semibold text-[#fffdf8] shadow-md shadow-amber-900/20"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse granthas on PushtiSahitya
            </motion.a>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#c9a227]/60 bg-[#fff9ed] px-7 py-3.5 text-sm font-semibold text-[#4a1c24] transition hover:border-[#b8860b] hover:bg-[#f5e6c8]"
            >
              Our mission
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <motion.div
          className="glass-panel border-[#1a5c3a]/25 bg-gradient-to-br from-[#e8f5ee]/80 via-[#fff9ed] to-[#fdf0e4]/90 p-6 sm:p-7"
          {...fadeUp}
        >
          <p className="text-sm font-semibold text-[#1a5c3a]">Community</p>
          <p className="mt-2 text-sm leading-relaxed text-[#4a3728] sm:text-base">
            Pushtimarg at the{" "}
            <a
              href="http://www.parliamentofreligions.org/"
              className="font-semibold text-[#722f37] underline decoration-[#c9a227]/60 underline-offset-2 hover:text-[#5a252c]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Parliament of World&apos;s Religions
            </a>
            , Toronto — Nov 1–7, 2018. Stand by for more details on the original site.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20" id="updates">
        <motion.div {...fadeUp}>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#722f37]">
            Recent updates
          </h2>
          <p className="mt-3 max-w-xl text-[#5c4a3d]">
            Talks, articles, and downloads — links open the canonical files on{" "}
            {site.url.replace("https://", "")}.
          </p>
        </motion.div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {recentUpdates.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <UpdateCard item={item} />
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#c9a227]/30 px-4 py-16 sm:px-6 lg:py-24 lg:pb-36">
        <motion.div
          className="glass-panel mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-14"
          {...fadeUp}
        >
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#722f37]">
            Free repository of Pushti Sampraday granthas
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-4 leading-relaxed text-[#4a3728]">
              <p>
                The main objective of this collection is to disseminate the true principles of
                Jagad Guru Shreemad Vallabhacharya Mahaprabhuji by making original granthas of
                Pushtimarg available to all Vaishnavas through the Internet — for easy, fast access
                so that everyone can understand and implement our Acharya&apos;s teachings in their
                true sense.
              </p>
              <p>
                The repository includes works of Vallabhacharyaji, Shree Gopinath Prabhucharans,
                Shree Vitthalnathji Prabhucharans, and other acharyas. Materials are offered in PDF
                format and are free to download. This portal is purely non-profit and exists only to
                serve Pushti Sampraday.
              </p>
            </div>
            <ul className="space-y-4 rounded-2xl border-2 border-[#c9a227]/35 bg-[#fff9ed]/90 p-6 sm:p-8">
              {[
                "Sanskrit, Braj, Hindi, and Gujarati texts",
                "Original lineage granthas in PDF",
                "No fees — entirely non-profit",
                "Copyright concerns: contact admin@pushtisahitya.org",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm text-[#3d1620]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1a5c3a]/15 text-xs font-bold text-[#1a5c3a]">
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

    </>
  );
}
