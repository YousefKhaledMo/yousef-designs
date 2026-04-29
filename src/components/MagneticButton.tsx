"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

interface MagneticButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  icon?: boolean;
  iconPosition?: "left" | "right";
}

export default function MagneticButton({
  href = "#",
  children,
  className = "",
  variant = "primary",
  icon = true,
  iconPosition = "right",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  
  const magnetStrength = 0.4;
  const contentStrength = 0.6;

  useEffect(() => {
    if (prefersReducedMotion || !buttonRef.current) return;

    const button = buttonRef.current;
    const content = contentRef.current;
    if (!content) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let buttonX = 0;
    let buttonY = 0;
    let contentX = 0;
    let contentY = 0;

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
      // Spring-like magnetic movement for button
      buttonX = lerp(buttonX, mouseX * magnetStrength, 0.15);
      buttonY = lerp(buttonY, mouseY * magnetStrength, 0.15);
      
      // Content moves slightly less, creating depth
      contentX = lerp(contentX, mouseX * contentStrength, 0.12);
      contentY = lerp(contentY, mouseY * contentStrength, 0.12);

      button.style.transform = `translate(${buttonX}px, ${buttonY}px)`;
      content.style.transform = `translate(${contentX * 0.3}px, ${contentY * 0.3}px)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  const baseStyles = `
    group relative inline-flex items-center gap-3 
    rounded-full transition-all duration-300 ease-[var(--ease-primary)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent 
    focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
  `;

  const variantStyles = {
    primary: "bg-white/5 border border-border-light hover:bg-white/10 hover:border-white/20",
    secondary: "bg-accent/10 border border-accent/30 hover:bg-accent/20 hover:border-accent/50",
  };

  const content = (
    <>
      <span className="font-body text-sm text-text-primary-light relative z-10">
        {children}
      </span>
      {icon && (
        <span 
          ref={contentRef}
          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 transition-transform duration-300 ease-[var(--ease-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <ArrowRight
            className="w-4 h-4 text-text-primary-light"
            weight="bold"
          />
        </span>
      )}
    </>
  );

  if (href.startsWith("#")) {
    return (
      <motion.div
        ref={buttonRef}
        className={`${baseStyles} ${variantStyles[variant]} ${className} cursor-pointer`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <a href={href} className="flex items-center gap-3">
          {iconPosition === "left" && icon && (
            <span className="order-1">
              <span 
                ref={contentRef}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10"
              >
                <ArrowRight
                  className="w-4 h-4 text-text-primary-light"
                  weight="bold"
                />
              </span>
            </span>
          )}
          {children}
          {iconPosition === "right" && (
            <span className="order-2">
              <span 
                ref={contentRef}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10"
              >
                <ArrowRight
                  className="w-4 h-4 text-text-primary-light"
                  weight="bold"
                />
              </span>
            </span>
          )}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.a
      ref={buttonRef as unknown as React.RefObject<HTMLAnchorElement>}
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {content}
    </motion.a>
  );
}
