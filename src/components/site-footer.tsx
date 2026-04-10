import Link from "next/link";
import { navItems, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-auto border-t-2 border-[#c9a227]/35 bg-[#fdf6e8]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="max-w-md">
            <p className="font-serif text-lg font-semibold text-[#722f37]">{site.name}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5c4a3d]">{site.tagline}</p>
            <p className="mt-2.5 text-xs text-[#8b7355]">
              Non-profit portal. Not the official website of Pushti Sampraday.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#722f37]/80">
              Explore
            </p>
            <ul className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#4a3728] transition hover:text-[#722f37]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-[#4a3728] transition hover:text-[#722f37]"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-5 border-t border-[#c9a227]/25 pt-4 text-center text-xs text-[#8b7355]">
          © {new Date().getFullYear()} {site.name}. Granthas and media remain subject to their
          respective notices on the{" "}
          <a
            href={site.url}
            className="text-[#722f37] underline decoration-[#c9a227]/50 underline-offset-2 hover:text-[#5a252c]"
          >
            original site
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
