# Phase 1A: Project Initialization & Design System ✅ COMPLETE

**Parent plan**: [implementation_plan.md](file:///c:/Users/Lenovo/OneDrive%20-%20National%20University%20of%20Singapore/Desktop/what-to-insure/.planning/implementation_plan.md)
**Estimated effort**: 1 session
**Dependencies**: None — this is the starting point
**Assignable to**: Any agent

---

## Goal

Initialize the Next.js project with App Router, establish the complete design system (CSS custom properties, typography, color palette, spacing scale, responsive breakpoints), set up the folder structure, configure fonts, create the root layout with SEO metadata, and create placeholder route pages so subsequent phases have a working scaffold to build on.

---

## Context for Agents

This is the very first phase of **WhatToInsure** — a free, unbiased, Singapore-focused insurance advisory web app. The full architecture, data models, and phase breakdown are documented in the parent implementation plan linked above. You do **not** need to build any UI components or business logic in this phase — only the project scaffold and design tokens.

### Key Design Decisions (from parent plan)

| Decision | Value |
|---|---|
| Framework | Next.js with App Router |
| Styling | Vanilla CSS with CSS Modules (no Tailwind) |
| Typography | Google Font `Inter` (body) + `Outfit` (headings) |
| Color palette | Primary blue (#1A56DB → #3B82F6), accent teal (#059669 → #10B981), neutral grays |
| Design feel | Clean fintech (Endowus/Syfe/StashAway inspired), calm blues/greens, lots of whitespace |
| Responsive | Mobile-first: 375px, 768px, 1024px, 1280px breakpoints |
| Deployment target | Vercel |

---

## Tasks

### 1. Initialize Next.js Project

> [!IMPORTANT]
> The project must be initialized **in the existing repo root** (`what-to-insure/`), not in a new subdirectory. Use `./` as the target directory.

**Steps:**

1. Run `npx create-next-app@latest --help` to check available flags
2. Initialize with: `npx -y create-next-app@latest ./ --js --app --no-tailwind --eslint --src-dir --import-alias "@/*"` (adjust flags based on `--help` output — the key requirements are: JavaScript, App Router, no Tailwind, `src/` directory)
3. Verify the project starts with `npm run dev`

**Expected output:**
```
what-to-insure/
├── src/
│   └── app/
│       ├── layout.js
│       ├── page.js
│       ├── page.module.css
│       └── globals.css
├── public/
├── package.json
├── next.config.mjs (or .js)
├── jsconfig.json
└── ...
```

---

### 2. Set Up Folder Structure

Create the following empty directories to establish the project architecture. These will be populated in this and subsequent phases.

```
src/
├── app/
│   ├── questionnaire/          # Phase 2
│   ├── results/                # Phase 4
│   └── learn/                  # Phase 5
│       └── [slug]/
├── components/
│   ├── ui/                     # Phase 1B
│   ├── layout/                 # Phase 1B
│   ├── landing/                # Phase 5
│   ├── questionnaire/          # Phase 2
│   └── results/                # Phase 4
├── lib/
│   ├── engine/                 # Phase 3
│   ├── constants/              # Phase 3
│   ├── utils/                  # Phase 2
│   └── pdf/                    # Phase 4
├── content/
│   └── articles/               # Phase 5
└── hooks/                      # Phase 2
```

Create a `.gitkeep` file in each empty directory so they are tracked by Git.

---

### 3. Design System — `globals.css`

This is the **most critical deliverable** of Phase 1A. The entire app's visual identity flows from these tokens.

Replace the default `src/app/globals.css` with a comprehensive design system containing:

#### 3.1 CSS Reset & Base Styles

```css
/* ==========================================
   WhatToInsure Design System
   ========================================== */

/* --- Reset --- */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
}

img, video, svg {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font: inherit;
}

ul, ol {
  list-style: none;
}
```

#### 3.2 Color Palette

Define as CSS custom properties on `:root`. Include both light theme values and a `@media (prefers-color-scheme: dark)` override as a nice-to-have.

```css
:root {
  /* --- Primary Blue (trust, professionalism) --- */
  --color-primary-50:  #EBF2FF;
  --color-primary-100: #D6E4FF;
  --color-primary-200: #ADC8FF;
  --color-primary-300: #84ADFF;
  --color-primary-400: #5B91FF;
  --color-primary-500: #3B82F6;   /* Main primary */
  --color-primary-600: #1A56DB;   /* Primary dark */
  --color-primary-700: #1444B0;
  --color-primary-800: #0E3386;
  --color-primary-900: #08215C;

  /* --- Accent Teal/Green (growth, health, positivity) --- */
  --color-accent-50:  #ECFDF5;
  --color-accent-100: #D1FAE5;
  --color-accent-200: #A7F3D0;
  --color-accent-300: #6EE7B7;
  --color-accent-400: #34D399;
  --color-accent-500: #10B981;    /* Main accent */
  --color-accent-600: #059669;    /* Accent dark */
  --color-accent-700: #047857;
  --color-accent-800: #065F46;
  --color-accent-900: #064E3B;

  /* --- Neutral Grays --- */
  --color-gray-50:  #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;

  /* --- Semantic Colors --- */
  --color-success-50:  #F0FDF4;
  --color-success-500: #22C55E;
  --color-success-700: #15803D;

  --color-warning-50:  #FFFBEB;
  --color-warning-500: #F59E0B;
  --color-warning-700: #B45309;

  --color-danger-50:  #FEF2F2;
  --color-danger-500: #EF4444;
  --color-danger-700: #B91C1C;

  --color-info-50:  #EFF6FF;
  --color-info-500: #3B82F6;
  --color-info-700: #1D4ED8;

  /* --- Semantic Mappings --- */
  --color-bg-primary:    #FFFFFF;
  --color-bg-secondary:  var(--color-gray-50);
  --color-bg-tertiary:   var(--color-gray-100);
  --color-bg-elevated:   #FFFFFF;

  --color-text-primary:   var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-tertiary:  var(--color-gray-400);
  --color-text-inverse:   #FFFFFF;
  --color-text-link:      var(--color-primary-600);

  --color-border-primary:   var(--color-gray-200);
  --color-border-secondary: var(--color-gray-100);
  --color-border-focus:     var(--color-primary-500);
}
```

#### 3.3 Typography Scale

```css
:root {
  /* --- Font Families --- */
  --font-heading: 'Outfit', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;

  /* --- Font Sizes (fluid/responsive) --- */
  --text-xs:    0.75rem;    /* 12px */
  --text-sm:    0.875rem;   /* 14px */
  --text-base:  1rem;       /* 16px */
  --text-lg:    1.125rem;   /* 18px */
  --text-xl:    1.25rem;    /* 20px */
  --text-2xl:   1.5rem;     /* 24px */
  --text-3xl:   1.875rem;   /* 30px */
  --text-4xl:   2.25rem;    /* 36px */
  --text-5xl:   3rem;       /* 48px */
  --text-6xl:   3.75rem;    /* 60px */

  /* --- Font Weights --- */
  --font-normal:    400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;
  --font-extrabold: 800;

  /* --- Line Heights --- */
  --leading-none:    1;
  --leading-tight:   1.25;
  --leading-snug:    1.375;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
  --leading-loose:   2;

  /* --- Letter Spacing --- */
  --tracking-tight:  -0.025em;
  --tracking-normal: 0;
  --tracking-wide:   0.025em;
}

/* --- Heading defaults --- */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

h1 { font-size: var(--text-4xl); }
h2 { font-size: var(--text-3xl); }
h3 { font-size: var(--text-2xl); }
h4 { font-size: var(--text-xl); }
h5 { font-size: var(--text-lg); }
h6 { font-size: var(--text-base); }

@media (min-width: 768px) {
  h1 { font-size: var(--text-5xl); }
  h2 { font-size: var(--text-4xl); }
  h3 { font-size: var(--text-3xl); }
}

p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}
```

#### 3.4 Spacing Scale

```css
:root {
  /* --- Spacing (4px base) --- */
  --space-0:   0;
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */
}
```

#### 3.5 Shadows, Radii, Transitions

```css
:root {
  /* --- Border Radius --- */
  --radius-sm:   0.375rem;  /* 6px */
  --radius-md:   0.5rem;    /* 8px */
  --radius-lg:   0.75rem;   /* 12px */
  --radius-xl:   1rem;      /* 16px */
  --radius-2xl:  1.5rem;    /* 24px */
  --radius-full: 9999px;

  /* --- Shadows --- */
  --shadow-xs:  0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm:  0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* --- Focus ring --- */
  --ring-width: 3px;
  --ring-color: rgba(59, 130, 246, 0.5);
  --ring-offset: 2px;

  /* --- Transitions --- */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base:   200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow:   300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* --- Z-Index Scale --- */
  --z-dropdown:  1000;
  --z-sticky:    1020;
  --z-fixed:     1030;
  --z-modal:     1040;
  --z-popover:   1050;
  --z-tooltip:   1060;
  --z-toast:     1070;

  /* --- Layout --- */
  --container-max-width: 1200px;
  --container-padding:   var(--space-4);
  --navbar-height:       72px;
}

@media (min-width: 768px) {
  :root {
    --container-padding: var(--space-8);
  }
}

@media (min-width: 1280px) {
  :root {
    --container-padding: var(--space-12);
  }
}
```

#### 3.6 Utility Classes (minimal set)

```css
/* --- Focus ring utility --- */
.focus-ring:focus-visible {
  outline: var(--ring-width) solid var(--ring-color);
  outline-offset: var(--ring-offset);
}

/* --- Screen reader only --- */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

### 4. Font Loading

Load `Inter` and `Outfit` from Google Fonts via Next.js `next/font/google` in the root layout.

```js
// src/app/layout.js
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});
```

Apply the font variables to the `<html>` or `<body>` element, and update `globals.css` to reference them:

```css
:root {
  --font-heading: var(--font-outfit), 'Outfit', system-ui, sans-serif;
  --font-body:    var(--font-inter), 'Inter', system-ui, sans-serif;
}
```

---

### 5. Root Layout (`src/app/layout.js`)

Create the root layout with:

```js
export const metadata = {
  title: {
    default: 'WhatToInsure — Free Insurance Advice for Singaporeans',
    template: '%s | WhatToInsure',
  },
  description:
    'Get free, unbiased, personalized insurance recommendations tailored to your life situation. No sales pitch. No hidden agenda. Built for Singapore.',
  keywords: [
    'insurance advice singapore',
    'insurance calculator',
    'medishield life',
    'critical illness coverage',
    'term life insurance singapore',
    'financial planning singapore',
  ],
  openGraph: {
    title: 'WhatToInsure — Free Insurance Advice for Singaporeans',
    description:
      'Get free, unbiased, personalized insurance recommendations. No sales pitch.',
    type: 'website',
    locale: 'en_SG',
    siteName: 'WhatToInsure',
  },
};
```

The layout should:
- Import and apply `globals.css`
- Apply font CSS variables from `next/font/google` to `<html>`
- Set `lang="en"` on `<html>`
- Wrap children in a `<main>` tag (Navbar and Footer will be added in Phase 1B)
- Include a basic legal disclaimer `<meta>` or comment for later expansion

---

### 6. Placeholder Route Pages

Create minimal placeholder pages for each route so the routing structure is established and navigable. Each page should render a simple heading indicating the page name — **no component imports or complex markup**.

| Route | File | Heading |
|---|---|---|
| `/` | `src/app/page.js` | "WhatToInsure — Home" |
| `/questionnaire` | `src/app/questionnaire/page.js` | "Insurance Questionnaire" |
| `/results` | `src/app/results/page.js` | "Your Recommendations" |
| `/learn` | `src/app/learn/page.js` | "Learn About Insurance" |
| `/learn/[slug]` | `src/app/learn/[slug]/page.js` | "Article: {slug}" |

Each placeholder should:
- Export a default React component
- Set page-level metadata via `export const metadata`
- Render a centered heading with basic styling using design tokens
- Include a "Coming Soon" or "Under Construction" note

---

### 7. Configure `next.config.mjs`

Ensure the Next.js config:
- Has no unnecessary experimental features
- Has image optimization configured (for future use)
- Has any needed redirects/rewrites placeholder

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,
};

export default nextConfig;
```

