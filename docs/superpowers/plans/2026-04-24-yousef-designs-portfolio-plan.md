# Yousef Designs Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an awwwards-level portfolio landing page with fractured typography, asymmetric bento grid, scroll animations, and brutalist aesthetic.

**Architecture:** Next.js 15 App Router with Tailwind CSS v4, Framer Motion for animations. Self-hosted fonts (Bebas Neue, Sora, JetBrains Mono). Single page with 5 sections: Hero, About, Work, Services, Footer.

**Tech Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion + Phosphor Icons

---

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout with fonts, metadata
    page.tsx            # Main page composing all sections
    globals.css         # Design tokens, custom styles, animations
  components/
    Navbar.tsx          # Floating pill navbar + mobile menu
    Hero.tsx            # Fractured typography hero with grid overlay
    About.tsx           # Manifesto section with word-by-word reveal
    Work.tsx            # Bento grid project showcase
    Services.tsx        # Service offerings with hover interactions
    Footer.tsx          # Cinematic footer with curtain reveal
    ProjectCard.tsx     # Reusable double-bezel project card
    EyebrowBadge.tsx    # Reusable eyebrow label component
    AnimatedSection.tsx # Reusable scroll-triggered reveal wrapper
public/
  projects/
    math-mentor.jpg     # Math Mentor branding project
    teacher-flow.jpg    # Teacher Flow Notion template
    outline.jpg         # Outline branding project
```

---

## Task 1: Project Setup & Global Styles

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/components/AnimatedSection.tsx`
- Create: `src/components/EyebrowBadge.tsx`

**Context:** Design spec Section 2 (Global Design Tokens), Section 6.4 (Tech Stack)

- [ ] **Step 1: Configure globals.css with design tokens**

Replace the current globals.css with the complete design token system:
- CSS custom properties for colors, fonts, spacing, motion
- Grid overlay utility class
- Grain texture overlay
- Scanlines effect
- Custom scrollbar styling
- Selection styling
- Reduced motion media query

- [ ] **Step 2: Configure layout.tsx with fonts and metadata**

Set up:
- Google Fonts: Bebas Neue (display), Sora (body), JetBrains Mono (mono)
- SEO metadata with Open Graph and Twitter cards
- Proper HTML lang attribute
- Root layout wrapper

- [ ] **Step 3: Create AnimatedSection component**

A reusable wrapper component using Framer Motion's `motion` + `useInView`:
- Props: `children`, `className`, `delay?`, `direction?` ('up' | 'down' | 'left' | 'right')
- Animation: `translateY(64px), opacity: 0` → `translateY(0), opacity: 1`
- Duration: 900ms, ease: `[0.32, 0.72, 0, 1]`
- Trigger: IntersectionObserver with `once: true`, `amount: 0.1`
- Respect `prefers-reduced-motion`

- [ ] **Step 4: Create EyebrowBadge component**

A simple reusable pill badge:
- Props: `children`, `variant?` ('dark' | 'light' | 'accent')
- Style: `rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]`
- Font: JetBrains Mono
- Variants for different background colors

- [ ] **Step 5: Verify setup**

Run `npm run dev` and verify:
- No build errors
- Fonts load correctly
- Custom styles apply

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: setup design tokens, fonts, and reusable components"
```

---

## Task 2: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`

**Context:** Design spec Section 3.5 (Fluid Island Navigation), Section 4.1 (Hero)

- [ ] **Step 1: Build floating pill navbar**

Closed state:
- Fixed position, detached from top: `fixed top-6 left-1/2 -translate-x-1/2`
- Glass effect: `backdrop-blur-xl bg-white/5 rounded-full`
- Border: `border border-white/10`
- Content: Logo text "Yousef" + nav links (Work, About, Services, Contact) + hamburger menu button
- Nav links scroll to section IDs via anchor links
- Hide on mobile (show hamburger only), show full nav on desktop

- [ ] **Step 2: Build mobile menu overlay**

Open state (triggered by hamburger):
- Full-screen overlay: `fixed inset-0 backdrop-blur-3xl bg-black/90 z-50`
- Hamburger morphs to X using CSS transforms (rotate lines)
- Links stagger in: `translate-y-12 opacity-0` → `translate-y-0 opacity-100`
- Stagger delay: 100ms per link
- Close on link click or clicking overlay background

- [ ] **Step 3: Add scroll behavior**

- Navbar becomes slightly more opaque on scroll
- Smooth scroll to sections on link click

