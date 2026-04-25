"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import EyebrowBadge from "./EyebrowBadge";

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

const primaryEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: primaryEase,
    },
  },
};

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const floatingImageRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(-9999);
  const mouseY = useRef(-9999);
  const imageX = useRef(-9999);
  const imageY = useRef(-9999);
  const activeImageUrl = useRef<string | null>(null);
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  const imageLerp = 0.1;
  const tiltLerp = 0.08;
  const tiltX = useRef(0);
  const tiltY = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const floatingImage = floatingImageRef.current;
    if (!floatingImage) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isHovering.current) {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
      }
    };

    const animateImage = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      if (activeImageUrl.current) {
        imageX.current += (mouseX.current - imageX.current) * imageLerp;
        imageY.current += (mouseY.current - imageY.current) * imageLerp;

        const targetTiltY = ((mouseX.current - centerX) / centerX) * 20;
        const targetTiltX = ((centerY - mouseY.current) / centerY) * 14;

        tiltY.current += (targetTiltY - tiltY.current) * tiltLerp;
        tiltX.current += (targetTiltX - tiltX.current) * tiltLerp;

        floatingImage.style.opacity = "1";
        floatingImage.style.transform = `translate(${imageX.current.toFixed(1)}px, ${imageY.current.toFixed(1)}px) translate(-50%, -50%) rotateX(${tiltX.current.toFixed(2)}deg) rotateY(${tiltY.current.toFixed(2)}deg) scale(1.06)`;
      } else {
        tiltY.current += (0 - tiltY.current) * tiltLerp;
        tiltX.current += (0 - tiltX.current) * tiltLerp;

        floatingImage.style.opacity = "0";
        floatingImage.style.transform = `translate(${imageX.current.toFixed(1)}px, ${imageY.current.toFixed(1)}px) translate(-50%, -50%) rotateX(${tiltX.current.toFixed(2)}deg) rotateY(${tiltY.current.toFixed(2)}deg) scale(0.92)`;
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
      {/* Floating project image — behind text */}
      <div
        ref={floatingImageRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: "18vw",
          height: "13vw",
          maxWidth: "280px",
          maxHeight: "200px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#141414",
          borderRadius: "6px",
          opacity: 0,
          zIndex: 5,
          willChange: "transform, opacity",
          filter: "brightness(0.9) contrast(1.05)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          perspective: "600px",
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
        {projects.map((project) => (
          <motion.a
            key={project.index}
            href={project.href}
            variants={itemVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "visible"}
            className="group flex items-baseline gap-4 md:gap-8 py-5 md:py-8 border-b border-border-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm"
            onMouseEnter={(e) => {
              isHovering.current = true;
              activeImageUrl.current = project.image;
              const rect = floatingImageRef.current;
              if (rect) rect.style.backgroundImage = `url('${project.image}')`;
              mouseX.current = e.clientX;
              mouseY.current = e.clientY;
              imageX.current = e.clientX;
              imageY.current = e.clientY;
            }}
            onMouseLeave={() => {
              isHovering.current = false;
              activeImageUrl.current = null;
            }}
            onMouseMove={(e) => {
              mouseX.current = e.clientX;
              mouseY.current = e.clientY;
            }}
          >
            <span
              className="font-mono text-xs font-semibold text-text-primary-light/60 tracking-[0.1em] w-10 text-right shrink-0 pointer-events-none select-none"
            >
              {project.index}
            </span>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between flex-1 gap-1 md:gap-0">
              <span
                className="font-display uppercase whitespace-nowrap text-text-primary-light leading-[0.95] tracking-[0.02em] transition-colors duration-300 group-hover:text-accent"
                style={{
                  fontSize: "clamp(48px, 8vw, 120px)",
                  pointerEvents: "auto",
                }}
              >
                {project.title}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-text-primary-light/60 md:text-right shrink-0">
                {project.category} — {project.year}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
