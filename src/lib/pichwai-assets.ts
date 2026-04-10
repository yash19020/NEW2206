/**
 * Drop PNG / WebP cutouts and pichwai fragments into `public/pichwai/` and list them here.
 * Paths are served from the site root, e.g. `/pichwai/peacock.png`.
 *
 * After adding files, uncomment or append entries — the backdrop will use these instead of
 * the default SVG motifs (so your art stays on-brand).
 */
export type PichwaiLayer = {
  src: string;
  alt: string;
  anchor: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  /** Approximate width: min(this vw, widthPx) — tweak per asset */
  widthVw?: number;
  widthPx?: number;
  /** Vertical parallax in px over full page scroll */
  parallaxY?: number;
  /** 0–1 */
  opacity?: number;
};

/** Add your cutouts here (empty = subtle built-in SVG placeholders are shown instead). */
export const pichwaiCutouts: PichwaiLayer[] = [
  {
    src: "/pichwai/front page/Logo in the middle in top menu.png",
    alt: "Pushti Sahitya emblem",
    anchor: "center",
    widthVw: 72,
    widthPx: 760,
    opacity: 0.34,
    parallaxY: -72,
  },
  {
    src: "/pichwai/front page/cow left.png",
    alt: "Cow",
    anchor: "bottom-left",
    widthVw: 62,
    widthPx: 700,
    parallaxY: -85,
    opacity: 0.6,
  },
  {
    src: "/pichwai/front page/cow right.png",
    alt: "Cow",
    anchor: "bottom-right",
    widthVw: 62,
    widthPx: 700,
    parallaxY: -85,
    opacity: 0.6,
  },
];

/** If you add PNGs but still want faint SVG lotus/peacock shapes behind them, set true. */
export const showSvgMotifsBehindCutouts = false;