- [ ] **Step 4: Test and commit**

Verify:
- Navbar floats correctly
- Mobile menu opens/closes smoothly
- Links navigate to correct sections
- Hamburger morph animation works

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add floating pill navbar with mobile menu"
```

---

## Task 3: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

**Context:** Design spec Section 4.1 (Hero — "The Fractured Introduction")

- [ ] **Step 1: Build hero layout**

- Full viewport height: `min-h-[100dvh]`
- Background: `#0A0A0A` with grid overlay
- Centered content container

- [ ] **Step 2: Create fractured typography effect**

"Yousef" in massive Bebas Neue:
- Font size: `clamp(6rem, 15vw, 18rem)`
- Letters positioned with slight offsets and rotations
- Each letter is a separate `motion.span` for individual animation
- "Designs" below in lighter weight, smaller scale

- [ ] **Step 3: Implement load animation**

- Page loads to black
- Letters stagger in from random positions with `blur(8px)` → `blur(0)`
- Stagger: 80ms per letter
- Duration: 1200ms
- After letters: tagline and CTA fade in

- [ ] **Step 4: Add magnetic hover effect**

- On hover over each letter, it gently pushes away using CSS `:hover` transform
- The "o" in Yousef has a subtle pulsing dot (scale animation, 2s infinite)

- [ ] **Step 5: Add tagline and CTA**

- Tagline: "I break conventions to build digital experiences that people remember."
- CTA: "Explore Work" button — nested pill button with arrow icon
- Button uses double-bezel architecture (outer shell + inner core)
- Smooth scroll to Work section on click

- [ ] **Step 6: Test and commit**

Verify:
- Load animation plays correctly
- Typography is responsive
- Hover effects work
- CTA scrolls to Work section

```bash
git add src/components/Hero.tsx
git commit -m "feat: add hero section with fractured typography and load animation"
```

---

## Task 4: About Section

**Files:**
- Create: `src/components/About.tsx`

**Context:** Design spec Section 4.2 (About — "The Manifesto")

- [ ] **Step 1: Build section layout**

- Background: `#F5F4EE` (warm off-white) with grain texture overlay
- Sharp transition from hero (no gradient, instant color flip)
- Asymmetric layout: 60% text left, 40% empty with floating shape on desktop
- Full-width text on mobile
- Padding: `py-32 md:py-40`

- [ ] **Step 2: Implement word-by-word reveal**

- Manifesto text reveals word-by-word on scroll
- Each word starts: `opacity: 0, translateY(20px)`
- Each word ends: `opacity: 1, translateY(0)`
- Stagger: 30ms per word
- Trigger: IntersectionObserver at 20% visibility
- Use Framer Motion's `useInView` + staggered children

- [ ] **Step 3: Add manifesto content**

