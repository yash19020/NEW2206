"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PichwaiCutoutLayers } from "@/components/pichwai-cutout-layers";
import { RiverBottomBackdrop } from "@/components/river-bottom-backdrop";
import { showSvgMotifsBehindCutouts } from "@/lib/pichwai-assets";

/** Subtle SVG placeholders — toned down; hidden when you add PNG cutouts in `pichwai-assets.ts`. */
function FallbackSvgMotifs({
  yLotus,
  yPeacock,
  yCow,
  yElephant,
  rotPeacock,
  swayCow,
}: {
  yLotus: MotionValue<number>;
  yPeacock: MotionValue<number>;
  yCow: MotionValue<number>;
  yElephant: MotionValue<number>;
  rotPeacock: MotionValue<number>;
  swayCow: MotionValue<number>;
}) {
  return (
    <div className="opacity-[0.42]">
      <motion.div
        className="absolute left-[2%] top-[12%] w-[min(28vw,200px)] text-[#722f37]/35 sm:w-[min(22vw,240px)]"
        style={{ y: yLotus }}
      >
        <svg viewBox="0 0 120 120" className="h-auto w-full" aria-hidden>
          <ellipse cx="60" cy="88" rx="8" ry="22" fill="currentColor" opacity="0.35" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <ellipse
              key={i}
              cx="60"
              cy="58"
              rx="14"
              ry="32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              transform={`rotate(${a} 60 58)`}
              opacity="0.75"
            />
          ))}
          <circle cx="60" cy="58" r="6" fill="#c9a227" opacity="0.45" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-[-2%] top-[8%] w-[min(38vw,280px)] text-[#1a5c3a]/35 sm:right-[1%] sm:w-[min(32vw,320px)]"
        style={{ y: yPeacock, rotate: rotPeacock }}
      >
        <svg viewBox="0 0 200 200" className="h-auto w-full" aria-hidden>
          <path
            d="M95 165 Q70 140 75 110 Q80 85 100 75 Q120 85 125 110 Q130 140 105 165 Z"
            fill="currentColor"
            opacity="0.45"
          />
          <path
            d="M100 75 L100 45 Q130 35 145 55 Q155 75 140 95 Q125 110 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {[0, 25, 50, 75, 100, 125, 150, 175].map((a, i) => (
            <path
              key={i}
              d="M100 75 Q115 50 130 30"
              fill="none"
              stroke="#722f37"
              strokeWidth="1.2"
              opacity="0.35"
              transform={`rotate(${a} 100 75)`}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[6%] left-[-4%] w-[min(42vw,260px)] text-[#5c3d2e]/32 sm:left-0 sm:w-[min(36vw,300px)]"
        style={{ y: yCow, rotate: swayCow }}
      >
        <svg viewBox="0 0 220 160" className="h-auto w-full" aria-hidden>
          <ellipse cx="110" cy="100" rx="72" ry="38" fill="currentColor" opacity="0.5" />
          <ellipse cx="165" cy="88" rx="28" ry="22" fill="currentColor" opacity="0.5" />
          <path
            d="M52 88 Q40 60 48 45 Q55 35 68 42"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[4%] right-[-3%] w-[min(40vw,240px)] text-[#722f37]/25 sm:right-0 sm:w-[min(34vw,280px)]"
        style={{ y: yElephant }}
      >
        <svg viewBox="0 0 200 180" className="h-auto w-full" aria-hidden>
          <path
            d="M40 120 Q35 80 55 55 Q75 35 105 40 Q140 45 155 70 Q165 95 158 125 Q150 145 120 148 L75 145 Q50 140 40 120 Z"
            fill="currentColor"
            opacity="0.4"
          />
          <path
            d="M155 70 Q175 65 188 80 Q195 95 185 115 Q175 130 158 125"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </motion.div>
    </div>
  );
}

/** Warm temple / pichwai-inspired backdrop. Add PNGs via `src/lib/pichwai-assets.ts`. */
function AnimatedBackdrop({ showDecorativeLayers }: { showDecorativeLayers: boolean }) {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 42, damping: 26, mass: 0.4 });
  const bgPosY = useTransform(p, [0, 1], ["0%", "100%"]);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaMobile = window.matchMedia("(max-width: 900px)");
    const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setIsLowPowerMode(mediaMobile.matches || mediaReduced.matches);
    update();
    mediaMobile.addEventListener("change", update);
    mediaReduced.addEventListener("change", update);
    return () => {
      mediaMobile.removeEventListener("change", update);
      mediaReduced.removeEventListener("change", update);
    };
  }, []);

  const yLotus = useTransform(p, [0, 1], [0, -45]);
  const yPeacock = useTransform(p, [0, 1], [0, 35]);
  const yCow = useTransform(p, [0, 1], [0, -28]);
  const yElephant = useTransform(p, [0, 1], [0, 40]);
  const rotPeacock = useTransform(p, [0, 1], [0, 6]);
  const swayCow = useTransform(p, [0, 1], [-2, 3]);

  const showHeavyDecorativeLayers = showDecorativeLayers && !isLowPowerMode;
  const showSvg = showHeavyDecorativeLayers && showSvgMotifsBehindCutouts;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 isolate overflow-hidden" aria-hidden>
      {/* Primary SVG background: always bottom-most, scroll-linked top->bottom. */}
      <motion.div
        className="sacred-bg-layer absolute inset-0 z-[-20]"
        style={{
          backgroundImage: "var(--sacred-bg-image)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
          backgroundPositionY: bgPosY,
        }}
      />

      <motion.div className="dark-stars-layer absolute inset-0 z-[-19]" style={{ y: bgPosY }} />
      <div className="dark-shooting-stars absolute inset-0 z-[-18]">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <svg
        className="sacred-vine-overlay absolute inset-0 z-[-10] h-full w-full opacity-[0.045]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="pichwai-vine" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M0 40 Q20 20 40 40 T80 40" fill="none" stroke="#722f37" strokeWidth="0.6" />
            <circle cx="40" cy="40" r="2.5" fill="#1a5c3a" opacity="0.45" />
            <path d="M38 38 L40 34 L42 38 Z" fill="#c9a227" opacity="0.55" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pichwai-vine)" />
      </svg>

      {showHeavyDecorativeLayers ? (
        <div
          data-no-save
          className="relative z-20"
          style={{ WebkitTouchCallout: "none" } as CSSProperties}
        >
          <PichwaiCutoutLayers />
        </div>
      ) : null}

      {showSvg ? (
        <div className="relative z-20">
          <FallbackSvgMotifs
            yLotus={yLotus}
            yPeacock={yPeacock}
            yCow={yCow}
            yElephant={yElephant}
            rotPeacock={rotPeacock}
            swayCow={swayCow}
          />
        </div>
      ) : null}

      {showHeavyDecorativeLayers ? <RiverBottomBackdrop /> : null}

      <div
        className="absolute inset-x-0 top-0 z-30 h-32 bg-gradient-to-b from-amber-200/15 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-40 bg-gradient-to-t from-rose-900/10 to-transparent"
        aria-hidden
      />
    </div>
  );
}

export function SacredScrollBackdrop() {
  const pathname = usePathname();
  return <AnimatedBackdrop showDecorativeLayers={pathname === "/"} />;
}