---

### 8. Update `README.md`

Replace the single-line README with a proper project README:

```markdown
# WhatToInsure

Free, unbiased, personalized insurance advice for Singaporeans.

## About

WhatToInsure helps you understand what insurance coverage you actually need
based on your personal situation — without the sales pitch.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Development
\```bash
npm install
npm run dev
\```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Vanilla CSS with CSS Modules
- **Deployment**: Vercel

## License
[TBD]
```

---

## Files to Create/Modify

| Action | File | Description |
|--------|------|-------------|
| [MODIFY] | `package.json` | Generated by create-next-app |
| [MODIFY] | `next.config.mjs` | Minimal configuration |
| [MODIFY] | `README.md` | Project documentation |
| [NEW] | `src/app/globals.css` | Complete design system (replaces default) |
| [NEW] | `src/app/layout.js` | Root layout with fonts, metadata (replaces default) |
| [NEW] | `src/app/page.js` | Home placeholder (replaces default) |
| [NEW] | `src/app/questionnaire/page.js` | Questionnaire placeholder |
| [NEW] | `src/app/results/page.js` | Results placeholder |
| [NEW] | `src/app/learn/page.js` | Learn hub placeholder |
| [NEW] | `src/app/learn/[slug]/page.js` | Article placeholder |
| [NEW] | `src/components/ui/.gitkeep` | Directory placeholder |
| [NEW] | `src/components/layout/.gitkeep` | Directory placeholder |
| [NEW] | `src/components/landing/.gitkeep` | Directory placeholder |
| [NEW] | `src/components/questionnaire/.gitkeep` | Directory placeholder |
| [NEW] | `src/components/results/.gitkeep` | Directory placeholder |
| [NEW] | `src/lib/engine/.gitkeep` | Directory placeholder |
| [NEW] | `src/lib/constants/.gitkeep` | Directory placeholder |
| [NEW] | `src/lib/utils/.gitkeep` | Directory placeholder |
| [NEW] | `src/lib/pdf/.gitkeep` | Directory placeholder |
| [NEW] | `src/content/articles/.gitkeep` | Directory placeholder |
| [NEW] | `src/hooks/.gitkeep` | Directory placeholder |

