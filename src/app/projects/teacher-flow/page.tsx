import ProjectPageTemplate from "@/components/ProjectPageTemplate";

export const metadata = {
  title: "Teacher Flow — Yousef Designs",
  description:
    "An all-in-one Notion template designed for teachers to manage lessons, students, attendance, payments, and tasks.",
};

export default function TeacherFlowPage() {
  return (
    <ProjectPageTemplate
      title="Teacher Flow"
      category="Product Design"
      year="2025"
      description="An all-in-one Notion template designed for teachers to manage lessons, students, attendance, payments, and tasks. The system features a dark-themed dashboard with intuitive navigation, automated workflows, and a mobile-responsive layout. Built with advanced Notion formulas and database relations for seamless productivity."
      images={[
        "/projects/Teacher%20Flow%20Template.png",
      ]}
      services={[
        "Product Design",
        "UX Research",
        "Notion Development",
        "Dashboard Design",
        "Workflow Automation",
      ]}
    />
  );
}
