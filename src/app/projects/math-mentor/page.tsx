import ProjectPageTemplate from "@/components/ProjectPageTemplate";

export const metadata = {
  title: "The Math Mentor — Yousef Designs",
  description:
    "A complete brand identity system for an educational platform that makes math accessible and engaging.",
};

export default function MathMentorPage() {
  return (
    <ProjectPageTemplate
      title="The Math Mentor"
      category="Brand Identity"
      year="2025"
      description="A complete brand identity system for an educational platform that makes math accessible and engaging. The visual language combines bold geometric shapes with vibrant, approachable colors to create a memorable learning experience. The brand communicates confidence, clarity, and the transformative power of understanding mathematics."
      images={[
        "/projects/The%20Math%20Mentor%20covers.png",
        "/projects/The%20Math%20Mentor%20Brand%20Guidelines.png",
        "/projects/The%20Math%20Mentor%20assets.png",
        "/projects/The%20Math%20Mentor%20Logs%20v.png",
      ]}
      services={[
        "Brand Strategy",
        "Logo Design",
        "Visual Identity",
        "Brand Guidelines",
        "Print Design",
      ]}
    />
  );
}
