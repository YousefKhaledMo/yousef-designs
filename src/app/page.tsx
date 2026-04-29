import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Custom cursor (desktop only) */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero with parallax effect */}
      <Hero />
      
      {/* Work section with spring hover effects */}
      <Work />
      
      {/* About section with scroll animations */}
      <About />
      
      {/* Services section with magnetic CTAs */}
      <Services />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
