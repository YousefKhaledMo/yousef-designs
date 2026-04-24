import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";

const projectsData: Record<
  string,
  {
    title: string;
    category: string;
    year: string;
    description: string;
    images: string[];
    services: string[];
  }
> = {
  "math-mentor": {
    title: "The Math Mentor",
    category: "Brand Identity",
    year: "2025",
    description:
      "A complete brand identity system for an educational platform that makes math accessible and engaging. The visual language combines bold geometric shapes with vibrant, approachable colors to create a memorable learning experience. The brand communicates confidence, clarity, and the transformative power of understanding mathematics.",
    images: [
      "/projects/The%20Math%20Mentor%20covers.png",
      "/projects/The%20Math%20Mentor%20Brand%20Guidelines.png",
      "/projects/The%20Math%20Mentor%20assets.png",
      "/projects/The%20Math%20Mentor%20Logs%20v.png",
    ],
    services: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines", "Print Design"],
  },
  "teacher-flow": {
    title: "Teacher Flow",
    category: "Product Design",
    year: "2025",
    description:
      "An all-in-one Notion template designed for teachers to manage lessons, students, attendance, payments, and tasks. The system features a dark-themed dashboard with intuitive navigation, automated workflows, and a mobile-responsive layout. Built with advanced Notion formulas and database relations for seamless productivity.",
    images: [
      "/projects/Teacher%20Flow%20Template.png",
      "/projects/Teacher%20Flow%20Template.png",
    ],
    services: ["Product Design", "UX Research", "Notion Development", "Dashboard Design", "Workflow Automation"],
  },
  outline: {
    title: "Outline",
    category: "Brand Identity",
    year: "2023",
    description:
      "A comprehensive brand identity for a construction and engineering company. The logo mark features layered geometric forms that symbolize building foundations and structural precision. The color palette draws from industrial materials — concrete, steel, and safety orange — while maintaining a refined, professional aesthetic suitable for both digital and physical applications.",
    images: [
      "/projects/Outline%20Brand%20Guidelines.png",
      "/projects/Outline%20Brand%20Guidelines.png",
    ],
    services: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines", "Stationery Design"],
  },
};

export function generateStaticParams() {
  return Object.keys(projectsData).map((id) => ({ id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const project = projectsData[params.id];
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Yousef Designs`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectsData[params.id];

  if (!project) {
    notFound();
  }

  return <ProjectDetail {...project} />;
}
