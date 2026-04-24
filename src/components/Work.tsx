"use client";

import { useRef, useEffect, useCallback } from "react";
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
  {
    title: "The Math Mentor",
    index: "04",
    image: "/projects/The%20Math%20Mentor%20Brand%20Guidelines.png",
    href: "/projects/math-mentor/",
    category: "Brand Identity",
    year: "2025",
  },
  {
    title: "Teacher Flow",
    index: "05",
    image: "/projects/Teacher%20Flow%20Template.png",
    href: "/projects/teacher-flow/",
    category: "Product Design",
    year: "2025",
  },
  {
    title: "Outline",
    index: "06",
    image: "/projects/Outline%20Brand%20Guidelines.png",
    href: "/projects/outline/",
    category: "Brand Identity",
    year: "2023",
  },
];

export default function Work() {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

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
    const container = containerRef.current;
    const sticky = stickyRef.current;
    const floatingImage = floatingImageRef.current;
    const items = itemsRef.current;

    if (!container || !sticky || !floatingImage || items.length === 0) return;

    const totalItems = projects.length;
    const viewportH = window.innerHeight;

    // Each item takes ~55% of viewport so only ~2 are fully visible at once
    const itemHeight = Math.max(340, Math.round(viewportH * 0.55));

    const listHeight = totalItems * itemHeight;

    // Offset so first item starts centered vertically in the sticky viewport
    const centerOffset = viewportH / 2 - itemHeight / 2;

    // Container needs enough height to scroll through all items.
    // Last item should reach center when scrolled to bottom.
    const maxScroll = listHeight - itemHeight;
    const spacerHeight = listHeight + viewportH;
    container.style.height = `${spacerHeight}px`;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();

      // progress: 0 at start, 1 when scrolled through entire container
      const rawProgress = -rect.top / (rect.height - viewportH);
      const progress = Math.max(0, Math.min(1, rawProgress));

      const currentScroll = progress * maxScroll;
      const viewportCenter = viewportH / 2;

      items.forEach((el, i) => {
        const baseY = i * itemHeight;
        const translateY = baseY - currentScroll + centerOffset;
        const itemCenter = translateY + itemHeight / 2;
        const dist = Math.abs(itemCenter - viewportCenter);
        const range = viewportH * 0.45; // items outside this range fade out
        const norm = Math.min(dist / range, 1);

        const scale = 1 - norm * 0.2;
        const opacity = 1 - norm * 0.85;
        const blur = norm * 5;

        el.style.transform = `translateY(${translateY}px) scale(${scale}) translateZ(0)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `blur(${blur.toFixed(1)}px)`;
      });
    };

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
        floatingImage.style.transform = `translate(${imageX.current.toFixed(
          1
        )}px, ${imageY.current.toFixed(1)}px) translate(-50%, -50%) scale(1)`;
      } else {
        floatingImage.style.opacity = "0";
        floatingImage.style.transform = `translate(${imageX.current.toFixed(
          1
        )}px, ${imageY.current.toFixed(1)}px) translate(-50%, -50%) scale(0.95)`;
      }
      rafId.current = requestAnimationFrame(animateImage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll();
    rafId.current = requestAnimationFrame(animateImage);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Floating Project Image (fixed globally) */}
      <div
        ref={floatingImageRef}
        className="fixed top-0 left-0 pointer-events-none z-0"
        style={{
          width: "34vw",
          height: "24vw",
          maxWidth: "520px",
          maxHeight: "360px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#111",
          opacity: 0,
          willChange: "transform, opacity",
          filter: "brightness(0.85) contrast(1.1)",
        }}
      />

      {/* Scroll spacer — creates the scroll distance */}
      <section id="work" ref={containerRef} className="relative bg-[#0A0A0A]">
        {/* Sticky viewport — pins to screen */}
        <div
          ref={stickyRef}
          className="sticky top-0 left-0 w-full overflow-hidden bg-[#0A0A0A]"
          style={{ height: "100vh", zIndex: 1 }}
        >
          {/* Section Header */}
          <div className="absolute top-8 left-4 md:left-8 lg:left-16 z-10">
            <EyebrowBadge variant="dark">SELECTED WORK</EyebrowBadge>
          </div>

          {/* Kinetic list items */}
          {projects.map((project, i) => (
            <div
              key={`${project.index}-${i}`}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="absolute left-0 w-full flex items-center"
              style={{
                willChange: "transform, opacity, filter",
                paddingLeft: "5vw",
                paddingRight: "5vw",
              }}
            >
              <span
                className="font-mono text-xs font-semibold text-[#F5F2ED]/35 tracking-[0.1em] mr-[3vw] w-10 text-right shrink-0 pointer-events-none select-none"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {project.index}
              </span>
              <div className="flex flex-col">
                <span
                  className="font-display uppercase whitespace-nowrap cursor-pointer select-none leading-[0.9] tracking-[0.02em] text-[#F5F2ED]"
                  style={{
                    fontSize: "clamp(56px, 9vw, 140px)",
                    fontFamily: "var(--font-bebas-neue)",
                    pointerEvents: "auto",
                  }}
                  onMouseEnter={(e) => {
                    isHovering.current = true;
                    activeImageUrl.current = project.image;
                    const rect = floatingImageRef.current;
                    if (rect) {
                      rect.style.backgroundImage = `url('${project.image}')`;
                    }
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
                  onClick={() => handleClick(project.href)}
                >
                  {project.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F2ED]/40 mt-1">
                  {project.category} — {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
