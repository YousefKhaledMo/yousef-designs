import Image from "next/image";
import EyebrowBadge from "./EyebrowBadge";

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  image: string;
  aspectRatio?: string;
}

export default function ProjectCard({
  title,
  category,
  year,
  image,
  aspectRatio = "aspect-[16/9]",
}: ProjectCardProps) {
  return (
    <article className="relative group">
      {/* Outer Shell */}
      <div className="bg-white/5 ring-1 ring-white/10 p-1.5 rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-[-8px]">
        {/* Inner Core */}
        <div className="bg-[#111] rounded-[calc(2rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          {/* Image Container */}
          <div className={`relative overflow-hidden ${aspectRatio}`}>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale brightness-90 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.05]"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="font-display text-xl uppercase tracking-[0.15em] text-text-primary-light">
                View Project
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Title — absolute positioned */}
      <h3 className="absolute bottom-6 left-6 text-2xl md:text-3xl font-display text-text-primary-light z-10 pointer-events-none">
        {title}
      </h3>

      {/* Category Tag */}
      <span className="absolute top-6 right-6 z-10">
        <EyebrowBadge variant="dark">{category}</EyebrowBadge>
      </span>

      {/* Year */}
      <span className="absolute bottom-6 right-6 font-mono text-xs text-text-muted-light z-10 pointer-events-none">
        {year}
      </span>
    </article>
  );
}
