"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { useRef, useEffect } from "react";

const letters = [
  { char: "Y", offset: "-translate-y-[10px] -rotate-2" },
  { char: "o", offset: "translate-y-[5px] rotate-1", hasDot: true },
  { char: "u", offset: "-translate-y-[5px] -rotate-1" },
  { char: "s", offset: "translate-y-[8px] rotate-2" },
  { char: "e", offset: "-translate-y-[3px] -rotate-1" },
  { char: "f", offset: "translate-y-[6px] rotate-1" },
];

const primaryEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    y: 30,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.2,
      ease: primaryEase,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: primaryEase,
    },
  }),
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);
  const orbCRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    const lerp = 0.05;
    const spotlightLerp = 0.12;

    const animate = () => {
      mouseX.current += (targetX.current - mouseX.current) * lerp;
      mouseY.current += (targetY.current - mouseY.current) * lerp;

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const relX = mouseX.current / winW;
      const relY = mouseY.current / winH;

      if (gridRef.current) {
        gridRef.current.style.backgroundPosition = `${(relX - 0.5) * 30 + 30}px ${(relY - 0.5) * 30 + 30}px`;
      }

      if (orbARef.current) {
        orbARef.current.style.transform = `translate(${(relX - 0.5) * 60}px, ${(relY - 0.5) * 60}px)`;
        orbARef.current.style.opacity = "0.35";
      }
      if (orbBRef.current) {
        orbBRef.current.style.transform = `translate(${(0.5 - relX) * 80}px, ${(0.5 - relY) * 80}px)`;
        orbBRef.current.style.opacity = "0.3";
      }
      if (orbCRef.current) {
        orbCRef.current.style.transform = `translate(${(relX - 0.5) * 40}px, ${(relY - 0.5) * 40}px)`;
        orbCRef.current.style.opacity = "0.25";
      }
      if (spotlightRef.current) {
        const sx = mouseX.current + (targetX.current - mouseX.current) * spotlightLerp;
        const sy = mouseY.current + (targetY.current - mouseY.current) * spotlightLerp;
        spotlightRef.current.style.opacity = "0.4";
        spotlightRef.current.style.background = `radial-gradient(400px circle at ${sx}px ${sy}px, rgba(245,242,237,0.06), transparent 55%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center bg-bg-primary px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Animated background orbs + grid */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={gridRef}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,242,237,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,237,0.055) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "30px 30px",
            willChange: "background-position",
            transition: "opacity 0.3s ease",
          }}
        />
        <div
          ref={spotlightRef}
          className="absolute inset-0"
          style={{
            opacity: 0,
            willChange: "background, opacity",
            transition: "opacity 0.4s ease",
          }}
        />
        <div
          ref={orbARef}
          className="absolute w-[600px] h-[600px] rounded-full -top-40 -left-40 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(255,77,46,0.15) 0%, transparent 70%)",
            willChange: "transform, opacity",
            transition: "opacity 0.3s ease",
          }}
        />
        <div
          ref={orbBRef}
          className="absolute w-[500px] h-[500px] rounded-full -bottom-32 -right-32 blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(245,242,237,0.08) 0%, transparent 70%)",
            willChange: "transform, opacity",
            transition: "opacity 0.3s ease",
          }}
        />
        <div
          ref={orbCRef}
          className="absolute w-[350px] h-[350px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[80px]"
          style={{
            background: "radial-gradient(circle, rgba(255,77,46,0.1) 0%, transparent 70%)",
            willChange: "transform, opacity",
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Fractured "Yousef" */}
        <motion.h1
          className="font-display text-[clamp(6rem,15vw,18rem)] leading-[0.85] text-text-primary-light tracking-tight flex"
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          aria-label="Yousef"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              initial={prefersReducedMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : "hidden"}
              animate={prefersReducedMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : "visible"}
              className={`relative inline-block ${letter.offset} transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-1 hover:-translate-y-1 cursor-default select-none`}
              style={{ willChange: "transform, opacity, filter" }}
            >
              {letter.char}
              {letter.hasDot && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                </span>
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* "Designs" */}
        <motion.p
          className="font-display text-[clamp(2rem,5vw,4rem)] text-text-primary-light/60 tracking-widest mt-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-text-primary-light hover:[text-shadow:0_0_24px_rgba(245,242,237,0.15)]"
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "visible"}
          custom={0.6}
        >
          Designs
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="font-body text-[clamp(1rem,1.5vw,1.25rem)] text-text-primary-light/70 max-w-[40ch] mt-6 leading-relaxed transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-text-primary-light hover:[text-shadow:0_0_24px_rgba(245,242,237,0.15)]"
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "visible"}
          custom={0.9}
        >
          I break conventions to build digital experiences that people remember.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#work"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white/5 border border-border-light px-6 py-3 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105"
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "visible"}
          custom={1.0}
        >
          <span className="font-body text-sm text-text-primary-light">
            Explore Work
          </span>
          <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowRight
              className="w-4 h-4 text-text-primary-light"
              weight="bold"
            />
          </span>
        </motion.a>
      </div>

      {/* Pulsing dot keyframes */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        .animate-pulse-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-dot {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
