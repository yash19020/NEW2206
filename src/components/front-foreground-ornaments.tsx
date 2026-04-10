"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { pichwaiCutouts, type PichwaiLayer } from "@/lib/pichwai-assets";

function byName(namePart: string) {
  return pichwaiCutouts.find((x) => x.src.includes(namePart));
}

function FloatingImage({
  layer,
  className,
  sizes,
  eager = false,
}: {
  layer: PichwaiLayer;
  className: string;
  sizes: string;
  eager?: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 20, damping: 20, mass: 0.75 });
  const parallax = layer.parallaxY ?? -80;
  const y = useTransform(p, [0, 1], [0, parallax * 1.6]);
  const bob = useTransform(p, [0, 0.5, 1], [0, -12, 0]);
  const tilt = useTransform(p, [0, 0.5, 1], [-1.5, 1.5, -1.5]);
  const isCowLeft = layer.src.includes("cow left");
  const isCowRight = layer.src.includes("cow right");
  const isLogo = layer.src.includes("Logo in the middle in top menu.png");
  const start = isCowLeft ? 0.04 : isCowRight ? 0.18 : isLogo ? 0.1 : 0.12;
  const end = isCowLeft ? 0.24 : isCowRight ? 0.38 : isLogo ? 0.3 : 0.34;
  const opacity = useTransform(p, [0, start, end, 1], [0, 0, 1, 1]);
  const x = useTransform(
    p,
    [0, start, end, 1],
    isCowLeft ? [-180, -180, 0, 0] : isCowRight ? [180, 180, 0, 0] : [0, 0, 0, 0],
  );
  const scale = useTransform(
    p,
    [0, start, end, 1],
    isLogo ? [0.65, 0.65, 1.08, 1] : [0.9, 0.9, 1.02, 1],
  );
  return (
    <motion.div className={className} style={{ y, x, opacity }}>
      <motion.div style={{ y: bob, rotate: tilt, scale }} className="relative h-full w-full" data-no-save>
        <Image
          src={layer.src}
          alt={layer.alt}
          fill
          className="select-none object-contain object-center drop-shadow-[0_16px_36px_rgba(114,47,55,0.18)]"
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroForegroundOrnaments() {
  const leftCow = byName("cow left");
  const rightCow = byName("cow right");
  const logo = byName("Logo in the middle in top menu.png");
  if (!leftCow && !rightCow && !logo) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <div className="grid grid-cols-12 items-end gap-2 sm:gap-4">
        <div className="col-span-3 hidden h-52 md:block lg:h-64 xl:h-72">
          {leftCow ? (
            <FloatingImage
              layer={leftCow}
              className="h-full w-full opacity-[0.9]"
              sizes="(max-width: 1024px) 300px, 420px"
              eager
            />
          ) : null}
        </div>
        <div className="col-span-12 h-44 sm:h-56 md:col-span-6 md:h-72 lg:h-80 xl:h-96">
          {logo ? (
            <FloatingImage
              layer={logo}
              className="h-full w-full opacity-[0.7]"
              sizes="(max-width: 768px) 92vw, 760px"
              eager
            />
          ) : null}
        </div>
        <div className="col-span-3 hidden h-52 md:block lg:h-64 xl:h-72">
          {rightCow ? (
            <FloatingImage
              layer={rightCow}
              className="h-full w-full opacity-[0.9]"
              sizes="(max-width: 1024px) 300px, 420px"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function DividerForegroundOrnament() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 22, damping: 20, mass: 0.7 });
  const y = useTransform(p, [0, 1], [0, -36]);
  const clip = useTransform(p, [0, 0.22, 0.38, 1], [0, 0, 1, 1]);
  const x = useTransform(p, [0, 0.22, 0.38, 1], [-140, -140, 0, 0]);
  const opacity = useTransform(p, [0, 0.22, 0.38, 1], [0, 0, 1, 1]);
  const revealClipPath = useTransform(() => `inset(0 ${(1 - clip.get()) * 100}% 0 0)`);
  const divider = byName("In between after the first introduction element.png");
  if (!divider) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
      <motion.div className="relative mx-auto h-24 max-w-4xl overflow-hidden sm:h-32" style={{ y, x, opacity }}>
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: revealClipPath }}
        >
          <Image
            src={divider.src}
            alt={divider.alt}
            fill
            className="select-none object-contain object-center opacity-[0.95] drop-shadow-[0_14px_28px_rgba(114,47,55,0.14)]"
            sizes="(max-width: 768px) 94vw, 860px"
            loading="eager"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export function BoatForegroundOrnament() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 22, damping: 20, mass: 0.7 });
  const y = useTransform(p, [0, 1], [0, -70]);
  const rotate = useTransform(p, [0, 0.5, 1], [-1.8, 1.8, -1.8]);
  const enterY = useTransform(p, [0, 0.48, 0.68, 1], [120, 120, 0, 0]);
  const enterX = useTransform(p, [0, 0.48, 0.68, 1], [160, 160, 0, -40]);
  const opacity = useTransform(p, [0, 0.48, 0.68, 1], [0, 0, 1, 1]);
  const scale = useTransform(p, [0, 0.48, 0.68, 1], [0.82, 0.82, 1.08, 1]);
  const composedY = useTransform(() => y.get() + enterY.get());
  const boat = byName("boat krishna");
  if (!boat) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <motion.div
        className="relative mx-auto h-64 max-w-4xl sm:h-80 lg:h-[26rem]"
        data-no-save
        style={{ y: composedY, rotate, x: enterX, opacity, scale }}
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative h-full w-full">
          <Image
            src={boat.src}
            alt={boat.alt}
            fill
            className="select-none object-contain object-center drop-shadow-[0_20px_40px_rgba(114,47,55,0.2)]"
            sizes="(max-width: 768px) 96vw, 980px"
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

