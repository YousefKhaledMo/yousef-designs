"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUp,
  LinkedinLogo,
  DribbbleLogo,
  BehanceLogo,
  GithubLogo,
} from "@phosphor-icons/react";

const primaryEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-[#0A0A0A] scanlines"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] py-24 px-4 md:px-8 lg:px-16"
      >
        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          className="font-[family-name:var(--font-bebas-neue)] text-[clamp(3rem,8vw,8rem)] leading-[1.05] text-[#F5F2ED] text-center max-w-[15ch] mx-auto"
        >
          Let&apos;s make something that breaks the internet.
        </motion.h2>

        {/* Name */}
        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2rem,5vw,4rem)] text-[#F5F2ED]/80 text-center mt-8"
        >
          Yousef Designs
        </motion.p>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 mt-12"
        >
          <a
            href="mailto:youseefkhald@gmail.com"
            className="font-[family-name:var(--font-jetbrains-mono)] text-lg text-[#F5F2ED] no-underline transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#FF4D2E]"
          >
            youseefkhald@gmail.com
          </a>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#F5F2ED]/50">
            Cairo, Egypt
          </span>
          <a
            href="https://www.framer.com/yousefkhaled"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#F5F2ED]/50 no-underline transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#FF4D2E]"
          >
            framer.com/yousefkhaled
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-8 mt-12"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase text-[#F5F2ED]/60 no-underline transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:text-[#FF4D2E]"
              >
                <Icon className="w-5 h-5" weight="regular" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </motion.div>

        {/* Back to Top */}
        <motion.button
          variants={itemVariants}
          onClick={scrollToTop}
          className="mt-16 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 cursor-pointer animate-pulse"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-[#F5F2ED]" weight="bold" />
        </motion.button>

        {/* Copyright */}
        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#F5F2ED]/40 text-center mt-16"
        >
          &copy; 2026 Yousef Khaled. Built with chaos and caffeine. Cairo, Egypt.
        </motion.p>
      </motion.div>
    </footer>
  );
}
