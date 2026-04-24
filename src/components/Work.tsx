"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const floatingImageRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(-9999);
  const mouseY = useRef(-9999);
  const imageX = useRef(-9999);
  const imageY = useRef(-9999);
  const activeImageUrl = useRef<string | null>(null);
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  const imageLerp = 0.12;

  const handleClick = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    const floatingImage = floatingImageRef.current;
    if (!floatingImage) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isHovering.current) {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
      }
    };

    const animateImage = () => {
      if (activeImageUrl.current) {
        imageX.current += (mouseX.current - imageX.current) * imageLerp;
        imageY.current += (mouseY.current - imageY.current) * imageLerp;
        floatingImage.style.opacity = "1";
        floatingImage.style.transform = `translate(${imageX.current.toFixed(1)}px, ${imageY.current.toFixed(1)}px) translate(-50%, -50%) scale(1)`;
      } else {
        floatingImage.style.opacity = "0";
        floatingImage.style.transform = `translate(${imageX.current.toFixed(1)}px, ${imageY.current.toFixed(1)}px) translate(-50%, -50%) scale(0.95)`;
      }
      rafId.current = requestAnimationFrame(animateImage);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(animateImage);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={floatingImageRef}
        className="fixed top-0 left-0 pointer-events-none z-0"
        style={{
          width: "28vw",
          height: "18vw",
          maxWidth: "420px",
          maxHeight: "280px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#111",
          opacity: 0,
          willChange: "transform, opacity",
          filter: "brightness(0.85) contrast(1.1)",
        }}
      />

      <section
        id="work"
        ref={sectionRef}
        className="relative min-h-[100dvh] bg-[#0A0A0A] flex flex-col justify-center px-4 md:px-8 lg:px-16"
      >
        <div className="absolute top-8 left-4 md:left-8 lg:left-16 z-10">
          <EyebrowBadge variant="dark">SELECTED WORK</EyebrowBadge>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 w-full max-w-[1400px] mx-auto pt-20"
        >
          {projects.map((project) => (
            <motion.div
              key={project.index}
              variants={itemVariants}
              className="group flex items-baseline gap-4 md:gap-8 py-5 md:py-8 border-b border-[#F5F2ED]/10 cursor-pointer"
              onClick={() => handleClick(project.href)}
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
                className="font-mono text-xs font-semibold text-[#F5F2ED]/35 tracking-[0.1em] w-10 text-right shrink-0 pointer-events-none select-none"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {project.index}
              </span>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between flex-1 gap-1 md:gap-0">
                <span
                  className="font-display uppercase whitespace-nowrap text-[#F5F2ED] leading-[0.95] tracking-[0.02em] transition-colors duration-300 group-hover:text-[#FF4D2E]"
                  style={{
                    fontSize: "clamp(48px, 8vw, 120px)",
                    fontFamily: "var(--font-bebas-neue)",
                    pointerEvents: "auto",
                  }}
                >
                  {project.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F2ED]/40 md:text-right shrink-0">
                  {project.category} — {project.year}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
