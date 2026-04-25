"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";

const services = [
  {
    id: "product-design",
    title: "Product Design",
    description:
      "Interfaces that don't just look good — they convert, retain, and delight.",
    shape: "cube",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description:
      "Visual systems that tell your story before a single word is read.",
    shape: "glyph",
  },
  {
    id: "web-experiences",
    title: "Web Experiences",
    description:
      "Websites that feel like products. Performance, accessibility, and wow factor — all included.",
    shape: "cursor",
  },
];

const primaryEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: primaryEase,
    },
  },
};

function WireframeCube() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32" style={{ perspective: "400px" }}>
      <div
        className="w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          animation: "spin-cube 20s linear infinite",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 border border-[#0A0A0A]/15"
          style={{ transform: "translateZ(48px)" }}
        />
        {/* Back */}
        <div
          className="absolute inset-0 border border-[#0A0A0A]/15"
          style={{ transform: "translateZ(-48px) rotateY(180deg)" }}
        />
        {/* Left */}
        <div
          className="absolute inset-0 border border-[#0A0A0A]/15"
          style={{ transform: "translateX(-48px) rotateY(-90deg)" }}
        />
        {/* Right */}
        <div
          className="absolute inset-0 border border-[#0A0A0A]/15"
          style={{ transform: "translateX(48px) rotateY(90deg)" }}
        />
        {/* Top */}
        <div
          className="absolute inset-0 border border-[#0A0A0A]/15"
          style={{ transform: "translateY(-48px) rotateX(90deg)" }}
        />
        {/* Bottom */}
        <div
          className="absolute inset-0 border border-[#0A0A0A]/15"
          style={{ transform: "translateY(48px) rotateX(-90deg)" }}
        />
      </div>
    </div>
  );
}

function GlyphB() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
      <span
        className="font-[family-name:var(--font-bebas-neue)] text-[clamp(4rem,10vw,8rem)] leading-none text-[#0A0A0A]/15 select-none"
        style={{ animation: "spin-slow 20s linear infinite" }}
      >
        B
      </span>
    </div>
  );
}

function CursorArrow() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#0A0A0A]/15"
        style={{ animation: "spin-slow 20s linear infinite" }}
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      </svg>
    </div>
  );
}

function ServiceShape({ shape }: { shape: string }) {
  switch (shape) {
    case "cube":
      return <WireframeCube />;
    case "glyph":
      return <GlyphB />;
    case "cursor":
      return <CursorArrow />;
    default:
      return null;
  }
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[#E8E4DE]"
    >
      {/* Service Blocks */}
      <div className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate={isInView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
            className="max-w-[1400px] mx-auto"
          >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
              animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "visible"}
              className="group relative flex flex-col md:flex-row md:items-center md:justify-between py-8 md:py-14 first:pt-0 last:pb-0"
            >
              {/* Text Content ~70% */}
              <div className="md:w-[70%] md:pr-12">
                {/* Title with hover shift */}
                <div className="relative inline-block">
                  <h3 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(3rem,8vw,8rem)] leading-[1.0] text-[#0A0A0A] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-4">
                    {service.title}
                  </h3>
                  {/* Horizontal line under title */}
                  <div className="mt-2 h-[2px] bg-[#0A0A0A] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
                </div>

                {/* Description */}
                <p className="font-[family-name:var(--font-sora)] text-[clamp(1rem,1.5vw,1.25rem)] text-[#0A0A0A]/70 max-w-[50ch] mt-6 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Shape ~30% */}
              <div className="hidden md:flex md:w-[30%] md:justify-end md:items-center mt-8 md:mt-0">
                <ServiceShape shape={service.shape} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Block */}
      <div className="bg-[#0A0A0A] py-16 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
          <p className="font-[family-name:var(--font-sora)] text-[clamp(1.5rem,3vw,2.5rem)] text-text-primary-light leading-snug max-w-[35ch]">
            Got a project that scares other designers? That&apos;s my sweet spot.
          </p>

          <a
            href="mailto:youseefkhald@gmail.com"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-3 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          >
            <span className="font-[family-name:var(--font-sora)] text-sm text-text-primary-light">
              Start a Conversation
            </span>
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowRight
                className="w-4 h-4 text-text-primary-light"
                weight="bold"
              />
            </span>
          </a>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes spin-cube {
          from {
            transform: rotateX(-20deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-20deg) rotateY(360deg);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation: spin-cube"],
          [style*="animation: spin-slow"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
