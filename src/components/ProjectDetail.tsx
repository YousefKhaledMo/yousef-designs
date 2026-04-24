import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import EyebrowBadge from "@/components/EyebrowBadge";

interface ProjectDetailProps {
  title: string;
  category: string;
  year: string;
  description: string;
  images: string[];
  services: string[];
}

export default function ProjectDetail({
  title,
  category,
  year,
  description,
  images,
  services,
}: ProjectDetailProps) {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="flex items-center gap-2 text-text-primary-light/80 hover:text-text-primary-light transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-sm uppercase tracking-[0.1em]">
              Back to Work
            </span>
          </Link>
          <span className="font-mono text-xs text-text-muted-light">
            {year}
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <EyebrowBadge variant="dark">{category}</EyebrowBadge>
          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] text-text-primary-light uppercase">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl font-body text-lg md:text-xl leading-relaxed text-text-primary-light/70">
            {description}
          </p>
        </div>
      </section>

      {/* Main Image */}
      <section className="px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-[#111]">
            <Image
              src={images[0]}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Services & Info */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted-light mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li
                  key={service}
                  className="font-body text-text-primary-light/80"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted-light mb-4">
              Year
            </h3>
            <p className="font-body text-text-primary-light/80">{year}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted-light mb-4">
              Category
            </h3>
            <p className="font-body text-text-primary-light/80">{category}</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-32 md:pb-40 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-[#111]"
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 2}`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-24 px-4 md:px-8 lg:px-16 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted-light mb-4">
            Interested?
          </p>
          <a
            href="mailto:youseefkhald@gmail.com"
            className="inline-flex items-center gap-3 font-display text-3xl md:text-5xl text-text-primary-light hover:text-accent transition-colors duration-300"
          >
            Start a Conversation
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
