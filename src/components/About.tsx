"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";
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

// Spring presets
const springs = {
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
};

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
                : { opacity: 0, y: 30, rotateX: -45 }
            }
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : prefersReducedMotion
                  ? { opacity: 1, y: 0, rotateX: 0 }
                  : { opacity: 0, y: 30, rotateX: -45 }
            }
            transition={{
              ...springs.bouncy,
              delay: index * 0.04,
            }}
            className={`inline-block mr-[0.3em] ${isHighlighted ? "text-accent font-bold" : ""}`}
            style={{ perspective: "500px" }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-driven parallax for geometric shape
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const shapeY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const shapeRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const shapeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="grain-overlay bg-bg-secondary py-32 md:py-40 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Left: Text Content */}
          <motion.div
            className="w-full md:w-[60%]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...springs.bouncy, duration: 1 }}
          >
            <div className="mb-8 md:mb-12">
              <EyebrowBadge variant="light">ABOUT</EyebrowBadge>
            </div>
            <AnimatedWords text={manifesto} />
          </motion.div>

          {/* Right: Floating Geometric Shape with parallax */}
          <div className="hidden md:flex w-[40%] self-stretch items-start justify-center">
            <div className="sticky top-32">
              <motion.div
                className="relative w-28 h-28"
                style={{ 
                  perspective: "800px",
                  y: shapeY,
                  rotateY: shapeRotate,
                  scale: shapeScale,
                }}
                animate={prefersReducedMotion ? {} : {
                  rotateX: [0, 5, -5, 0],
                  rotateZ: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* 3D Cube wireframe */}
                <div
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <motion.div
                    className="absolute inset-0 border-2 border-text-primary-dark/20"
                    style={{ transform: "translateZ(56px)" }}
                    whileHover={prefersReducedMotion ? {} : {
                      borderColor: "rgba(255, 77, 46, 0.5)",
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    }}
                  />
                  {/* Back */}
                  <div
                    className="absolute inset-0 border-2 border-text-primary-dark/20"
                    style={{ transform: "rotateY(180deg) translateZ(56px)" }}
                  />
                  {/* Left */}
                  <div
                    className="absolute inset-0 border-2 border-text-primary-dark/20"
                    style={{ transform: "rotateY(-90deg) translateZ(56px)" }}
                  />
                  {/* Right */}
                  <div
                    className="absolute inset-0 border-2 border-text-primary-dark/20"
                    style={{ transform: "rotateY(90deg) translateZ(56px)" }}
                  />
                  {/* Top */}
                  <div
                    className="absolute inset-0 border-2 border-text-primary-dark/20"
                    style={{ transform: "rotateX(90deg) translateZ(56px)" }}
                  />
                  {/* Bottom */}
                  <div
                    className="absolute inset-0 border-2 border-text-primary-dark/20"
                    style={{ transform: "rotateX(-90deg) translateZ(56px)" }}
                  />
                  
                  {/* Accent glow */}
                  <motion.div
                    className="absolute inset-0 bg-accent/5 rounded-sm"
                    style={{ transform: "translateZ(56px)" }}
                    animate={prefersReducedMotion ? {} : {
                      opacity: [0.05, 0.15, 0.05],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                
                {/* Floating particles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={prefersReducedMotion ? {} : {
                      y: [-10, 10, -10],
                      opacity: [0.4, 0.8, 0.4],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Client Ticker */}
        <motion.div 
          className="mt-16 md:mt-24 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.bouncy, delay: 0.2 }}
        >
          <div className="flex whitespace-nowrap">
            <motion.div
              className="flex"
              animate={prefersReducedMotion ? {} : {
                x: [0, "-50%"],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...clients, ...clients].map((client, i) => (
                <motion.span
                  key={i}
                  className="mx-6 md:mx-8 font-mono text-xs uppercase tracking-[0.2em] text-text-primary-dark/30"
                  whileHover={prefersReducedMotion ? {} : {
                    color: "rgba(10,10,10,0.6)",
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                >
                  {client} •
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
