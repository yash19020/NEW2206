"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function RiverBottomBackdrop() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 24, damping: 22, mass: 0.6 });

  const driftX = useTransform(p, [0, 1], [-18, 22]);
  const boatY = useTransform(p, [0, 1], [0, -46]);
  const sway = useTransform(p, [0, 0.5, 1], [-2.8, 2.8, -2.8]);
  const bob = useTransform(p, [0, 0.5, 1], [0, -10, 0]);

  const lotusY1 = useTransform(p, [0, 1], [0, 26]);
  const lotusY2 = useTransform(p, [0, 1], [0, 38]);

  // Reveal the whole river scene smoothly after some scrolling.
  const reveal = useTransform(p, [0, 0.22, 0.4, 1], [0, 0, 1, 1]);
  const lift = useTransform(p, [0, 0.22, 0.4, 1], [180, 180, 0, 0]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0"
      aria-hidden
      data-no-save
      style={{ WebkitTouchCallout: "none" }}
    >
      <motion.div
        className="relative h-[300px] sm:h-[380px]"
        style={{ opacity: reveal, y: lift }}
      >
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#1a5c3a]/10 via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-[82%] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 40%, rgba(26,92,58,0.12), transparent 55%), radial-gradient(circle at 80% 60%, rgba(114,47,55,0.09), transparent 55%), repeating-linear-gradient(0deg, rgba(0,0,0,0.02), rgba(0,0,0,0.02) 2px, transparent 2px, transparent 10px)",
            }}
          />

          {/* Back wave layer */}
          <motion.div
            className="absolute inset-x-[-20%] bottom-[18%] h-20 opacity-[0.35]"
            animate={{ x: [0, -120, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage:
                "radial-gradient(60px 18px at 30px 40px, rgba(26,92,58,0.18), transparent 65%), radial-gradient(70px 22px at 110px 30px, rgba(114,47,55,0.12), transparent 70%), radial-gradient(64px 20px at 200px 45px, rgba(26,92,58,0.16), transparent 70%)",
              backgroundSize: "240px 80px",
            }}
          />

          <motion.div
            className="absolute bottom-[-28px] left-[-16px] h-[220px] w-[320px] sm:h-[260px] sm:w-[380px]"
            style={{ y: lotusY1 }}
          >
            <Image
              src="/pichwai/front page/Lotus.png"
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 320px, 380px"
              className="select-none object-contain object-left-bottom opacity-[0.95]"
              draggable={false}
              priority={false}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-[-36px] right-[-18px] h-[230px] w-[340px] sm:h-[280px] sm:w-[420px]"
            style={{ y: lotusY2 }}
          >
            <Image
              src="/pichwai/front page/Lotus.png"
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 340px, 420px"
              className="select-none object-contain object-right-bottom opacity-[0.95]"
              draggable={false}
              priority={false}
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-[-28%] h-[460px] w-[700px] -translate-x-1/2 sm:top-[-30%] sm:h-[620px] sm:w-[920px]"
            style={{ x: driftX, y: boatY, rotate: sway }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div className="relative h-full w-full" style={{ y: bob }}>
              <Image
                src="/pichwai/front page/boat krishna.png"
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 768px) 96vw, 1100px"
                className="select-none object-contain object-center drop-shadow-[0_22px_46px_rgba(114,47,55,0.26)]"
                draggable={false}
                priority={false}
              />
            </motion.div>
          </motion.div>

          {/* Front wave layer (covers lower boat edge) */}
          <motion.div
            className="absolute inset-x-[-25%] bottom-[10%] h-14 opacity-[0.24]"
            animate={{ x: [0, 160, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage:
                "radial-gradient(80px 24px at 40px 44px, rgba(255,255,255,0.28), transparent 70%), radial-gradient(90px 28px at 150px 38px, rgba(255,255,255,0.18), transparent 72%), radial-gradient(70px 22px at 260px 48px, rgba(255,255,255,0.22), transparent 70%)",
              backgroundSize: "300px 96px",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#1a5c3a]/8 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

