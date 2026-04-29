"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import EyebrowBadge from "./EyebrowBadge";

// Spring presets
const springs = {
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
};

interface ProjectItem {
  title: string;
  index: string;
  image: string;
  href: string;
  category: string;
  year: string;
}

const projects: ProjectItem[] = [
  {
    title: "The Math Mentor",
    index: "01",
    image: "/projects/The%20Math%20Mentor%20covers.png",
    href: "/projects/math-mentor/",
    category: "Brand Identity",
    year: "2025",
  },
  {
    title: "Teacher Flow",
    index: "02",
    image: "/projects/Teacher%20Flow%20Template.png",
    href: "/projects/teacher-flow/",
    category: "Product Design",
    year: "2025",
  },
  {
    title: "Outline",
    index: "03",
    image: "/projects/Outline%20Brand%20Guidelines.png",
    href: "/projects/outline/",
    category: "Brand Identity",
    year: "2023",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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
    transition: {
      ...springs.bouncy,
      duration: 1,
    },
  },
};

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  // Floating image with spring physics
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(-9999);
  const mouseY = useRef(-9999);
  const imageX = useRef(-9999);
  const imageY = useRef(-9999);
  const activeImageUrl = useRef<string | null>(null);
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Tilt physics
  const tiltLerp = 0.08;
  const tiltX = useRef(0);
  const tiltY = useRef(0);
  const targetTiltX = useRef(0);
  const targetTiltY = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const floatingImage = floatingImageRef.current;
    if (!floatingImage) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isHovering.current) {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
        
        // Calculate tilt based on mouse position relative to viewport center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        targetTiltY.current = ((mouseX.current - centerX) / centerX) * 15;
        targetTiltX.current = ((centerY - mouseY.current) / centerY) * 10;
      }
    };

    const animateImage = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      if (activeImageUrl.current) {
        // Spring-like follow
        const followSpeed = 0.12;
        imageX.current += (mouseX.current - imageX.current) * followSpeed;
        imageY.current += (mouseY.current - imageY.current) * followSpeed;

        // Smooth tilt interpolation
        tiltX.current += (targetTiltX.current - tiltX.current) * tiltLerp;
        tiltY.current += (targetTiltY.current - tiltY.current) * tiltLerp;

        floatingImage.style.opacity = "1";
        floatingImage.style.transform = `
          translate(${imageX.current.toFixed(1)}px, ${imageY.current.toFixed(1)}px) 
          translate(-50%, -50%) 
          rotateX(${tiltX.current.toFixed(2)}deg) 
          rotateY(${tiltY.current.toFixed(2)}deg) 
          scale(1.08)
        `;
      } else {
        // Return to center with spring
        const centerXPos = centerX;
        const centerYPos = centerY;
        
        imageX.current += (centerXPos - imageX.current) * 0.08;
        imageY.current += (centerYPos - imageY.current) * 0.08;
        
        tiltX.current += (0 - tiltX.current) * tiltLerp;
        tiltY.current += (0 - tiltY.current) * tiltLerp;

        floatingImage.style.opacity = "0";
        floatingImage.style.transform = `
          translate(${imageX.current.toFixed(1)}px, ${imageY.current.toFixed(1)}px) 
          translate(-50%, -50%) 
          rotateX(${tiltX.current.toFixed(2)}deg) 
          rotateY(${tiltY.current.toFixed(2)}deg) 
          scale(0.9)
        `;
      }
      rafId.current = requestAnimationFrame(animateImage);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(animateImage);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-bg-primary flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Floating project image with spring tilt */}
      <motion.div
        ref={floatingImageRef}
        className="fixed top-0 left-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: activeProject ? 1 : 0,
          scale: activeProject ? 1.08 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          width: "18vw",
          height: "13vw",
          maxWidth: "280px",
          maxHeight: "200px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#141414",
          borderRadius: "8px",
          zIndex: 5,
          willChange: "transform, opacity",
          filter: "brightness(0.95) contrast(1.05) saturate(1.1)",
          boxShadow: "0 32px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
          perspective: "800px",
        }}
      />

      <div className="absolute top-8 left-4 md:left-8 lg:left-16 z-[15]">
        <h2 className="sr-only">Selected Work</h2>
        <EyebrowBadge variant="dark">SELECTED WORK</EyebrowBadge>
      </div>

      <motion.div
        variants={containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={isInView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-[1400px] mx-auto pt-20"
      >
        {projects.map((project, index) => (
          <motion.a
            key={project.index}
            href={project.href}
            variants={itemVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "hidden"}
            animate={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "visible"}
            className="group flex items-baseline gap-4 md:gap-8 py-5 md:py-8 border-b border-border-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm cursor-pointer"
            onHoverStart={(e) => {
              isHovering.current = true;
              activeImageUrl.current = project.image;
              setActiveProject(project.title);
              const rect = floatingImageRef.current;
              if (rect) rect.style.backgroundImage = `url('${project.image}')`;
              mouseX.current = e.clientX;
              mouseY.current = e.clientY;
              imageX.current = e.clientX;
              imageY.current = e.clientY;
            }}
            onHoverEnd={() => {
              isHovering.current = false;
              activeImageUrl.current = null;
              setActiveProject(null);
            }}
            onMouseMove={(e) => {
              mouseX.current = e.clientX;
              mouseY.current = e.clientY;
            }}
            whileHover={prefersReducedMotion ? {} : {
              x: 10,
              transition: { type: "spring", stiffness: 300, damping: 25 },
            }}
          >
            <motion.span
              className="font-mono text-xs font-semibold text-text-primary-light/60 tracking-[0.1em] w-10 text-right shrink-0 pointer-events-none select-none"
              whileHover={prefersReducedMotion ? {} : {
                x: -5,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
            >
              {project.index}
            </motion.span>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between flex-1 gap-1 md:gap-0">
              <motion.span
                className="font-display uppercase whitespace-nowrap text-text-primary-light leading-[0.95] tracking-[0.02em]"
                style={{
                  fontSize: "clamp(48px, 8vw, 120px)",
                  pointerEvents: "auto",
                }}
                whileHover={prefersReducedMotion ? {} : {
                  x: 8,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
              >
                <motion.span
                  className="relative inline-block"
                  whileHover={prefersReducedMotion ? {} : {
                    y: -4,
                    transition: { type: "spring", stiffness: 500, damping: 20 },
                  }}
                >
                  {project.title.split(" ").map((word, wordIndex) => (
                    <motion.span
                      key={wordIndex}
                      className={`inline-block ${wordIndex > 0 ? "ml-2 md:ml-4" : ""}`}
                      style={{ color: "inherit" }}
                      animate={activeProject === project.title ? {
                        color: "#FF4D2E",
                        transition: { type: "spring", stiffness: 400, damping: 25 },
                      } : {}}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.span>
              <motion.span 
                className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-text-primary-light/60 md:text-right shrink-0"
                animate={activeProject === project.title ? {
                  x: -5,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                } : {}}
              >
                {project.category} — {project.year}
              </motion.span>
            </div>
            
            {/* Arrow indicator */}
            <motion.div
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-transparent group-hover:border-border-light ml-4 transition-colors duration-300"
              whileHover={prefersReducedMotion ? {} : {
                x: 10,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
            >
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-text-primary-light/40 group-hover:text-text-primary-light transition-colors duration-300"
                whileHover={prefersReducedMotion ? {} : {
                  x: 4,
                  transition: { type: "spring", stiffness: 500, damping: 20 },
                }}
              >
                <path
                  d="M3 3H13M13 3V13M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
