"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";

// Spring physics presets
const springPresets = {
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
  dramatic: { type: "spring" as const, stiffness: 80, damping: 18 },
};

interface EnhancedAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  springPreset?: keyof typeof springPresets;
  distance?: number;
  threshold?: number;
  once?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const directionOffsets = {
  up: { x: 0, y: 80 },
  down: { x: 0, y: -80 },
  left: { x: 80, y: 0 },
  right: { x: -80, y: 0 },
  scale: { x: 0, y: 0, scale: 0.8 },
  fade: { x: 0, y: 0, scale: 1 },
};

export default function EnhancedAnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  springPreset = "snappy",
  distance,
  threshold = 0.1,
  once = true,
  stagger = false,
  staggerDelay = 0.08,
}: EnhancedAnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const offset = distance 
    ? { x: direction.includes("left") ? distance : direction.includes("right") ? -distance : 0,
        y: direction.includes("up") ? distance : direction.includes("down") ? -distance : 0 }
    : directionOffsets[direction];

  const spring = springPresets[springPreset];

  const initialState = prefersReducedMotion
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : direction === "scale" || direction === "fade"
      ? { opacity: 0, scale: 0.8 }
      : { opacity: 0, x: offset.x, y: offset.y };

  const animateState = prefersReducedMotion
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      ref={ref}
      initial={initialState}
      animate={hasAnimated || isInView ? animateState : initialState}
      transition={{
        ...spring,
        delay: prefersReducedMotion ? 0 : delay,
      }}
      className={className}
      style={{
        willChange: prefersReducedMotion ? "auto" : "transform, opacity",
      }}
    >
      {stagger ? (
        <StaggeredChildren delay={staggerDelay} prefersReducedMotion={prefersReducedMotion}>
          {children}
        </StaggeredChildren>
      ) : (
        children
      )}
    </motion.div>
  );
}

// Helper component for staggered children
function StaggeredChildren({
  children,
  delay,
  prefersReducedMotion,
}: {
  children: React.ReactNode;
  delay: number;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : delay,
          },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                },
              },
            }}
          >
            {children}
          </motion.div>}
    </motion.div>
  );
}

// Scroll-driven parallax hook/component
interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0-1, higher = slower (more parallax)
  direction?: "vertical" | "horizontal" | "both";
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.5,
  direction = "vertical",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      const yOffset = scrollY * speed * 0.3;
      const xOffset = scrollX * speed * 0.3;

      setOffset({
        x: direction.includes("horizontal") || direction === "both" ? xOffset : 0,
        y: direction.includes("vertical") || direction === "both" ? yOffset : 0,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion, speed, direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        willChange: "transform",
        transition: prefersReducedMotion ? "none" : "transform 0.1s linear",
      }}
    >
      {children}
    </div>
  );
}
