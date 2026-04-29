"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useSpring, useTransform } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// Spring presets
const springs = {
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const linkContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: springs.bouncy,
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Detect scroll position to switch navbar style
  useEffect(() => {
    const aboutSection = document.getElementById("about");
    const servicesSection = document.getElementById("services");

    const observer = new IntersectionObserver(
      (entries) => {
        const anyIntersecting = entries.some((entry) => entry.isIntersecting);
        setIsLightSection(anyIntersecting);
      },
      {
        rootMargin: "-100px 0px 0px 0px",
        threshold: 0,
      }
    );

    if (aboutSection) observer.observe(aboutSection);
    if (servicesSection) observer.observe(servicesSection);

    return () => {
      if (aboutSection) observer.unobserve(aboutSection);
      if (servicesSection) observer.unobserve(servicesSection);
      observer.disconnect();
    };
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = setTimeout(() => {
      linkRefs.current[0]?.focus();
    }, shouldReduceMotion ? 0 : 100);

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusables = linkRefs.current.filter(Boolean) as HTMLAnchorElement[];
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleTabKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen, shouldReduceMotion]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    closeMenu();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const transition = {
    duration: shouldReduceMotion ? 0 : 0.3,
    ease: [0.32, 0.72, 0, 1] as const,
  };

  const linkTransition = {
    duration: shouldReduceMotion ? 0 : 0.5,
    ease: [0.32, 0.72, 0, 1] as const,
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...springs.bouncy, delay: 0.5 }}
      >
        <motion.div
          className="backdrop-blur-xl rounded-full px-6 py-3 border flex items-center gap-8"
          animate={{
            backgroundColor: isLightSection
              ? "rgba(10, 10, 10, 0.8)"
              : "rgba(245, 242, 237, 0.05)",
            borderColor: isLightSection
              ? "rgba(245, 242, 237, 0.15)"
              : "rgba(245, 242, 237, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo with spring */}
          <motion.a
            href="#"
            onClick={(e) => handleLinkClick(e, "#")}
            className="font-display text-sm tracking-[0.15em] text-text-primary-light uppercase select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm"
            whileHover={shouldReduceMotion ? {} : {
              scale: 1.1,
              transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
            whileTap={shouldReduceMotion ? {} : {
              scale: 0.95,
              transition: { type: "spring", stiffness: 600, damping: 20 },
            }}
          >
            Yousef
          </motion.a>

          {/* Desktop Nav Links with spring hover */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-body text-xs uppercase tracking-[0.1em] text-text-primary-light/80 hover:text-text-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm relative"
                whileHover={shouldReduceMotion ? {} : {
                  y: -2,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                whileTap={shouldReduceMotion ? {} : {
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 600, damping: 20 },
                }}
              >
                {link.label}
                {/* Underline indicator */}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Hamburger with spring */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden relative w-11 h-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-full"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            whileTap={shouldReduceMotion ? {} : {
              scale: 0.9,
              transition: { type: "spring", stiffness: 600, damping: 20 },
            }}
          >
            <div className="relative w-6 h-5 flex items-center justify-center">
              <motion.span
                className="absolute w-full h-[1.5px] bg-text-primary-light origin-center"
                animate={{
                  y: isOpen ? 0 : -6,
                  rotate: isOpen ? 45 : 0,
                }}
                transition={transition}
              />
              <motion.span
                className="absolute w-full h-[1.5px] bg-text-primary-light origin-center"
                animate={{
                  y: isOpen ? 0 : 6,
                  rotate: isOpen ? -45 : 0,
                }}
                transition={transition}
              />
            </div>
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay with spring */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 backdrop-blur-3xl bg-black/90 z-40 flex items-center justify-center md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
            onClick={closeMenu}
          >
            <motion.nav
              className="flex flex-col items-center gap-8"
              variants={linkContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  ref={(el) => { linkRefs.current[index] = el; }}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display text-5xl uppercase tracking-[0.05em] text-text-primary-light hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm"
                  variants={linkVariants}
                  transition={linkTransition}
                  whileHover={shouldReduceMotion ? {} : {
                    x: 20,
                    color: "var(--color-accent)",
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  whileTap={shouldReduceMotion ? {} : {
                    scale: 0.95,
                    transition: { type: "spring", stiffness: 600, damping: 20 },
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
