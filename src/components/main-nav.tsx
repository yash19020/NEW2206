"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  acharyasTree,
  mainNavigation,
  miscScripturesTree,
  scripturesTree,
  sevaTree,
  type NavNode,
} from "@/lib/navigation";

function useClientMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path fill="currentColor" d="M6 8L1 3h10L6 8z" />
    </svg>
  );
}

function NavAnchor({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const internal = href.startsWith("/");
  if (internal) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick} rel="noopener noreferrer">
      {children}
    </a>
  );
}

const pill =
  "rounded-full border-2 border-[#c9a227]/55 bg-[#fffdf8]/95 px-3.5 py-2 text-sm font-medium text-[#3d1620] shadow-sm transition hover:border-[#b8860b] hover:bg-[#fff9eb]";

function PillLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const internal = href.startsWith("/");
  const active = internal && pathname === href;
  return (
    <NavAnchor
      href={href}
      onClick={onClick}
      className={`${pill} ${active ? "border-[#722f37] bg-[#f5e6c8] text-[#4a1c24]" : ""}`}
    >
      {children}
    </NavAnchor>
  );
}

function TreeLinks({ nodes }: { nodes: NavNode[] }) {
  return (
    <ul className="max-h-[min(70vh,420px)] space-y-0.5 overflow-y-auto overscroll-contain py-2">
      {nodes.map((node) => (
        <TreeLinkItem key={node.label} node={node} />
      ))}
    </ul>
  );
}

function TreeLinkItem({ node }: { node: NavNode }) {
  if (node.children?.length) {
    return (
      <li className="px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#722f37]">
          {node.label}
        </p>
        <ul className="mt-1.5 space-y-0.5 border-l-2 border-[#c9a227]/45 pl-2.5">
          {node.children.map((c) => (
            <TreeLinkItem key={`${node.label}-${c.label}`} node={c} />
          ))}
        </ul>
      </li>
    );
  }
  if (node.href) {
    return (
      <li className="px-1">
        <NavAnchor
          href={node.href}
          className="block rounded-lg px-2.5 py-1.5 text-sm text-[#3d1620] transition hover:bg-[#f5e6c8]/90 hover:text-[#722f37]"
        >
          {node.label}
        </NavAnchor>
      </li>
    );
  }
  return (
    <li className="px-3 py-1 text-sm text-[#8b7355]">{node.label}</li>
  );
}

