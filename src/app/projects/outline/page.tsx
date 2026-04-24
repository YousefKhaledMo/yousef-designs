import ProjectPageTemplate from "@/components/ProjectPageTemplate";

export const metadata = {
  title: "Outline — Yousef Designs",
  description:
    "A comprehensive brand identity for a construction and engineering company.",
};

export default function OutlinePage() {
  return (
    <ProjectPageTemplate
      title="Outline"
      category="Brand Identity"
      year="2023"
      description="A comprehensive brand identity for a construction and engineering company. The logo mark features layered geometric forms that symbolize building foundations and structural precision. The color palette draws from industrial materials — concrete, steel, and safety orange — while maintaining a refined, professional aesthetic suitable for both digital and physical applications."
      images={[
        "/projects/Outline%20Brand%20Guidelines.png",
      ]}
      services={[
        "Brand Strategy",
        "Logo Design",
        "Visual Identity",
        "Brand Guidelines",
        "Stationery Design",
      ]}
    />
  );
}
