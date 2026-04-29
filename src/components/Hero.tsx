"use client";

import { motion, Variants, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { useRef, useEffect } from "react";

const letters = [
  { char: "Y", offset: "-translate-y-[10px] -rotate-2" },
  { char: "o", offset: "translate-y-[5px] rotate-1", hasDot: true },
  { char: "u", offset: "-translate-y-[5px] -rotate-1" },
  { char: "s", offset: "translate-y-[8px] rotate-2" },
  { char: "e", offset: "-translate-y-[3px] -rotate-1" },
  { char: "f", offset: "translate-y-[6px] rotate-1" },
];

// Spring physics presets
const springs = {
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
  dramatic: { type: "spring" as const, stiffness: 80, damping: 18 },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    rotateX: 0,
    transition: {
      ...springs.dramatic,
      duration: 1.4,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springs.bouncy,
      delay,
      duration: 1,
    },
  }),
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  
  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  
  // Background elements parallax
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Mouse tracking
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);
  const orbCRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    const lerp = 0.05;
    const spotlightLerp = 0.12;

    const animate = () => {
      mouseX.current += (targetX.current - mouseX.current) * lerp;
      mouseY.current += (targetY.current - mouseY.current) * lerp;

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const relX = mouseX.current / winW;
      const relY = mouseY.current / winH;

      if (gridRef.current) {
        gridRef.current.style.backgroundPosition = `${(relX - 0.5) * 30 + 30}px ${(relY - 0.5) * 30 + 30}px`;
      }

      if (orbARef.current) {
        orbARef.current.style.transform = `translate(${(relX - 0.5) * 60}px, ${(relY - 0.5) * 60}px)`;
        orbARef.current.style.opacity = "0.35";
      }
      if (orbBRef.current) {
        orbBRef.current.style.transform = `translate(${(0.5 - relX) * 80}px, ${(0.5 - relY) * 80}px)`;
        orbBRef.current.style.opacity = "0.3";
      }
      if (orbCRef.current) {
        orbCRef.current.style.transform = `translate(${(relX - 0.5) * 40}px, ${(relY - 0.5) * 40}px)`;
        orbCRef.current.style.opacity = "0.25";
      }
      if (spotlightRef.current) {
        const sx = mouseX.current + (targetX.current - mouseX.current) * spotlightLerp;
        const sy = mouseY.current + (targetY.current - mouseY.current) * spotlightLerp;
        spotlightRef.current.style.opacity = "0.4";
        spotlightRef.current.style.background = `radial-gradient(400px circle at ${sx}px ${sy}px, rgba(245,242,237,0.06), transparent 55%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center bg-bg-primary px-4 md:px-8 lg:px-16 overflow-hidden"
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
    >
      {/* Animated background orbs + grid */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Parallax orbs */}
        <motion.div
          ref={orbARef}
          className="absolute w-[600px] h-[600px] rounded-full -top-40 -left-40 blur-[80px]"
          style={{ y: orb1Y }}
          animate={prefersReducedMotion ? {} : {
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,77,46,0.15) 0%, transparent 70%)",
              willChange: "transform, opacity",
              transition: "opacity 0.3s ease",
            }}
          />
        </motion.div>
        
        <motion.div
          ref={orbBRef}
          className="absolute w-[500px] h-[500px] rounded-full -bottom-32 -right-32 blur-[60px]"
          style={{ y: orb2Y }}
          animate={prefersReducedMotion ? {} : {
            x: [0, -40, 30, 0],
            y: [0, 20, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(245,242,237,0.08) 0%, transparent 70%)",
              willChange: "transform, opacity",
              transition: "opacity 0.3s ease",
            }}
          />
        </motion.div>
        
        <motion.div
          ref={orbCRef}
          className="absolute w-[350px] h-[350px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[50px]"
          style={{ y: orb3Y }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,77,46,0.1) 0%, transparent 70%)",
              willChange: "transform, opacity",
              transition: "opacity 0.3s ease",
            }}
          />
        </motion.div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,242,237,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,237,0.055) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "30px 30px",
            willChange: "background-position",
            transition: "opacity 0.3s ease",
          }}
        />
        
        {/* Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute inset-0"
          style={{
            opacity: 0,
            willChange: "background, opacity",
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Fractured "Yousef" */}
        <motion.h1
          className="font-display text-[clamp(6rem,15vw,18rem)] leading-[0.85] text-text-primary-light tracking-tight flex"
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          aria-label="Yousef"
          style={{ perspective: "1000px" }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              initial={prefersReducedMotion ? { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 } : "hidden"}
              animate={prefersReducedMotion ? { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 } : "visible"}
              className={`relative inline-block ${letter.offset} cursor-default select-none`}
              style={{ 
                willChange: "transform, opacity, filter",
                transformStyle: "preserve-3d",
              }}
              whileHover={prefersReducedMotion ? {} : {
                y: -10,
                rotateY: 15,
                rotateX: -10,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
            >
              {letter.char}
              {letter.hasDot && (
                <motion.span 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </motion.span>
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* "Designs" */}
        <motion.p
          className="font-display text-[clamp(2rem,5vw,4rem)] text-text-primary-light/60 tracking-widest mt-2"
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "visible"}
          custom={0.6}
          whileHover={prefersReducedMotion ? {} : {
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          Designs
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="font-body text-[clamp(1rem,1.5vw,1.25rem)] text-text-primary-light/70 max-w-[40ch] mt-6 leading-relaxed"
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "visible"}
          custom={0.9}
          whileHover={prefersReducedMotion ? {} : {
            y: -3,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          I break conventions to build digital experiences that people remember.
        </motion.p>

        {/* CTA Button with spring physics */}
        <motion.a
          href="#work"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white/5 border border-border-light px-6 py-3"
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "visible"}
          custom={1.0}
          whileHover={prefersReducedMotion ? {} : {
            scale: 1.08,
            y: -2,
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
          whileTap={prefersReducedMotion ? {} : {
            scale: 0.95,
            transition: { type: "spring", stiffness: 600, damping: 20 },
          }}
        >
          <span className="font-body text-sm text-text-primary-light">
            Explore Work
          </span>
          <motion.span 
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white/10"
            whileHover={prefersReducedMotion ? {} : {
              x: 2,
              y: -2,
              transition: { type: "spring", stiffness: 500, damping: 20 },
            }}
          >
            <ArrowRight
              className="w-4 h-4 text-text-primary-light"
              weight="bold"
            />
          </motion.span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, ...springs.gentle }}
      >
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary-light/40"
          animate={prefersReducedMotion ? {} : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-text-primary-light/40 to-transparent"
          animate={prefersReducedMotion ? {} : {
            scaleY: [0, 1, 0],
            originY: 0,
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
}
