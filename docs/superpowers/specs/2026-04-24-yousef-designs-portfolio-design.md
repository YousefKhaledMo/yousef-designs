# Yousef Designs — Portfolio Landing Page Design Spec

**Date:** 2026-04-24  
**Status:** Approved  
**Designer:** Yousef Khaled  
**Project:** yousef-designs-portfolio  
**Tech Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion

---

## 1. Design Context

### Users
- Tech startups & SaaS founders seeking product designers
- Creative agencies looking for versatile collaborators
- Direct clients (small business, personal brands) needing branding/web design
- Mixed audience — portfolio must appeal to all three

### Brand Personality
**Experimental, Avant-Garde, Raw**

Voice: Unapologetic, confident, boundary-pushing.  
Tone: Bold but not arrogant. Experimental but not unusable.  
Emotional goals: Inspire confidence, demonstrate technical mastery, leave a lasting impression.

### Aesthetic Direction
- **Vibe Archetype:** Raw Structuralism meets Editorial Brutalism
- **Layout Archetype:** Asymmetrical Bento with Z-Axis depth overlaps
- **Theme:** Predominantly dark with stark light sections for contrast
- **Differentiation:** Fractured typography, physical card overlaps, color inversion transitions

### Design Principles
1. **Never safe** — Every element should feel intentional and slightly unexpected
2. **Physical depth** — Cards, buttons, and containers feel like real objects with nested architecture
3. **Violent contrast** — Sharp background color inversions create page-turning moments
4. **Typography as image** — Text is not just readable, it's a visual element
5. **Restraint with accents** — Electric coral (#FF4D2E) used sparingly; when it appears, it dominates
6. **Motion with mass** — All animations use spring-like physics, never linear transitions

---

## 2. Global Design Tokens

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0A0A0A` | Primary dark background (hero, work, footer) |
| `--bg-secondary` | `#F5F2ED` | Warm off-white (about section) |
| `--bg-tertiary` | `#E8E4DE` | Concrete warmth (services section) |
| `--text-primary-dark` | `#0A0A0A` | Text on light backgrounds |
| `--text-primary-light` | `#F5F2ED` | Text on dark backgrounds |
| `--text-muted-dark` | `rgba(10,10,10,0.5)` | Secondary text on light |
| `--text-muted-light` | `rgba(245,242,237,0.5)` | Secondary text on dark |
| `--accent` | `#FF4D2E` | Electric coral — accents only |
| `--border-light` | `rgba(245,242,237,0.08)` | Hairline borders on dark |
| `--border-dark` | `rgba(10,10,10,0.08)` | Hairline borders on light |

**Rules:**
- No pure black (#000) or pure white (#fff)
- No gradient text (background-clip: text is BANNED)
- No gray text on colored backgrounds — use tinted neutrals
- Accent color covers max 10% of visual weight

### Typography
| Role | Font | Weight | Usage |
|---|---|---|---|
| Display | `Clash Display` | 600-700 | Hero name, section headings, service titles |
| Body | `Satoshi` | 400-500 | Paragraphs, descriptions, UI text |
| Mono | `JetBrains Mono` | 400 | Labels, tags, eyebrow badges, metadata |

**Type Scale (fluid with clamp):**
```
--text-hero: clamp(6rem, 15vw, 18rem);     /* Hero name */
--text-display: clamp(3rem, 8vw, 8rem);    /* Section headings */
--text-title: clamp(1.5rem, 3vw, 3rem);    /* Card titles */
--text-body: clamp(1rem, 1.2vw, 1.25rem);  /* Body paragraphs */
--text-caption: 0.75rem;                    /* Labels, metadata */
--text-micro: 0.625rem;                     /* Eyebrow badges */
```

**Line Heights:**
- Display: 0.9 (tight, impactful)
- Headings: 1.0
- Body: 1.6 (generous, readable)
- Captions: 1.4

**Font Loading Strategy:**
- Self-host via `@font-face` for performance
- Use `font-display: swap`
- Preload Display font (critical for hero)

### Spacing Scale
```
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 0.75rem;   /* 12px */
--space-lg: 1rem;      /* 16px */
--space-xl: 1.5rem;    /* 24px */
--space-2xl: 2rem;     /* 32px */
--space-3xl: 3rem;     /* 48px */
--space-4xl: 4rem;     /* 64px */
--space-5xl: 6rem;     /* 96px */
--space-6xl: 8rem;     /* 128px */
--space-7xl: 12rem;    /* 192px */
```

**Section Padding:** Minimum `py-24` (96px), typically `py-32` to `py-40` for major sections.

### Motion Tokens
```
--ease-primary: cubic-bezier(0.32, 0.72, 0, 1);  /* Spring-like deceleration */
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--duration-fast: 300ms;
--duration-normal: 500ms;
--duration-slow: 700ms;
--duration-dramatic: 900ms;
```

**Motion Rules:**
- Animate ONLY `transform` and `opacity`
- NO animating width, height, top, left, margin, padding
- Use `will-change: transform` sparingly on actively animating elements
- Respect `prefers-reduced-motion` — disable non-essential animations

### Border Radius
```
--radius-sm: 0.5rem;     /* 8px — small elements */
--radius-md: 1rem;       /* 16px — cards, buttons */
--radius-lg: 1.5rem;     /* 24px — large cards */
--radius-xl: 2rem;       /* 32px — hero containers */
--radius-full: 9999px;   /* Pills, circles */
```

---

## 3. Component Architecture

### 3.1 Double-Bezel Card (Doppelrand)
A nested two-layer container that mimics physical machined hardware.

**Structure:**
```
<OuterShell>    /* bg-black/5, ring-1 ring-white/10, p-1.5, rounded-[2rem] */
  <InnerCore>   /* bg-[#111], shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)], rounded-[calc(2rem-0.375rem)] */
    <Content />
  </InnerCore>
</OuterShell>
```

**Variations:**
- Light variant: Outer uses `bg-white/5`, `ring-black/5`, Inner uses `bg-[#F5F2ED]`
- Accent variant: Inner border uses accent color at low opacity

### 3.2 Nested CTA Button
**Structure:**
```
<button class="rounded-full px-6 py-3 flex items-center gap-3">
  <span>Label</span>
  <span class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
    <ArrowIcon />
  </span>
</button>
```

**Hover Physics:**
- Button scales down slightly: `active:scale-[0.98]`
- Inner icon circle translates diagonally: `group-hover:translate-x-1 group-hover:-translate-y-[1px]`
- Transition: `all 700ms cubic-bezier(0.32, 0.72, 0, 1)`

### 3.3 Eyebrow Badge
```
<span class="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-mono">
  LABEL
</span>
```

**Variants:**
- Dark bg: `bg-white/5 text-white/60`
- Light bg: `bg-black/5 text-black/60`
- Accent: `bg-accent/10 text-accent`

### 3.4 Project Card
**Structure:**
```
<article class="relative group">
  <DoubleBezel>
    <div class="relative overflow-hidden">
      <Image class="transition-all duration-700 ease-[var(--ease-primary)] grayscale group-hover:grayscale-0 group-hover:scale-105" />
      <Overlay class="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  </DoubleBezel>
  <Title class="absolute bottom-4 left-4 text-2xl font-display" />
  <Tag class="absolute top-4 right-4" />
  <Year class="absolute bottom-4 right-4 font-mono text-xs opacity-50" />
</article>
```

### 3.5 Fluid Island Navigation
**Closed State:**
```
<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-white/5 rounded-full px-6 py-3 border border-white/10">
  <Logo /> <Links /> <MenuToggle />
</nav>
```

**Open State (Mobile/Expanded):**
- Full-screen overlay: `fixed inset-0 backdrop-blur-3xl bg-black/90`
- Links stagger in: `translate-y-12 opacity-0` → `translate-y-0 opacity-100` with delay-100, 200, 300
- Hamburger morphs to X via rotation transforms

---

## 4. Section Specifications

### 4.1 Hero — "The Fractured Introduction"

**Background:** `#0A0A0A` with 1px grid overlay at 8% opacity  
**Height:** `min-h-[100dvh]` (not `100vh` — prevents iOS Safari jumping)  
**Padding:** `px-4 md:px-8 lg:px-16`

**Layout:**
- Full viewport, centered content
- Name "Yousef" fractured across viewport — letters positioned at slight offsets and rotations
- "Designs" below in lighter weight, smaller scale
- Thin grid overlay visible at low opacity

**Elements:**

| Element | Content | Style |
|---|---|---|
| Name (Primary) | "Yousef" | `font-display`, `font-weight: 700`, `font-size: var(--text-hero)`, scattered letters |
| Name (Secondary) | "Designs" | `font-display`, `font-weight: 400`, `font-size: clamp(2rem, 5vw, 4rem)` |
| Tagline | "I break conventions to build digital experiences that people remember." | `font-body`, `max-width: 40ch`, `opacity: 0.7` |
| CTA | "Explore Work" | Nested CTA Button, accent color |
| Grid Overlay | Construction lines | `1px solid rgba(255,255,255,0.08)`, covers full viewport |

**Interactions:**
- **Magnetic Text Repulsion:** Letters gently push away from cursor on hover using CSS transforms (`:hover` state, no continuous JS tracking)
- **Pulsing Dot:** The "o" in Yousef contains a small dot that pulses gently (scale animation, 2s loop)
- **Load Animation:** Letters stagger in from random positions with blur-to-sharp transition over 1.2s

**Mobile:**
- Letters stack vertically or in 2 rows
- Grid overlay hidden (performance)
- CTA becomes full-width

---

### 4.2 About — "The Manifesto"

**Background:** `#F5F2ED` with subtle paper grain texture overlay (fixed, pointer-events-none, opacity 0.03)  
**Transition:** Sharp color inversion from hero — no gradient, instant flip  
**Padding:** `py-32 md:py-40 px-4 md:px-8 lg:px-16`

**Layout (Desktop):**
- Asymmetric 60/40 split
- Left 60%: Massive text block
- Right 40%: Floating rotating geometric shape (wireframe polygon), `position: sticky`, slow rotation

**Elements:**

| Element | Content | Style |
|---|---|---|
| Eyebrow | "ABOUT" | Eyebrow Badge, dark variant |
| Heading | (Implied by layout) | — |
| Manifesto | "Lawyer turned designer. I don't do safe. I take brands apart and rebuild them into experiences that demand attention. From product interfaces to full brand systems — Google UX certified, CalArts trained, and built on chaos." | `font-body`, `font-size: var(--text-title)`, `line-height: 1.3`, `font-weight: 500` |
| Highlight Words | "safe", "templates", "attention" | `color: var(--accent)`, `font-weight: 700` |
| Client Ticker | [Client names/logos] | Infinite horizontal scroll, monochrome, `opacity: 0.3` |

**Scroll Animation:**
- Manifesto text reveals **word-by-word** as it enters viewport
- Each word: `opacity: 0, translateY(20px)` → `opacity: 1, translateY(0)`
- Stagger: 30ms per word
- Trigger: IntersectionObserver at 20% visibility

**Mobile:**
- Full-width text, no asymmetric split
- Geometric shape hidden
- Ticker remains but slower speed

---

### 4.3 Work — "The Living Archive"

**Background:** `#0A0A0A`  
**Padding:** `py-32 md:py-40 px-4 md:px-8 lg:px-16`

**Layout:**
- Asymmetric bento grid: `grid-template-columns: repeat(12, 1fr)` with varying spans
- Cards overlap with negative margins (`-mt-8`, `-ml-4` on some cards)
- Gap: `gap-4 md:gap-6`

**Project Card Grid Structure:**
```
[  Card 1 (col-span-8, row-span-2)  ] [ Card 2 (col-span-4) ]
                                      [ Card 3 (col-span-4) ]
[  Card 4 (col-span-5)  ] [  Card 5 (col-span-7, row-span-2)  ]
```

**Card Specs:**
- All cards use Double-Bezel architecture
- Images: Aspect ratio varies (16:9 for wide, 3:4 for tall, 1:1 for square)
- Default: `grayscale(100%)`, hover: `grayscale(0%)`
- Hover: Card lifts `translateY(-8px)`, image scales `1.05`, overlay fades in

**Project Data Structure:**
```typescript
interface Project {
  id: string;
  title: string;
  category: "UI/UX" | "Brand" | "Web";
  year: string;
  image: string;
  span: { cols: number; rows: number };
}
```

**Real Projects:**
1. "The Math Mentor" — Brand Identity — 2025 — col-span-8, row-span-2 — Complete brand system including logo, color palette, business cards, and brand guidelines for an educational platform
2. "Teacher Flow" — Product Design — 2025 — col-span-5, row-span-1 — All-in-one Notion template for teachers to manage lessons, students, attendance, payments, and tasks
3. "Outline" — Brand Identity — 2023 — col-span-7, row-span-2 — Full brand identity for a construction/engineering company including logo, stationery, and style guide

**Scroll Animation:**
- Cards stagger in with heavy fade-up:
  - Start: `translateY(64px), blur(8px), opacity: 0`
  - End: `translateY(0), blur(0), opacity: 1`
  - Duration: 900ms
  - Stagger: 100ms per card
- Trigger: IntersectionObserver at 10% visibility

**Mobile:**
- Single column: `grid-cols-1`
- All spans reset to full width
- No negative margin overlaps
- Gap increases to `gap-8`
- Hover effects become tap-active states

---

### 4.4 Services — "The Offerings"

**Background:** `#E8E4DE`  
**Padding:** `py-32 md:py-40 px-4 md:px-8 lg:px-16`

**Layout:**
- Stacked full-width blocks with massive vertical spacing (`py-32` between each)
- Each block: asymmetric split (text left ~70%, shape right ~30%)

**Service Blocks:**

**1. Product Design**
- Title: "Product Design" — `font-display`, `var(--text-display)`
- Description: "Interfaces that don't just look good — they convert, retain, and delight."
- Shape: Wireframe cube, slow rotation

**2. Brand Identity**
- Title: "Brand Identity"
- Description: "Visual systems that tell your story before a single word is read."
- Shape: Abstract typographic glyph

**3. Web Experiences**
- Title: "Web Experiences"
- Description: "Websites that feel like products. Performance, accessibility, and wow factor — all included."
- Shape: Cursor arrow icon

**Interactions:**
- Hover over service block:
  - Title shifts right: `translateX(16px)`
  - Horizontal line draws itself from left to right under title (`scaleX(0)` → `scaleX(1)`)
  - Shape accelerates rotation
  - Duration: 700ms, ease-primary

**CTA Block (below services):**
- Background: `#0A0A0A`
- Padding: `py-24 px-4 md:px-8`
- Text: "Got a project that scares other designers? That's my sweet spot."
- CTA: "Start a Conversation" — large nested button, accent color

**Mobile:**
- Text full-width, shapes hidden
- Line animations simplified
- CTA full-width

---

### 4.5 Footer — "The Last Impression"

**Background:** `#0A0A0A`  
**Height:** `min-h-[100dvh]`  
**Reveal:** Curtain effect — footer is `position: sticky; bottom: 0; z-index: -1`, previous section scrolls up to reveal it  
**Padding:** `py-24 px-4 md:px-8 lg:px-16`

**Elements:**

| Element | Content | Style |
|---|---|---|
| Headline | "Let's make something that breaks the internet." | `font-display`, `var(--text-display)`, centered |
| Name | "Yousef Designs" | `font-display`, `clamp(2rem, 5vw, 4rem)`, centered |
| Email | "youseefkhald@gmail.com" | `font-mono`, `var(--text-body)`, no underline, hover: `color: var(--accent)` |
| Location | "Cairo, Egypt" | `font-mono`, `var(--text-caption)`, `opacity: 0.5` |
| Portfolio | "framer.com/yousefkhaled" | `font-mono`, hover: `color: var(--accent)` |
| Social Links | LinkedIn, Dribbble, Behance, GitHub | Horizontal row, tiny text + custom light icons |
| Back to Top | Circular button | `w-12 h-12 rounded-full`, subtle pulse animation |
| Scanlines | CRT effect | Fixed overlay, `opacity: 0.05`, horizontal lines |
| Copyright | "© 2026 Yousef Khaled. Built with chaos and caffeine. Cairo, Egypt." | `font-mono`, `var(--text-caption)`, `opacity: 0.4` |

**Social Link Hover:**
- Link slides up: `translateY(-4px)`
- Name text reveals below icon
- Duration: 300ms

**Mobile:**
- Headline slightly smaller
- Social links in 2x2 grid or horizontal scroll
- Scanlines hidden for performance

---

## 5. Global Interactions & Behaviors

### 5.1 Smooth Scrolling
- Use Lenis for buttery smooth scroll (if performance allows)
- Fallback to native `scroll-behavior: smooth`
- Respect `prefers-reduced-motion`

### 5.2 Scroll-Triggered Reveals
- All sections use IntersectionObserver (threshold: 0.1-0.2)
- No `window.addEventListener('scroll')` — performance killer
- Animation classes applied once (no reverse on scroll up)

### 5.3 Cursor Effects
- Hero letters: CSS `:hover` magnetic repulsion (transform translate)
- Work cards: Standard hover lift
- Service blocks: Text shift + line draw
- No custom cursor (keeps it usable, avoids performance issues)

### 5.4 Page Load Sequence
1. **0ms:** Black screen
2. **200ms:** Grid overlay fades in (opacity 0 → 0.08)
3. **400ms:** Hero letters begin staggered entrance (blur + translate)
4. **1200ms:** Tagline and CTA fade in
5. **1600ms:** Navbar slides down

### 5.5 Responsive Breakpoints
| Name | Width | Behavior |
|---|---|---|
| Mobile | < 768px | Single column, hidden decorative elements, full-width CTAs |
| Tablet | 768px – 1024px | 2-column grids, reduced overlaps |
| Desktop | > 1024px | Full asymmetric layouts, all effects active |

**Mobile-First Approach:**
- Design mobile layout first
- Progressive enhancement for desktop
- Touch targets minimum 44x44px

---

## 6. Assets & Content

### 6.1 Images Required
| Asset | Description | Format | Notes |
|---|---|---|---|
| Project 1 | Nexa Finance dashboard | WebP, 16:9 | Desaturated by default |
| Project 2 | Kroma Studio brand | WebP, 4:3 | Desaturated by default |
| Project 3 | Alchemy Shop website | WebP, 4:3 | Desaturated by default |
| Project 4 | Pulse Health app | WebP, 16:9 | Desaturated by default |
| Project 5 | Meridian brand system | WebP, 3:4 | Desaturated by default |

**Image Processing:**
- All images served via Next.js Image component
- Lazy loading for below-fold images
- Placeholder: blur or dominant color

### 6.2 Icons
- Use Phosphor Icons (light weight, thin strokes)
- Arrow icons: Phosphor `ArrowUpRight`
- Social icons: Phosphor brand icons or custom SVGs
- Menu icon: Custom hamburger (2 lines, morphs to X)

### 6.3 Text Content

**Hero:**
- Name: "Yousef"
- Subtitle: "Designs"
- Tagline: "I break conventions to build digital experiences that people remember."
- CTA: "Explore Work"

**About:**
- Eyebrow: "ABOUT"
- Manifesto: "I don't do safe. I don't do templates. I take brands apart and rebuild them into experiences that demand attention. From product interfaces to full brand systems — I operate at the intersection of design and engineering."

**Work:**
- Section Eyebrow: "SELECTED WORK"
- Projects as listed in section 4.3

**Services:**
- Service 1: "Product Design" / "Interfaces that don't just look good — they convert, retain, and delight."
- Service 2: "Brand Identity" / "Visual systems that tell your story before a single word is read."
- Service 3: "Web Experiences" / "Websites that feel like products. Performance, accessibility, and wow factor — all included."
- CTA Text: "Got a project that scares other designers? That's my sweet spot."
- CTA Button: "Start a Conversation"

**Footer:**
- Headline: "Let's make something that breaks the internet."
- Name: "Yousef Designs"
- Email: "hello@yousefdesigns.com"
- Copyright: "© 2026 Yousef Designs. Built with chaos and caffeine."

---

## 7. Technical Requirements

### 7.1 Performance Budget
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total JS bundle: < 150KB (gzipped)

### 7.2 Accessibility (WCAG 2.1 AA)
- All text meets contrast ratios (4.5:1 for body, 3:1 for large text)
- Focus states visible on all interactive elements
- Respect `prefers-reduced-motion` — disable scroll animations, parallax, continuous rotations
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Alt text on all images
- Keyboard navigable

### 7.3 SEO
- Semantic headings (single H1 in hero)
- Meta description: "Yousef Designs — Experimental product design, brand identity, and web experiences for brands that refuse to blend in."
- Open Graph tags for social sharing
- Structured data: Person + CreativeWork

### 7.4 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (React animations), CSS transitions (simple hover states)
- **Fonts:** Self-hosted (Clash Display, Satoshi, JetBrains Mono)
- **Icons:** Phosphor React
- **Images:** Next.js Image component

---

## 8. Anti-Patterns & Bans

The following are **explicitly forbidden** in this design:

| Ban | Pattern | Why |
|---|---|---|
| Gradient text | `background-clip: text` with gradients | Most recognizable AI design tell |
| Side-stripe borders | `border-left: 3px solid color` on cards | Overused admin/dashboard pattern |
| Generic shadows | `box-shadow: 0 4px 6px rgba(0,0,0,0.3)` | Looks cheap, use inset highlights instead |
| Default fonts | Inter, Roboto, Helvetica, Arial | Banned — use distinctive fonts |
| Standard icons | Thick Lucide/FontAwesome icons | Use ultra-light Phosphor instead |
| Sticky top navbar | Edge-to-edge navbar glued to top | Use floating pill instead |
| Symmetrical grids | 3 equal columns of identical cards | Break with asymmetry |
| Linear transitions | `ease-in-out`, `linear` | Use custom cubic-bezier |
| Pure black/white | `#000000`, `#FFFFFF` | Always tint slightly |
| Modals | Pop-up overlays for content | Avoid unless absolutely necessary |
| Glassmorphism everywhere | Blur effects on all cards | Use purposefully, not decoratively |
| Bounce/elastic easing | `cubic-bezier` with overshoot | Feels dated and tacky |

---

## 9. Implementation Order

1. **Setup:** Next.js project, Tailwind v4, fonts, global styles, design tokens
2. **Layout:** Root layout, navbar component, smooth scroll
3. **Hero:** Fractured typography, grid overlay, load animation, magnetic hover
4. **About:** Color transition, manifesto text, word-by-word reveal, client ticker
5. **Work:** Bento grid, project cards, double-bezel, scroll stagger
6. **Services:** Service blocks, hover interactions, CTA block
7. **Footer:** Curtain reveal, scanlines, social links
8. **Polish:** Responsive tweaks, reduced motion, performance audit, accessibility check

---

## 10. Open Questions / Decisions

1. **Project images:** Need actual project screenshots or use high-quality placeholders?
2. **Client ticker:** Real client names or placeholder brands?
3. **Contact form:** Should "Start a Conversation" open a form or just be a mailto link?
4. **Additional pages:** Is this strictly a single landing page, or should project cards link to case study pages?

**Recommendation:** Start with the single landing page. Add case study pages in a future iteration.

---

**Spec Status:** Approved by designer (Yousef Khaled) on 2026-04-24  
**Next Step:** Write implementation plan and begin development