function ScripturesMega() {
  return (
    <div className="grid max-h-[min(75vh,680px)] grid-cols-1 gap-4 overflow-y-auto overscroll-contain p-5 sm:grid-cols-2 xl:grid-cols-3">
      {scripturesTree.map((section) => (
        <div
          key={section.label}
          className="rounded-xl border border-[#c9a227]/40 bg-gradient-to-b from-[#fff9ed] to-[#fdf6e8] p-4 shadow-inner shadow-amber-900/5"
        >
          <h3 className="border-b border-[#722f37]/15 pb-2 text-xs font-bold uppercase tracking-wider text-[#722f37]">
            {section.label}
          </h3>
          <div className="mt-3">
            {section.children?.length ? (
              <ul className="space-y-1">
                {section.children.map((c) => (
                  <TreeLinkItem key={c.label} node={c} />
                ))}
              </ul>
            ) : section.href ? (
              <NavAnchor
                href={section.href}
                className="text-sm font-medium text-[#1a5c3a] hover:text-[#722f37] hover:underline"
              >
                {section.label} ↗
              </NavAnchor>
            ) : (
              <span className="text-sm text-[#8b7355]">{section.label}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function PortalDropdown({
  label,
  align = "start",
  children,
}: {
  label: string;
  align?: "start" | "center";
  children: React.ReactNode;
}) {
  const mounted = useClientMounted();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 920 });
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeave = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const updatePos = useCallback(() => {
    const el = triggerRef.current;
    if (!el || typeof window === "undefined") return;
    const r = el.getBoundingClientRect();
    const pw =
      align === "center"
        ? Math.min(920, window.innerWidth - 32)
        : Math.min(320, window.innerWidth - 32);
    let left = align === "center" ? r.left + r.width / 2 - pw / 2 : r.left;
    left = Math.max(16, Math.min(left, window.innerWidth - pw - 16));
    setPos({ top: r.bottom + 10, left, width: pw });
  }, [align]);

  const handleEnter = () => {
    clearLeave();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearLeave();
    leaveTimer.current = setTimeout(() => setOpen(false), 280);
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePos();
  }, [open, updatePos]);

  useEffect(() => {
    if (!open) return;
    const h = () => updatePos();
    window.addEventListener("scroll", h, true);
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("scroll", h, true);
      window.removeEventListener("resize", h);
    };
  }, [open, updatePos]);

  return (
    <>
      <div
        className="relative inline-flex"
        onMouseEnter={handleEnter}
        onMouseLeave={scheduleClose}
      >
        <button
          ref={triggerRef}
          type="button"
          className={`${pill} flex cursor-default items-center gap-1`}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {label}
          <ChevronDown className="opacity-75" />
        </button>
      </div>
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed z-[10000]"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
            onMouseEnter={handleEnter}
            onMouseLeave={scheduleClose}
          >
            <div
              className="max-h-[min(75vh,680px)] overflow-x-hidden overflow-y-auto rounded-2xl border-2 border-[#c9a227]/70 bg-[#fffdf8]/[0.98] shadow-[0_24px_70px_-14px_rgba(114,47,55,0.38)] backdrop-blur-sm ring-1 ring-[#722f37]/10"
              onClick={() => setOpen(false)}
            >
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function MobileNode({ node, onNavigate }: { node: NavNode; onNavigate: () => void }) {
  const kids = node.children?.length ? node.children : null;

  if (!kids) {
    if (!node.href) {
      return <p className="px-4 py-2 text-sm text-[#8b7355]">{node.label}</p>;
    }
    return (
      <NavAnchor
        href={node.href}
        onClick={onNavigate}
        className="block rounded-xl px-4 py-3 text-sm text-[#3d1620] hover:bg-[#f5e6c8]/80"
      >
        {node.label}
      </NavAnchor>
    );
  }

  return (
    <details className="group mb-2 overflow-hidden rounded-xl border border-[#c9a227]/35 bg-[#fffdf8]/90 last:mb-0">
      <summary className="cursor-pointer list-none px-4 py-3.5 text-sm font-medium text-[#4a1c24] [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          {node.label}
          <ChevronDown className="text-[#722f37]/60 transition-transform group-open:rotate-180" />
        </span>
      </summary>
      <div className="border-t border-[#c9a227]/25 bg-[#fdf6e8]/80 px-2 py-2">
        {node.href ? (
          <NavAnchor
            href={node.href}
            onClick={onNavigate}
            className="mb-2 block rounded-lg px-3 py-2 text-sm font-medium text-[#1a5c3a] hover:bg-white/60"
          >
            Open “{node.label}” on archive ↗
          </NavAnchor>
        ) : null}
        <div className="flex flex-col gap-0.5">
          {kids.map((c) => (
            <MobileNode key={`${node.label}-${c.label}`} node={c} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </details>
  );
}

const articlesHref = mainNavigation.find((n) => n.label === "Articles")?.href ?? "#";
const vachanHref = mainNavigation.find((n) => n.label === "Vachanamruts")?.href ?? "#";
const searchHref = mainNavigation.find((n) => n.label === "Search Granth")?.href ?? "#";
const blogsHref = mainNavigation.find((n) => n.label === "Blogs")?.href ?? "/blogs";
const subscribeHref = mainNavigation.find((n) => n.label === "Subscribe")?.href ?? "#";

export function MainNav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const bodyReady = useClientMounted();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const mobileSheet = (
    <>
      <motion.button
        key="mobile-backdrop"
        type="button"
        aria-label="Close menu"
        className="fixed inset-0 z-[10000] bg-[#2d1218]/45 backdrop-blur-sm md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={close}
      />
      <motion.aside
        key="mobile-panel"
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        className="fixed inset-y-0 right-0 z-[10001] flex max-h-[100dvh] w-[min(100vw-1rem,26rem)] flex-col border-l-2 border-[#c9a227]/55 bg-[#fffdf8] shadow-2xl shadow-amber-900/25 backdrop-blur-md md:hidden"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#c9a227]/35 bg-[#fdf6e8]/95 px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <span className="font-serif text-lg font-semibold text-[#722f37]">Browse granthas</span>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-[#722f37]/70 hover:bg-[#f5e6c8]"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="px-1">
            <PillLink href="/" onClick={close}>
              Home
            </PillLink>
          </div>
          {[
            { label: "Acharyas", children: acharyasTree },
            { label: "Scriptures", children: scripturesTree },
            { label: "Misc. scriptures", children: miscScripturesTree },
            { label: "Seva Sahitya", children: sevaTree },
          ].map((block) => (
            <MobileNode
              key={block.label}
              node={{ label: block.label, children: block.children }}
              onNavigate={close}
            />
          ))}
          <NavAnchor
            href={articlesHref}
            onClick={close}
            className="block rounded-xl border border-[#c9a227]/35 bg-[#fff9ed] px-4 py-3 text-sm font-medium text-[#3d1620]"
          >
            Articles
          </NavAnchor>
          <NavAnchor
            href={vachanHref}
            onClick={close}
            className="block rounded-xl border border-[#c9a227]/35 bg-[#fff9ed] px-4 py-3 text-sm font-medium text-[#3d1620]"
          >
            Vachanamruts
          </NavAnchor>
          <NavAnchor
            href={searchHref}
            onClick={close}
            className="block rounded-xl border border-[#c9a227]/35 bg-[#fff9ed] px-4 py-3 text-sm font-medium text-[#3d1620]"
          >
            Search Granth
          </NavAnchor>
          <NavAnchor
            href={blogsHref}
            onClick={close}
            className="block rounded-xl border border-[#c9a227]/35 bg-[#fff9ed] px-4 py-3 text-sm font-medium text-[#3d1620]"
          >
            Blogs
          </NavAnchor>
          <NavAnchor
            href={subscribeHref}
            onClick={close}
            className="block rounded-xl border border-[#c9a227]/35 bg-[#fff9ed] px-4 py-3 text-sm font-medium text-[#3d1620]"
          >
            Subscribe
          </NavAnchor>
          <NavAnchor
            href="/contact"
            onClick={close}
            className="block rounded-xl border border-[#c9a227]/35 bg-[#fff9ed] px-4 py-3 text-sm font-medium text-[#3d1620]"
          >
            Contact
          </NavAnchor>
        </div>
      </motion.aside>
    </>
  );

  return (
    <>
      <nav
        className="hidden w-full max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-2 md:flex lg:max-w-none lg:justify-end"
        aria-label="Main navigation"
      >
        <PillLink href="/">Home</PillLink>

        <PortalDropdown label="Acharyas">
          <TreeLinks nodes={acharyasTree} />
        </PortalDropdown>

        <PortalDropdown label="Scriptures" align="center">
          <ScripturesMega />
        </PortalDropdown>

        <PortalDropdown label="Misc. scriptures">
          <TreeLinks nodes={miscScripturesTree} />
        </PortalDropdown>

        <PortalDropdown label="Seva Sahitya">
          <TreeLinks nodes={sevaTree} />
        </PortalDropdown>

        <PillLink href={articlesHref}>Articles</PillLink>
        <PillLink href={vachanHref}>Vachanamruts</PillLink>
        <PillLink href={searchHref}>Search</PillLink>
        <PillLink href={blogsHref}>Blogs</PillLink>
        <PillLink href={subscribeHref}>Subscribe</PillLink>
        <PillLink href="/contact">Contact</PillLink>
      </nav>

      <div className="flex md:hidden">
        <motion.button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((o) => !o)}
          className="rounded-full border-2 border-[#722f37]/50 bg-gradient-to-r from-[#f5e6c8] to-[#fff9ed] px-4 py-2 text-sm font-semibold text-[#4a1c24] shadow-md shadow-amber-900/15"
          whileTap={{ scale: 0.97 }}
        >
          {open ? "Close" : "Menu"}
        </motion.button>
      </div>

      {bodyReady &&
        createPortal(
          <AnimatePresence>
            {open ? mobileSheet : null}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
