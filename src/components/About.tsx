"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import EyebrowBadge from "./EyebrowBadge";

const manifesto =
  "Lawyer turned designer. I don't do safe. I take brands apart and rebuild them into experiences that demand attention. From product interfaces to full brand systems — Google UX certified, CalArts trained, and built on chaos.";

const clients = [
  "Google UX",
  "CalArts",
  "Notion Academy",
  "The Math Mentor",
  "Outline",
  "Teacher Flow",
];

function AnimatedWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="font-body font-medium leading-[1.3] text-text-primary-dark"
      style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
    >
      {words.map((word, index) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
        const isHighlighted = cleanWord === "safe" || cleanWord === "attention";

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.6,
              delay: index * 0.03,
              ease: [0.32, 0.72, 0, 1],
            }}
            className={`inline-block mr-[0.3em] ${isHighlighted ? "text-accent font-bold" : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="grain-overlay bg-bg-secondary py-32 md:py-40 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Left: Text Content */}
          <div className="w-full md:w-[60%]">
            <div className="mb-8 md:mb-12">
              <EyebrowBadge variant="light">ABOUT</EyebrowBadge>
            </div>
            <AnimatedWords text={manifesto} />
          </div>

          {/* Right: Floating Geometric Shape */}
          <div className="hidden md:flex w-[40%] self-stretch items-start justify-center">
            <div className="sticky top-32">
              <div
                className="relative w-28 h-28"
                style={{ perspective: "600px" }}
              >
                <div
                  className="absolute inset-0 animate-[rotate_20s_linear_infinite]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute inset-0 border border-text-primary-dark/10"
                    style={{ transform: "translateZ(56px)" }}
                  />
                  <div
                    className="absolute inset-0 border border-text-primary-dark/10"
                    style={{ transform: "rotateY(180deg) translateZ(56px)" }}
                  />
                  <div
                    className="absolute inset-0 border border-text-primary-dark/10"
                    style={{ transform: "rotateY(90deg) translateZ(56px)" }}
                  />
                  <div
                    className="absolute inset-0 border border-text-primary-dark/10"
                    style={{ transform: "rotateY(-90deg) translateZ(56px)" }}
                  />
                  <div
                    className="absolute inset-0 border border-text-primary-dark/10"
                    style={{ transform: "rotateX(90deg) translateZ(56px)" }}
                  />
                  <div
                    className="absolute inset-0 border border-text-primary-dark/10"
                    style={{ transform: "rotateX(-90deg) translateZ(56px)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Ticker */}
        <div className="mt-16 md:mt-24 overflow-hidden">
          <div className="flex whitespace-nowrap animate-[ticker-scroll_30s_linear_infinite]">
            {[...clients, ...clients].map((client, i) => (
              <span
                key={i}
                className="mx-6 md:mx-8 font-mono text-xs uppercase tracking-[0.2em] text-text-primary-dark/30"
              >
                {client} •
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