- Eyebrow badge: "ABOUT"
- Manifesto: "Lawyer turned designer. I don't do safe. I take brands apart and rebuild them into experiences that demand attention. From product interfaces to full brand systems — Google UX certified, CalArts trained, and built on chaos."
- Highlight words "safe" and "attention" in accent color (#FF4D2E)
- Font: Sora, size `clamp(1.5rem, 3vw, 3rem)`, weight 500

- [ ] **Step 4: Add floating geometric shape**

- Simple rotating wireframe cube or abstract polygon
- CSS animation: slow rotation (20s linear infinite)
- Position: sticky on desktop, hidden on mobile
- Pure CSS, no WebGL needed

- [ ] **Step 5: Add client ticker**

- Horizontal scrolling ticker of client/brand names
- Monochrome, ultra-small, understated
- Infinite scroll animation
- Names: "Google UX", "CalArts", "Notion Academy", "The Math Mentor", "Outline", "Teacher Flow"

- [ ] **Step 6: Test and commit**

Verify:
- Color transition is sharp
- Word reveal animation works on scroll
- Ticker scrolls infinitely
- Responsive on mobile

```bash
git add src/components/About.tsx
git commit -m "feat: add about section with word-by-word reveal and client ticker"
```

---

## Task 5: Project Card Component

**Files:**
- Create: `src/components/ProjectCard.tsx`

**Context:** Design spec Section 3.4 (Project Card), Section 4.3 (Work)

- [ ] **Step 1: Build double-bezel card architecture**

Outer shell:
- `bg-white/5 ring-1 ring-white/10 p-1.5 rounded-[2rem]`

Inner core:
- `bg-[#111] rounded-[calc(2rem-0.375rem)] overflow-hidden`
- Inner highlight: `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`

- [ ] **Step 2: Add image and hover effects**

- Image inside inner core with `object-cover`
- Default state: `grayscale(100%)`
- Hover state: `grayscale(0%)`, slight scale `1.05`
- Overlay on hover: dark gradient + "View Project" text fade-in
- Card lifts on hover: `translateY(-8px)`
- All transitions: 700ms cubic-bezier(0.32, 0.72, 0, 1)

- [ ] **Step 3: Add project info overlay**

- Title: Absolute positioned bottom-left, large Bebas Neue
- Category tag: Pill badge top-right
- Year: Micro text bottom-right

- [ ] **Step 4: Test and commit**

Verify card hover states and transitions work smoothly.

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add reusable project card with double-bezel architecture"
```

---

## Task 6: Work Section

**Files:**
- Create: `src/components/Work.tsx`

**Context:** Design spec Section 4.3 (Work — "The Living Archive")

- [ ] **Step 1: Build bento grid layout**

- Background: `#0A0A0A`
- CSS Grid: `grid-template-columns: repeat(12, 1fr)`
- Asymmetric card placement:
  - Card 1: col-span-8, row-span-2 (The Math Mentor)
  - Card 2: col-span-4, row-span-1 (Teacher Flow)
  - Card 3: col-span-4, row-span-1 (placeholder)
  - Card 4: col-span-5, row-span-1 (Outline)
  - Card 5: col-span-7, row-span-2 (placeholder)
- Cards overlap with negative margins on some
- Gap: `gap-4 md:gap-6`

- [ ] **Step 2: Add real project data**

Projects array:
1. The Math Mentor — Brand Identity — 2025 — Image: math-mentor.jpg
2. Teacher Flow — Product Design — 2025 — Image: teacher-flow.jpg
3. Outline — Brand Identity — 2023 — Image: outline.jpg

Use placeholder images for now (Unsplash URLs matching project vibe).

- [ ] **Step 3: Implement staggered scroll reveal**

- Cards animate in as they enter viewport
- Start: `translateY(64px), blur(8px), opacity: 0`
- End: `translateY(0), blur(0), opacity: 1`
- Duration: 900ms
- Stagger: 100ms per card
- Use AnimatedSection wrapper or custom Framer Motion setup

- [ ] **Step 4: Mobile responsive**

- Single column on mobile: `grid-cols-1`
- All spans reset to full width
- No negative margin overlaps
- Gap increases to `gap-8`

- [ ] **Step 5: Test and commit**

Verify:
- Bento grid layout works
- Cards stagger in on scroll
- Hover effects work
- Mobile layout collapses correctly

```bash
git add src/components/Work.tsx
git commit -m "feat: add work section with asymmetric bento grid"
```

---

## Task 7: Services Section

**Files:**
- Create: `src/components/Services.tsx`

**Context:** Design spec Section 4.4 (Services — "The Offerings")

- [ ] **Step 1: Build services layout**

- Background: `#E8E4DE` (concrete warmth)
- Three full-width service blocks stacked vertically
- Massive vertical spacing: `py-32` between each
- Asymmetric split: text left ~70%, shape right ~30%
- Full-width text on mobile, shapes hidden

- [ ] **Step 2: Add service blocks**

Service 1: "Product Design"
- Description: "Interfaces that don't just look good — they convert, retain, and delight."
- Shape: Rotating wireframe cube

Service 2: "Brand Identity"
- Description: "Visual systems that tell your story before a single word is read."
- Shape: Abstract typographic glyph (CSS)

Service 3: "Web Experiences"
- Description: "Websites that feel like products. Performance, accessibility, and wow factor — all included."
- Shape: Cursor arrow icon

- [ ] **Step 3: Implement hover interactions**

On hover over service block:
- Title shifts right: `translateX(16px)`
- Horizontal line draws under title: `scaleX(0)` → `scaleX(1)`
- Shape accelerates rotation
- Duration: 700ms, ease-primary

- [ ] **Step 4: Add CTA block**

- Background: `#0A0A0A`
- Text: "Got a project that scares other designers? That's my sweet spot."
- CTA: "Start a Conversation" — large nested button
- Email link: mailto:youseefkhald@gmail.com

- [ ] **Step 5: Test and commit**

Verify:
- Service blocks stack correctly
- Hover animations work
- CTA button links to email
- Responsive on mobile

```bash
git add src/components/Services.tsx
git commit -m "feat: add services section with hover interactions and CTA"
```

---

## Task 8: Footer Section

**Files:**
- Create: `src/components/Footer.tsx`

**Context:** Design spec Section 4.5 (Footer — "The Last Impression")

- [ ] **Step 1: Build footer layout**

- Background: `#0A0A0A`
- Full viewport height: `min-h-[100dvh]`
- Curtain reveal effect: footer is `position: sticky; bottom: 0; z-index: -1`
- Previous section scrolls up to reveal footer underneath
- Scanlines overlay

- [ ] **Step 2: Add content**

- Headline: "Let's make something that breaks the internet." — massive Bebas Neue
- Name: "Yousef Designs" — large display
- Email: "youseefkhald@gmail.com" — mono font, hover accent color
- Location: "Cairo, Egypt"
- Portfolio link: "framer.com/yousefkhaled"

- [ ] **Step 3: Add social links**

- LinkedIn, Dribbble, Behance, GitHub
- Horizontal row, tiny text + icons (Phosphor)
- Hover: link slides up, name reveals
- Use real social URLs or placeholder #

- [ ] **Step 4: Add back to top**

- Circular button, subtle pulse animation
- Scrolls to top smoothly

- [ ] **Step 5: Add copyright**

- "© 2026 Yousef Khaled. Built with chaos and caffeine. Cairo, Egypt."
- Mono font, small, muted

- [ ] **Step 6: Test and commit**

Verify:
- Footer reveals with curtain effect
- Scanlines visible
- Social links hover correctly
- Back to top works

```bash
git add src/components/Footer.tsx
git commit -m "feat: add cinematic footer with curtain reveal and scanlines"
```

---

## Task 9: Main Page Assembly

**Files:**
- Modify: `src/app/page.tsx`

**Context:** Design spec Section 4 (all sections)

- [ ] **Step 1: Compose all sections**

Import and render in order:
1. Navbar
2. Hero
3. About
4. Work
5. Services
6. Footer

- [ ] **Step 2: Add section IDs**

Each section needs an ID for navbar anchor links:
- Hero: no ID (top of page)
- About: id="about"
- Work: id="work"
- Services: id="services"
- Footer: id="contact"

- [ ] **Step 3: Test full page flow**

Verify:
- All sections render
- Navbar links scroll to correct sections
- Animations trigger at right times
- Page flows smoothly from top to bottom
- No console errors

- [ ] **Step 4: Build and deploy check**

Run `npm run build` and verify:
- No build errors
- Static export works if needed

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble main page with all sections"
```

---

## Task 10: Polish & Final Review

**Files:**
- Modify: Any files needing fixes

**Context:** Design spec Section 7 (Technical Requirements), Section 8 (Anti-Patterns)

- [ ] **Step 1: Performance audit**

- Check bundle size
- Verify images are optimized
- Ensure animations use only transform/opacity
- No layout-triggering animations

- [ ] **Step 2: Accessibility check**

- All images have alt text
- Focus states visible
- Color contrast meets WCAG AA
- Respect `prefers-reduced-motion`
- Semantic HTML structure

- [ ] **Step 3: Responsive testing**

- Mobile (< 768px): single column, hidden decorative elements
- Tablet (768px - 1024px): 2-column grids
- Desktop (> 1024px): full asymmetric layouts
- Test touch targets (min 44x44px)

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "polish: performance, accessibility, and responsive fixes"
```

---

## Spec Coverage Checklist

| Spec Section | Task | Status |
|---|---|---|
| 2. Global Design Tokens | Task 1 | ⬜ |
| 3.1 Double-Bezel Card | Task 5 | ⬜ |
| 3.2 Nested CTA Button | Task 3, 7 | ⬜ |
| 3.3 Eyebrow Badge | Task 1 | ⬜ |
| 3.4 Project Card | Task 5 | ⬜ |
| 3.5 Fluid Island Nav | Task 2 | ⬜ |
| 4.1 Hero | Task 3 | ⬜ |
| 4.2 About | Task 4 | ⬜ |
| 4.3 Work | Task 6 | ⬜ |
| 4.4 Services | Task 7 | ⬜ |
| 4.5 Footer | Task 8 | ⬜ |
| 5. Global Interactions | Tasks 3, 4, 6, 8 | ⬜ |
| 6. Assets & Content | Tasks 4, 6, 8 | ⬜ |
| 7. Technical Requirements | Task 10 | ⬜ |
| 8. Anti-Patterns | All tasks | ⬜ |
