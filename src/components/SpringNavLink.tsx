"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SpringNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SpringNavLink({ href, children, onClick }: SpringNavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !linkRef.current) return;

    const link = linkRef.current;
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let offsetX = 0;
    let offsetY = 0;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = link.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = e.clientX - centerX;
      mouseY = e.clientY - centerY;
    };

    const animate = () => {
      // Subtle magnetic movement
      offsetX = lerp(offsetX, mouseX * 0.2, 0.1);
      offsetY = lerp(offsetY, mouseY * 0.15, 0.1);

      link.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    link.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      link.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.a
      ref={linkRef}
      href={href}
      onClick={handleClick}
      className="font-body text-xs uppercase tracking-[0.1em] text-text-primary-light/80 hover:text-text-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm"
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.a>
  );
}
