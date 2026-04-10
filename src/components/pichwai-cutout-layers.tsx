"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { pichwaiCutouts, type PichwaiLayer } from "@/lib/pichwai-assets";

function positionForLayer(src: string, index: number) {
  if (src.includes("Logo in the middle in top menu.png")) {
    return { top: "38%", left: "50%", x: "-50%" as const };
  }
  if (src.includes("cow left")) {
    return { top: "68%", left: "18%", x: "-50%" as const };
  }
  if (src.includes("cow right")) {
    return { top: "68%", left: "82%", x: "-50%" as const };
  }
  // Fallback middle lanes
  const lane = [22, 42, 62][index % 3];
  return { top: `${lane}%`, left: "50%", x: "-50%" as const };
}

function PichwaiLayerItem({
  layer,
  index,
  total,
}: {
  layer: PichwaiLayer;
  index: number;
  total: number;
}) {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 24, damping: 22, mass: 0.62 });
  const isCow = layer.src.includes("cow ");
  const isLogo = layer.src.includes("Logo in the middle in top menu.png");
  const isDivider = layer.src.includes("In between after the first introduction element.png");
  const effectiveParallax = isCow ? 0 : (layer.parallaxY ?? -56);
  const y = useTransform(p, [0, 1], [0, effectiveParallax]);
  const float = useTransform(p, [0, 0.5, 1], isCow ? [0, 0, 0] : [0, -8, 0]);
  const start = isCow
    ? index === 1
      ? 0.44
      : 0.54
    : isDivider
      ? 0.12
      : isLogo
        ? 0.04
        : 0.18 + (index / Math.max(total, 1)) * 0.55;
  const end = Math.min(start + 0.18, 0.98);
  const reveal = useTransform(p, [0, start, end, 1], [0, 0, 1, 1]);
  const enterY = useTransform(p, [0, start, end, 1], [38, 38, 0, 0]);
  const logoRise = useTransform(p, [0, 1], [0, -120]);
  const cowNudge = useTransform(() => (isCow ? 180 : 0));
  const finalY = useTransform(
    () => y.get() + enterY.get() + (isLogo ? logoRise.get() : 0) + cowNudge.get(),
  );
  const vw = isCow ? (layer.widthVw ?? 56) : Math.max(layer.widthVw ?? 30, 68);
  const px = isCow ? (layer.widthPx ?? 700) : Math.max(layer.widthPx ?? 300, 880);
  const opacity = (layer.opacity ?? 0.92) * (isLogo ? 1.28 : 1);
  const fadeOutBottom = useTransform(p, [0, 0.7, 1], [1, 1, 0]);
  const finalOpacity = useTransform(() =>
    opacity * reveal.get() * (isLogo ? fadeOutBottom.get() : 1),
  );
  const isCenterLogo = isLogo;
  const pos = positionForLayer(layer.src, index);

  const box = (
    <div
      className={`relative w-full ${isCow ? "h-[min(40vh,440px)]" : layer.anchor === "center" ? "h-[min(70vh,860px)]" : "h-[min(50vh,560px)]"}`}
    >
      <Image
        src={layer.src}
        alt={layer.alt}
        fill
        className={`object-contain ${isCow ? "object-bottom" : "object-center"} drop-shadow-[0_12px_32px_rgba(114,47,55,0.15)]`}
        sizes={isLogo ? "(max-width: 768px) 98vw, 1380px" : "(max-width: 768px) 96vw, 980px"}
        loading={isCenterLogo ? "eager" : "lazy"}
        priority={false}
      />
    </div>
  );

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        top: pos.top,
        left: pos.left,
        x: pos.x,
        y: finalY,
        opacity: useTransform(() => Math.min(finalOpacity.get(), 1)),
        width: `min(${vw}vw, ${px}px)`,
        maxWidth: isCow ? "min(86vw, 760px)" : "min(98vw, 1380px)",
      }}
    >
      <motion.div style={{ y: float }}>{box}</motion.div>
    </motion.div>
  );
}

export function PichwaiCutoutLayers() {
  if (pichwaiCutouts.length === 0) return null;
  return (
    <>
      {pichwaiCutouts.map((layer, i) => (
        <PichwaiLayerItem
          key={`${layer.src}-${i}`}
          layer={layer}
          index={i}
          total={pichwaiCutouts.length}
        />
      ))}
    </>
  );
}
