"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Position refs for smooth interpolation
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const dotX = useRef(0);
  const dotY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const lerp = (start: number, end: number, factor: number) => 
      start + (end - start) * factor;

    let rafId: number;

    const animate = () => {
      // Dot follows mouse immediately (fast lerp)
      dotX.current = lerp(dotX.current, mouseX.current, 0.8);
      dotY.current = lerp(dotY.current, mouseY.current, 0.8);
      
      // Ring lags behind (slow lerp) for trailing effect
      ringX.current = lerp(ringX.current, mouseX.current, 0.15);
      ringY.current = lerp(ringY.current, mouseY.current, 0.15);

      dot.style.transform = `translate(${dotX.current}px, ${dotY.current}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX.current}px, ${ringY.current}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      dot.style.transform = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%) scale(0.8)`;
      ring.style.transform = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%) scale(0.85)`;
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    // Initial opacity
    dot.style.opacity = "0";
    ring.style.opacity = "0";

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mousemove", handleHoverStart, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleHoverStart);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, isVisible]);

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Dot - follows mouse quickly */}
      <div
        ref={dotRef}
        className={`
          fixed top-0 left-0 z-[9999] pointer-events-none
          w-2 h-2 rounded-full bg-white
          transition-opacity duration-200 ease-out
          mix-blend-difference
          ${isClicking ? "scale-75" : "scale-100"}
          ${isHovering ? "scale-0" : ""}
        `}
        style={{ willChange: "transform, opacity" }}
      />
      
      {/* Ring - follows mouse with lag */}
      <div
        ref={ringRef}
        className={`
          fixed top-0 left-0 z-[9998] pointer-events-none
          w-10 h-10 rounded-full border border-white/50
          transition-all duration-300 ease-out
          mix-blend-difference
          ${isClicking ? "scale-75 border-white/80" : ""}
          ${isHovering ? "scale-150 border-accent w-12 h-12" : ""}
        `}
        style={{ willChange: "transform, opacity" }}
      />
    </>
  );
}