---

## Verification Plan

### Automated Checks
```bash
# Project starts without errors
npm run dev

# Build succeeds
npm run build

# Lint passes
npm run lint
```

### Manual Verification
1. **Dev server**: `npm run dev` starts on `localhost:3000` without errors
2. **All routes work**: Navigate to `/`, `/questionnaire`, `/results`, `/learn`, `/learn/test-slug` — each renders its placeholder heading
3. **Design tokens applied**: Placeholder pages use correct fonts (Inter/Outfit), colors, and spacing from design tokens
4. **Responsive**: Resize browser from 375px to 1440px — no horizontal overflow, spacing adapts
5. **Font loading**: Verify Inter and Outfit load correctly (check Network tab for font files)
6. **CSS custom properties**: Inspect `:root` in browser DevTools — all design tokens are present
7. **No console errors**: Browser console is clean (no React warnings, no CSS errors)

---

## Handoff Notes for Phase 1B

After this phase completes, Phase 1B should pick up with:
- The design system tokens in `globals.css` — use these tokens everywhere, do not hardcode values
- The font CSS variables `--font-inter` and `--font-outfit` — already loaded and mapped
- The folder structure — create components in the designated directories
- The placeholder pages — replace them with actual content as components are built

> [!IMPORTANT]
> **Do not modify `globals.css` design tokens** in Phase 1B unless absolutely necessary. The token values were designed as a cohesive system. If you need a new token, add it — don't change existing ones.
