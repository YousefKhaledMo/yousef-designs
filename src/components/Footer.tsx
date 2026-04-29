"use client";

import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowUp,
  LinkedinLogo,
  DribbbleLogo,
  BehanceLogo,
  GithubLogo,
} from "@phosphor-icons/react";

// Spring presets
const springs = {
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.bouncy,
  },
};

const socialLinks = [
  {
    name: "LinkedIn",
    url: "#",
    icon: LinkedinLogo,
  },
  {
    name: "Dribbble",
    url: "#",
    icon: DribbbleLogo,
  },
  {
    name: "Behance",
    url: "#",
    icon: BehanceLogo,
  },
  {
    name: "GitHub",
    url: "#",
    icon: GithubLogo,
  },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-bg-primary scanlines"
    >
      <motion.div
        variants={containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={isInView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] py-24 px-4 md:px-8 lg:px-16"
      >
        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "visible"}
          className="font-display text-[clamp(3rem,8vw,8rem)] leading-[1.05] text-text-primary-light text-center max-w-[15ch] mx-auto"
          whileHover={prefersReducedMotion ? {} : {
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          Let&apos;s make something that breaks the internet.
        </motion.h2>

        {/* Name */}
        <motion.p
          variants={itemVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "visible"}
          className="font-display text-[clamp(2rem,5vw,4rem)] text-text-primary-light/80 text-center mt-8"
          whileHover={prefersReducedMotion ? {} : {
            y: -5,
            color: "#FF4D2E",
            transition: { type: "spring", stiffness: 400, damping: 20 },
          }}
        >
          Yousef Designs
        </motion.p>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "visible"}
          className="flex flex-col items-center gap-2 mt-12"
        >
          <motion.a
            href="mailto:youseefkhald@gmail.com"
            className="font-mono text-lg text-text-primary-light no-underline"
            whileHover={prefersReducedMotion ? {} : {
              y: -3,
              color: "#FF4D2E",
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }}
          >
            youseefkhald@gmail.com
          </motion.a>
          <motion.span 
            className="font-mono text-sm text-text-primary-light/60"
            animate={prefersReducedMotion ? {} : {
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Cairo, Egypt
          </motion.span>
          <motion.a
            href="https://www.framer.com/yousefkhaled"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-text-primary-light/60 no-underline"
            whileHover={prefersReducedMotion ? {} : {
              y: -3,
              color: "#FF4D2E",
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }}
          >
            framer.com/yousefkhaled
          </motion.a>
        </motion.div>

        {/* Social Links with spring hover */}
        <motion.div
          variants={itemVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "visible"}
          className="flex items-center gap-8 mt-12"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1 font-mono text-xs uppercase text-text-primary-light/60 no-underline p-1"
                onHoverStart={() => setIsHovered(link.name)}
                onHoverEnd={() => setIsHovered(null)}
                whileHover={prefersReducedMotion ? {} : {
                  y: -8,
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                whileTap={prefersReducedMotion ? {} : {
                  scale: 0.9,
                  transition: { type: "spring", stiffness: 600, damping: 20 },
                }}
              >
                <motion.div
                  animate={isHovered === link.name && !prefersReducedMotion ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isHovered === link.name ? "text-accent" : ""
                    }`} 
                    weight="regular" 
                  />
                </motion.div>
                <span className={`transition-colors duration-300 ${
                  isHovered === link.name ? "text-accent" : ""
                }`}>
                  {link.name}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Back to Top with spring physics */}
        <motion.button
          variants={itemVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "visible"}
          onClick={scrollToTop}
          className="mt-16 w-12 h-12 rounded-full border border-border-light bg-white/5 flex items-center justify-center cursor-pointer"
          whileHover={prefersReducedMotion ? {} : {
            scale: 1.15,
            y: -5,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderColor: "rgba(255, 77, 46, 0.5)",
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
          whileTap={prefersReducedMotion ? {} : {
            scale: 0.9,
            transition: { type: "spring", stiffness: 600, damping: 20 },
          }}
          aria-label="Back to top"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : {
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowUp className="w-5 h-5 text-text-primary-light" weight="bold" />
          </motion.div>
        </motion.button>

        {/* Copyright with animated text */}
        <motion.p
          variants={itemVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "visible"}
          className="font-mono text-xs text-text-primary-light/60 text-center mt-16"
        >
          &copy; 2026{" "}
          <motion.span
            className="inline-block"
            animate={prefersReducedMotion ? {} : {
              color: ["rgba(245,242,237,0.6)", "rgba(255,77,46,0.8)", "rgba(245,242,237,0.6)"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Yousef Khaled
          </motion.span>
          . Built with chaos and caffeine. Cairo, Egypt.
        </motion.p>
      </motion.div>
      
      {/* Decorative gradient orb */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,77,46,0.08) 0%, transparent 70%)",
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </footer>
  );
}
