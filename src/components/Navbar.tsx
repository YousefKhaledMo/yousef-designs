"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const linkContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

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
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="backdrop-blur-xl bg-white/5 rounded-full px-6 py-3 border border-white/10 flex items-center gap-8">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "#")}
            className="font-display text-sm tracking-[0.15em] text-text-primary-light uppercase select-none"
          >
            Yousef
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-body text-xs uppercase tracking-[0.1em] text-text-primary-light/80 hover:text-text-primary-light transition-colors"
                style={{
                  transitionDuration: shouldReduceMotion ? "0ms" : "300ms",
                  transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-6 h-5 flex items-center justify-center"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
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
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
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
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display text-5xl uppercase tracking-[0.05em] text-text-primary-light hover:text-accent transition-colors"
                  style={{
                    transitionDuration: shouldReduceMotion ? "0ms" : "300ms",
                    transitionTimingFunction:
                      "cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                  variants={linkVariants}
                  transition={linkTransition}
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
