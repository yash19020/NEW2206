import type { UpdateItem } from "@/lib/content";

export function UpdateCard({ item }: { item: UpdateItem }) {
  return (
    <article className="glass-panel group relative h-full overflow-hidden p-6 pl-7 transition-all duration-300 hover:border-[#722f37]/45 hover:shadow-lg hover:shadow-amber-900/10">
      <div
        className="pointer-events-none absolute inset-y-4 left-0 w-1 rounded-full bg-gradient-to-b from-[#722f37] via-[#c9a227] to-[#1a5c3a] opacity-90"
        aria-hidden
      />
      <h3 className="font-serif text-xl font-semibold tracking-tight text-[#722f37]">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#5c4a3d]">{item.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center rounded-full border border-[#c9a227]/50 bg-[#fdf6e8] px-4 py-2 text-sm font-medium text-[#4a1c24] transition hover:border-[#722f37]/40 hover:bg-[#f5e6c8]"
          >
            {link.label}
            {link.external ? (
              <span className="ml-1.5 text-xs opacity-70" aria-hidden>
                ↗
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </article>
  );
}
