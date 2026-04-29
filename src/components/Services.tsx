"use client";

import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

// Spring presets
const springs = {
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
};

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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.bouncy,
  },
};

function WireframeCube() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32" style={{ perspective: "400px" }}>
      <motion.div
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={prefersReducedMotion ? {} : {
          rotateX: [-20, 10, -20],
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 border border-[text-primary-dark]/15"
          style={{ transform: "translateZ(48px)" }}
          whileHover={prefersReducedMotion ? {} : {
            borderColor: "rgba(255, 77, 46, 0.3)",
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 20 },
          }}
        />
        {/* Back */}
        <div
          className="absolute inset-0 border border-[text-primary-dark]/15"
          style={{ transform: "translateZ(-48px) rotateY(180deg)" }}
        />
        {/* Left */}
        <div
          className="absolute inset-0 border border-[text-primary-dark]/15"
          style={{ transform: "translateX(-48px) rotateY(-90deg)" }}
        />
        {/* Right */}
        <div
          className="absolute inset-0 border border-[text-primary-dark]/15"
          style={{ transform: "translateX(48px) rotateY(90deg)" }}
        />
        {/* Top */}
        <div
          className="absolute inset-0 border border-[text-primary-dark]/15"
          style={{ transform: "translateY(-48px) rotateX(90deg)" }}
        />
        {/* Bottom */}
        <div
          className="absolute inset-0 border border-[text-primary-dark]/15"
          style={{ transform: "translateY(48px) rotateX(-90deg)" }}
        />
      </motion.div>
    </div>
  );
}

function GlyphB() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div 
      className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
      animate={prefersReducedMotion ? {} : {
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span
        className="font-[family-name:var(--font-bebas-neue)] text-[clamp(4rem,10vw,8rem)] leading-none text-[text-primary-dark]/15 select-none"
      >
        B
      </span>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-accent/10 rounded-full blur-xl"
        animate={prefersReducedMotion ? {} : {
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

function CursorArrow() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div 
      className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
      animate={prefersReducedMotion ? {} : {
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[text-primary-dark]/15"
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      </svg>
      {/* Trail effect */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: 0.1 * (3 - i),
          }}
          animate={prefersReducedMotion ? {} : {
            rotate: [i * 30, 360 + i * 30],
          }}
          transition={{
            duration: 3 - i * 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-[text-primary-dark]/10"
          >
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
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

// Magnetic CTA Button
function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (prefersReducedMotion || !buttonRef.current) return;

    const button = buttonRef.current;
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let buttonX = 0;
    let buttonY = 0;

    const lerp = (start: number, end: number, factor: number) => 
      start + (end - start) * factor;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = e.clientX - centerX;
      mouseY = e.clientY - centerY;
    };

    const animate = () => {
      buttonX = lerp(buttonX, mouseX * 0.3, 0.15);
      buttonY = lerp(buttonY, mouseY * 0.3, 0.15);

      button.style.transform = `translate(${buttonX}px, ${buttonY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-3"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.08,
        y: -3,
      }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <span className="font-[family-name:var(--font-sora)] text-sm text-text-primary-light">
        {children}
      </span>
      <motion.span 
        className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white/10"
        animate={isHovered && !prefersReducedMotion ? {
          x: 2,
          y: -2,
        } : {}}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      >
        <ArrowRight
          className="w-4 h-4 text-text-primary-light"
          weight="bold"
        />
      </motion.span>
    </motion.a>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[bg-bg-tertiary]"
    >
      {/* Service Blocks */}
      <div className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
          className="max-w-[1400px] mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "hidden"}
              animate={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "visible"}
              className="group relative flex flex-col md:flex-row md:items-center md:justify-between py-8 md:py-14 first:pt-0 last:pb-0"
            >
              {/* Text Content ~70% */}
              <div className="md:w-[70%] md:pr-12">
                {/* Title with magnetic shift effect */}
                <div className="relative inline-block overflow-visible">
                  <motion.h3
                    className="font-[family-name:var(--font-bebas-neue)] text-[clamp(3rem,8vw,8rem)] leading-[1.0] text-[text-primary-dark]"
                    whileHover={prefersReducedMotion ? {} : {
                      x: 12,
                      transition: { type: "spring", stiffness: 400, damping: 20 },
                    }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  {/* Magnetic line underline */}
                  <motion.div
                    className="mt-2 h-[2px] bg-[text-primary-dark] origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...springs.bouncy, delay: 0.2 }}
                    whileHover={prefersReducedMotion ? {} : {
                      scaleX: 1.1,
                      backgroundColor: "var(--color-accent)",
                      transition: { type: "spring", stiffness: 400, damping: 20 },
                    }}
                  />
                </div>

                {/* Description */}
                <motion.p
                  className="font-[family-name:var(--font-sora)] text-[clamp(1rem,1.5vw,1.25rem)] text-[text-primary-dark]/70 max-w-[50ch] mt-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springs.gentle, delay: 0.3 }}
                >
                  {service.description}
                </motion.p>
              </div>

              {/* Shape ~30% */}
              <motion.div
                className="hidden md:flex md:w-[30%] md:justify-end md:items-center mt-8 md:mt-0"
                whileHover={prefersReducedMotion ? {} : {
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <ServiceShape shape={service.shape} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Block */}
      <motion.div
        className="bg-[text-primary-dark] py-16 px-4 md:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...springs.bouncy, delay: 0.2 }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
          <motion.p
            className="font-[family-name:var(--font-sora)] text-[clamp(1.5rem,3vw,2.5rem)] text-text-primary-light leading-snug max-w-[35ch]"
            whileHover={prefersReducedMotion ? {} : {
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
          >
            Got a project that scares other designers? That&apos;s my sweet spot.
          </motion.p>

          <MagneticCTA href="mailto:youseefkhald@gmail.com">
            Start a Conversation
          </MagneticCTA>
        </div>
      </motion.div>
    </section>
  );
}
