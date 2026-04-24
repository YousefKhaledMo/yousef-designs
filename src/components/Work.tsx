"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import EyebrowBadge from "./EyebrowBadge";

const colSpanMap: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

const rowSpanMap: Record<number, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
};

const projects = [
  {
    id: "math-mentor",
    title: "The Math Mentor",
    category: "Brand Identity",
    year: "2025",
    image: "/projects/The Math Mentor covers.png",
    span: { cols: 8, rows: 2 },
    aspectRatio: "aspect-[16/10]",
    overlap: "",
  },
  {
    id: "teacher-flow",
    title: "Teacher Flow",
    category: "Product Design",
    year: "2025",
    image: "/projects/Teacher Flow Template.png",
    span: { cols: 4, rows: 1 },
    aspectRatio: "aspect-[4/3]",
    overlap: "-ml-4 -mt-8 md:-mt-12",
  },
  {
    id: "outline",
    title: "Outline",
    category: "Brand Identity",
    year: "2023",
    image: "/projects/Outline Brand Guidelines.png",
    span: { cols: 5, rows: 1 },
    aspectRatio: "aspect-[16/9]",
    overlap: "",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 64,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
};

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-[#0A0A0A] py-32 md:py-40 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <EyebrowBadge variant="dark">SELECTED WORK</EyebrowBadge>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 lg:gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`
                col-span-1 row-span-1
                ${colSpanMap[project.span.cols]}
                ${rowSpanMap[project.span.rows]}
                ${project.overlap}
              `}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <ProjectCard
                title={project.title}
                category={project.category}
                year={project.year}
                image={project.image}
                aspectRatio={project.aspectRatio}
                href={`/projects/${project.id}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
