interface EyebrowBadgeProps {
  children: React.ReactNode;
  variant?: "dark" | "light" | "accent";
}

const variantStyles = {
  dark: "bg-bg-primary text-text-primary-light border border-border-light",
  light: "bg-bg-secondary text-text-primary-dark border border-border-dark",
  accent: "bg-accent text-bg-primary",
};

export default function EyebrowBadge({
  children,
  variant = "dark",
}: EyebrowBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-mono ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
