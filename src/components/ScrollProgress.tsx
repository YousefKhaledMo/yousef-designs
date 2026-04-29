"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateProgress = () => {
      if (!progressRef.current) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      progressRef.current.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={progressRef}
      className="scroll-progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
