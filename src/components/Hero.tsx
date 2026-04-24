"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

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
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center bg-[#0A0A0A] grid-overlay px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Fractured "Yousef" */}
        <motion.h1
          className="font-[family-name:var(--font-bebas-neue)] text-[clamp(6rem,15vw,18rem)] leading-[0.85] text-[#F5F2ED] tracking-tight flex"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label="Yousef"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={`relative inline-block ${letter.offset} transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-1 hover:-translate-y-1 cursor-default select-none`}
              style={{ willChange: "transform, opacity, filter" }}
            >
              {letter.char}
              {letter.hasDot && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D2E] animate-pulse-dot" />
                </span>
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* "Designs" */}
        <motion.p
          className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2rem,5vw,4rem)] text-[#F5F2ED]/60 tracking-widest mt-2"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          Designs
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="font-[family-name:var(--font-sora)] text-[clamp(1rem,1.5vw,1.25rem)] text-[#F5F2ED]/70 max-w-[40ch] mt-6 leading-relaxed"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.9}
        >
          I break conventions to build digital experiences that people remember.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#work"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-3 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1.0}
        >
          <span className="font-[family-name:var(--font-sora)] text-sm text-[#F5F2ED]">
            Explore Work
          </span>
          <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowRight
              className="w-4 h-4 text-[#F5F2ED]"
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
