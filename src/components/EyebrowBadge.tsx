"use client";

import { motion, useReducedMotion } from "framer-motion";

interface EyebrowBadgeProps {
  children: React.ReactNode;
  variant?: "dark" | "light" | "accent";
  animate?: boolean;
}

const variantStyles = {
  dark: "bg-bg-primary text-text-primary-light border border-border-light",
  light: "bg-bg-secondary text-text-primary-dark border border-border-dark",
  accent: "bg-accent text-bg-primary",
};

export default function EyebrowBadge({
  children,
  variant = "dark",
  animate = true,
}: EyebrowBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[0.625rem] uppercase tracking-[0.2em] font-mono ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );

  if (!animate || prefersReducedMotion) {
    return content;
  }

  return (
    <motion.span
      initial={{ opacity: 0, x: -20, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
    >
      {content}
    </motion.span>
  );
}
