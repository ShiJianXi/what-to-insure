# Phase 1B: UI Component Library & Layout Shell ✅ COMPLETE

**Parent plan**: [implementation_plan.md](file:///c:/Users/Lenovo/OneDrive%20-%20National%20University%20of%20Singapore/Desktop/what-to-insure/.planning/implementation_plan.md)
**Previous phase**: [Phase 1A — Project Setup & Design System](file:///c:/Users/Lenovo/OneDrive%20-%20National%20University%20of%20Singapore/Desktop/what-to-insure/.planning/phase-1a-project-setup-and-design-system.md)
**Estimated effort**: 1-2 sessions
**Dependencies**: Phase 1A must be complete ✅
**Assignable to**: Any agent
**Completed**: 2026-06-20

---

## Goal

Build the complete reusable UI component library (Button, Card, Input, Select, RadioGroup, Slider, ProgressBar, Tooltip) and layout components (Navbar, Footer, Container) using the design system tokens established in Phase 1A. After this phase, all subsequent phases can import and use these components without building their own.

---

## Context for Agents

Phase 1A established the Next.js project, folder structure, design system tokens (`globals.css`), fonts, and placeholder pages. **All components in this phase must exclusively use the CSS custom properties from `globals.css` — no hardcoded colors, sizes, or spacing values.**

### What Already Exists (from Phase 1A)
- ✅ Next.js project with App Router, running on `localhost:3000`
- ✅ `src/app/globals.css` with complete design system (colors, typography, spacing, shadows, radii, transitions, z-indices)
- ✅ Google Fonts loaded: `Inter` (body, `--font-inter`) and `Outfit` (headings, `--font-outfit`)
- ✅ Root layout at `src/app/layout.js` with metadata and font variables
- ✅ Placeholder pages at `/`, `/questionnaire`, `/results`, `/learn`, `/learn/[slug]`
- ✅ Empty component directories: `src/components/ui/`, `src/components/layout/`

### Design Tokens Quick Reference
Agents should reference these tokens when styling components:

| Token Group | Example Tokens | Usage |
|---|---|---|
| Colors | `--color-primary-500`, `--color-gray-200` | Backgrounds, borders, text |
| Typography | `--text-base`, `--font-body`, `--font-medium` | Font sizes, families, weights |
| Spacing | `--space-4`, `--space-8` | Padding, margin, gaps |
| Radii | `--radius-md`, `--radius-lg` | Border radius |
| Shadows | `--shadow-sm`, `--shadow-md` | Box shadows |
| Transitions | `--transition-base`, `--transition-fast` | Hover/focus transitions |
| Focus | `--ring-width`, `--ring-color` | Focus ring styles |
| Z-Index | `--z-dropdown`, `--z-sticky` | Stacking order |
| Layout | `--container-max-width`, `--navbar-height` | Max widths, fixed heights |

---

## Tasks

### 1. UI Component: Button (`src/components/ui/Button.js`)

A versatile button component with multiple variants, sizes, and states.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `fullWidth` | `boolean` | `false` | Whether button fills container width |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Shows loading spinner, disables interaction |
| `icon` | `ReactNode` | — | Optional icon element (displayed before text) |
| `children` | `ReactNode` | — | Button label |
| `...rest` | — | — | Pass-through HTML button attributes (`onClick`, `type`, etc.) |

#### Styling Specs (`Button.module.css`)

**Primary variant:**
- Background: `--color-primary-600` → hover: `--color-primary-700`
- Text: `--color-text-inverse` (white)
- Shadow: `--shadow-sm` → hover: `--shadow-md`
- Subtle `transform: translateY(-1px)` on hover

**Secondary variant:**
- Background: transparent
- Border: `1px solid --color-border-primary`
- Text: `--color-text-primary`
- Hover: background `--color-gray-50`, border `--color-gray-300`

**Ghost variant:**
- Background: transparent, no border
- Text: `--color-text-secondary`
- Hover: background `--color-gray-100`

**Danger variant:**
- Background: `--color-danger-500` → hover: `--color-danger-700`
- Text: `--color-text-inverse`

**All variants:**
- Font: `--font-body`, `--font-medium`
- Border-radius: `--radius-md`
- Transition: `--transition-base` on background, color, shadow, transform
- Focus: `--ring-width` `--ring-color` outline
- Disabled: `opacity: 0.5`, `cursor: not-allowed`, no hover effects
- Loading: shows a small CSS spinner (keyframe animation), text becomes invisible but still takes up space

**Sizes:**
| Size | Padding | Font size | Min height |
|---|---|---|---|
| `sm` | `--space-2` `--space-3` | `--text-sm` | 36px |
| `md` | `--space-2` `--space-5` | `--text-base` | 44px |
| `lg` | `--space-3` `--space-6` | `--text-lg` | 52px |

---

### 2. UI Component: Card (`src/components/ui/Card.js`)

A container card with elevation and optional hover animation.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` | Card style |
| `hoverable` | `boolean` | `false` | Adds hover lift animation |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `children` | `ReactNode` | — | Card content |
| `className` | `string` | — | Additional CSS class |

#### Styling Specs (`Card.module.css`)

**Elevated variant:**
- Background: `--color-bg-elevated`
- Shadow: `--shadow-sm`
- Border: `1px solid --color-border-secondary`
- Border-radius: `--radius-lg`

**Outlined variant:**
- Background: transparent
- Border: `1px solid --color-border-primary`
- No shadow

**Flat variant:**
- Background: `--color-bg-secondary`
- No border, no shadow

**Hoverable:**
- Transition: `--transition-base` on shadow, transform
- Hover: `--shadow-lg`, `transform: translateY(-2px)`

**Padding:**
| Size | Value |
|---|---|
| `none` | 0 |
| `sm` | `--space-4` |
| `md` | `--space-6` |
| `lg` | `--space-8` |

---

### 3. UI Component: ProgressBar (`src/components/ui/ProgressBar.js`)

A stepped progress bar for the questionnaire wizard.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `currentStep` | `number` | — | Current active step (1-based) |
| `totalSteps` | `number` | — | Total number of steps |
| `labels` | `string[]` | — | Optional labels for each step |
| `onStepClick` | `(step: number) => void` | — | Optional callback when a completed step is clicked |

#### Styling Specs (`ProgressBar.module.css`)

- Horizontal bar with step indicators (circles) connected by lines
- Each step circle: `32px` diameter, `--radius-full`
- **Completed steps**: background `--color-primary-600`, checkmark icon (✓) in white, clickable if `onStepClick` provided
- **Current step**: border `2px solid --color-primary-600`, inner dot `--color-primary-600`, slightly larger ring/pulse animation
- **Future steps**: background `--color-gray-200`, text `--color-text-tertiary`
- Connecting lines: `2px` height, completed segments `--color-primary-600`, future segments `--color-gray-200`
- Labels (if provided): below each circle, `--text-xs`, hidden on mobile (`< 768px`)
- Transition: `--transition-base` on colors to animate step completion

---

### 4. UI Component: Input (`src/components/ui/Input.js`)

A text/number input field with label, helper text, and error state.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Input label |
| `type` | `'text' \| 'number' \| 'email'` | `'text'` | Input type |
| `placeholder` | `string` | — | Placeholder text |
| `value` | `string \| number` | — | Controlled value |
| `onChange` | `(e) => void` | — | Change handler |
| `helperText` | `string` | — | Helper text below input |
| `error` | `string` | — | Error message (replaces helper text, shows error styling) |
| `prefix` | `string` | — | Prefix text inside input (e.g., "S$") |
| `suffix` | `string` | — | Suffix text inside input (e.g., "/month") |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Shows required indicator (*) |
| `id` | `string` | — | HTML id (for accessibility) |

#### Styling Specs (`Input.module.css`)

- **Label**: `--text-sm`, `--font-medium`, `--color-text-primary`, margin-bottom `--space-1`
- Required indicator: `*` in `--color-danger-500`
- **Input field**: full width, padding `--space-3`, border `1px solid --color-border-primary`, `--radius-md`
- Focus: border `--color-border-focus`, ring `--ring-width` `--ring-color`
- Error: border `--color-danger-500`, ring uses danger color
- Disabled: background `--color-gray-100`, `cursor: not-allowed`
- **Prefix/suffix**: inside the input box, `--color-text-tertiary`, `--text-sm`, not editable (use `position: absolute` or flex layout)
- **Helper text**: `--text-xs`, `--color-text-tertiary`, margin-top `--space-1`
- **Error text**: `--text-xs`, `--color-danger-500`, margin-top `--space-1`
- Transition: `--transition-fast` on border, shadow

---

### 5. UI Component: Select (`src/components/ui/Select.js`)

A styled dropdown select with label and error state.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Select label |
| `options` | `Array<{value: string, label: string}>` | — | Options list |
| `value` | `string` | — | Selected value |
| `onChange` | `(e) => void` | — | Change handler |
| `placeholder` | `string` | `'Select...'` | Placeholder option text |
| `error` | `string` | — | Error message |
| `helperText` | `string` | — | Helper text |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required indicator |
| `id` | `string` | — | HTML id |

#### Styling Specs (`Select.module.css`)

- Follow same label/error/helper styling as Input component
- Custom dropdown arrow icon (CSS chevron, not browser default)
- `appearance: none` to remove native styling
- Same border, focus, error, disabled styles as Input
- Placeholder option shown in `--color-text-tertiary`

---

### 6. UI Component: RadioGroup (`src/components/ui/RadioGroup.js`)

A group of radio buttons with support for horizontal and vertical layouts.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Group label |
| `name` | `string` | — | Radio group name |
| `options` | `Array<{value: string, label: string, description?: string}>` | — | Radio options |
| `value` | `string` | — | Selected value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `error` | `string` | — | Error message |
| `required` | `boolean` | `false` | Required indicator |

#### Styling Specs (`RadioGroup.module.css`)

- **Group label**: Same as Input label
- **Radio buttons**: Custom styled (hide native input, use `::before`/`::after` pseudo-elements)
  - Outer circle: `20px`, border `2px solid --color-gray-300`
  - Selected: border `--color-primary-600`, inner dot (10px, `--color-primary-600`), smooth scale transition
  - Hover (unselected): border `--color-gray-400`
  - Focus: ring on the custom radio circle
- **Option label**: `--text-base`, `--color-text-primary`, clickable (label wraps input)
- **Option description** (optional): `--text-sm`, `--color-text-secondary`, below the label
- **Horizontal layout**: options in a flex row with `--space-6` gap, wrapping on mobile
- **Vertical layout**: options stacked with `--space-3` gap
- Consider card-style radio options for future use (each option in a bordered card — useful for Risk Tolerance step in Phase 2)

---

### 7. UI Component: Slider (`src/components/ui/Slider.js`)

A range slider with value display and optional labels.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Slider label |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `value` | `number` | — | Current value |
| `onChange` | `(value: number) => void` | — | Change handler |
| `showValue` | `boolean` | `true` | Show current value display |
| `valueFormatter` | `(val: number) => string` | — | Format the displayed value |
| `minLabel` | `string` | — | Label at min end |
| `maxLabel` | `string` | — | Label at max end |

#### Styling Specs (`Slider.module.css`)

- Custom styled `<input type="range">` (cross-browser: `-webkit-slider-thumb`, `-moz-range-thumb`)
- **Track**: height `6px`, `--radius-full`, background `--color-gray-200`
- **Filled track**: background linear gradient `--color-primary-500` to `--color-primary-600`
- **Thumb**: `24px` circle, background `--color-primary-600`, border `3px solid white`, `--shadow-md`
- Hover: thumb scales slightly (`1.1`)
- **Value display**: above the thumb or next to the label, `--font-semibold`, `--color-primary-600`
- **Min/max labels**: at both ends, `--text-xs`, `--color-text-tertiary`
- **Label**: Same as Input label

---

### 8. UI Component: Tooltip (`src/components/ui/Tooltip.js`)

A hover/focus tooltip for contextual help text.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string \| ReactNode` | — | Tooltip content |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position relative to trigger |
| `children` | `ReactNode` | — | Trigger element (wrapped) |
| `maxWidth` | `string` | `'280px'` | Max width of tooltip |

#### Styling Specs (`Tooltip.module.css`)

- **Trigger**: Inline display, cursor help if content is informational
- **Tooltip bubble**: `position: absolute`, `--color-gray-900` background, `--color-text-inverse` text, `--text-sm`
- Padding: `--space-2` `--space-3`
- `--radius-md`, `--shadow-lg`
- Small arrow/caret pointing to trigger (CSS triangle using `::after`)
- **Animation**: fade in + slight slide from direction, `--transition-fast`
- Appear on hover and focus (keyboard accessible)
- `--z-tooltip` for stacking
- `role="tooltip"` and proper `aria-describedby` for accessibility

---

### 9. Layout Component: Container (`src/components/layout/Container.js`)

A max-width centering wrapper.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'lg'` | Max width variant |
| `children` | `ReactNode` | — | Content |
| `className` | `string` | — | Additional CSS class |

#### Styling Specs (`Container.module.css`)

| Size | Max Width |
|---|---|
| `sm` | `640px` |
| `md` | `896px` |
| `lg` | `--container-max-width` (1200px) |
| `full` | `100%` |

- `margin: 0 auto` for centering
- Horizontal padding: `--container-padding` (responsive, defined in design tokens)
- Width: `100%`

---

### 10. Layout Component: Navbar (`src/components/layout/Navbar.js`)

A sticky top navigation bar.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| (none) | — | — | Navbar is self-contained, reads current route via `usePathname()` |

#### Behavior
- Uses Next.js `usePathname()` to highlight active nav link
- Mobile hamburger menu opens a slide-in panel (or overlay dropdown)
- CTA button "Get Advice" is visually distinct (primary button style)

#### Structure
```
┌─────────────────────────────────────────────────────┐
│ [Logo: WhatToInsure]     [Home] [Learn] [Get Advice]│
└─────────────────────────────────────────────────────┘
```

On mobile (`< 768px`):
```
┌─────────────────────────────────────────────────────┐
│ [Logo]                                    [☰ Menu]  │
└─────────────────────────────────────────────────────┘
```

#### Styling Specs (`Navbar.module.css`)

- `position: sticky`, `top: 0`, `z-index: --z-sticky`
- Height: `--navbar-height` (72px)
- Background: `--color-bg-primary` with `backdrop-filter: blur(12px)` and slight transparency for glassmorphism effect
- Border-bottom: `1px solid --color-border-secondary`
- **Logo**: text-based "WhatToInsure", `--font-heading`, `--font-bold`, `--text-xl`, `--color-primary-600`
- Alternatively, a small shield/check icon + "WhatToInsure" (text-only is fine for now)
- **Nav links**: `--text-sm`, `--font-medium`, `--color-text-secondary`
  - Hover: `--color-text-primary`
  - Active: `--color-primary-600`, with a bottom indicator bar (`2px`, `--color-primary-600`)
- **CTA button**: Use the `Button` component with `variant="primary"` and `size="sm"`
- **Mobile menu toggle**: hamburger icon (3 lines, CSS only), animates to ✕ when open
- **Mobile menu panel**: full-width overlay below navbar, `--color-bg-primary` background, nav links stacked vertically, slide-in animation
- Transition: `--transition-base`

> [!IMPORTANT]
> The Navbar must be a **client component** (`'use client'`) because it uses `usePathname()` and manages mobile menu state. Keep it lightweight.

---

### 11. Layout Component: Footer (`src/components/layout/Footer.js`)

A site footer with navigation, legal disclaimer, and copyright.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| (none) | — | — | Footer is self-contained |

#### Structure
```
┌─────────────────────────────────────────────────────┐
│ WhatToInsure                                        │
│ Free, unbiased insurance advice for Singaporeans.   │
│                                                     │
│ Navigation          Learn              Legal        │
│ • Home              • Insurance Basics  • Disclaimer│
│ • Get Advice        • Common Traps     • Privacy    │
│ • Learn             • SG Schemes       • Terms      │
│                                                     │
│─────────────────────────────────────────────────────│
│ ⚠ Disclaimer: WhatToInsure provides general        │
│ informational guidance only. It is not a substitute │
│ for professional financial advice...                │
│                                                     │
│ © 2025 WhatToInsure. All rights reserved.           │
└─────────────────────────────────────────────────────┘
```

#### Styling Specs (`Footer.module.css`)

- Background: `--color-gray-900`
- Text: `--color-gray-400` (body), `--color-gray-100` (headings)
- Top section: 3-column grid (collapses to single column on mobile)
- **Logo/tagline**: `--font-heading`, `--text-lg`, `--color-gray-100`
- **Link columns**: heading `--text-sm`, `--font-semibold`, `--color-gray-100`; links `--text-sm`, `--color-gray-400`, hover `--color-gray-200`
- **Disclaimer bar**: slightly different background (`--color-gray-950`), `--text-xs`, `--color-gray-500`, padding `--space-4`
- **Copyright**: `--text-xs`, `--color-gray-500`, centered or right-aligned
- Separator: `1px solid` with `rgba(255,255,255,0.1)`
- Adequate padding: `--space-16` top, `--space-8` bottom

---

### 12. Integrate Layout Components into Root Layout

After building Navbar and Footer, update `src/app/layout.js` to include them:

```jsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Navbar />
        <main style={{ minHeight: `calc(100vh - var(--navbar-height))` }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

---

### 13. Component Demo/Preview Page (Optional but Recommended)

Create a temporary development page at `src/app/dev/components/page.js` that showcases all UI components in various states. This helps verify visual consistency and serves as a reference for other agents.

Display:
- All Button variants × sizes
- All Card variants
- ProgressBar at various steps
- Input in normal, focused, error, disabled states
- Select with options
- RadioGroup horizontal and vertical
- Slider with custom formatting
- Tooltip in all positions

> [!NOTE]
> This page is for development only. It can be removed before production deployment or gated behind an environment variable.

---

## Files to Create/Modify

| Action | File | Description |
|--------|------|-------------|
| [NEW] | `src/components/ui/Button.js` | Button component |
| [NEW] | `src/components/ui/Button.module.css` | Button styles |
| [NEW] | `src/components/ui/Card.js` | Card component |
| [NEW] | `src/components/ui/Card.module.css` | Card styles |
| [NEW] | `src/components/ui/ProgressBar.js` | Progress bar component |
| [NEW] | `src/components/ui/ProgressBar.module.css` | Progress bar styles |
| [NEW] | `src/components/ui/Input.js` | Input component |
| [NEW] | `src/components/ui/Input.module.css` | Input styles |
| [NEW] | `src/components/ui/Select.js` | Select component |
| [NEW] | `src/components/ui/Select.module.css` | Select styles |
| [NEW] | `src/components/ui/RadioGroup.js` | Radio group component |
| [NEW] | `src/components/ui/RadioGroup.module.css` | Radio group styles |
| [NEW] | `src/components/ui/Slider.js` | Slider component |
| [NEW] | `src/components/ui/Slider.module.css` | Slider styles |
| [NEW] | `src/components/ui/Tooltip.js` | Tooltip component |
| [NEW] | `src/components/ui/Tooltip.module.css` | Tooltip styles |
| [NEW] | `src/components/layout/Navbar.js` | Navigation bar |
| [NEW] | `src/components/layout/Navbar.module.css` | Navigation styles |
| [NEW] | `src/components/layout/Footer.js` | Footer component |
| [NEW] | `src/components/layout/Footer.module.css` | Footer styles |
| [NEW] | `src/components/layout/Container.js` | Container wrapper |
| [NEW] | `src/components/layout/Container.module.css` | Container styles |
| [MODIFY] | `src/app/layout.js` | Add Navbar + Footer to root layout |
| [NEW] | `src/app/dev/components/page.js` | (Optional) Component showcase page |

**Total: 21 new files + 1 modification**

---

## Verification Plan

### Automated Checks
```bash
# Project still builds after adding all components
npm run build

# Lint passes
npm run lint
```

### Manual Verification

#### Component-by-Component Checks

| Component | What to Verify |
|---|---|
| **Button** | All 4 variants render correctly. Hover effects (lift, color change) work. Disabled state grays out. Loading shows spinner. Focus ring visible on keyboard tab. `sm`/`md`/`lg` sizes are visually distinct. |
| **Card** | All 3 variants render. Hoverable card lifts on hover. Padding sizes are correct. Content overflows correctly. |
| **ProgressBar** | Step circles + connecting lines render. Completed steps show checkmark. Current step has pulse. Future steps are grayed. Clicking completed step fires callback. Labels hidden on mobile. |
| **Input** | Label, placeholder, prefix (S$), suffix (/month) all render. Error state shows red border + error text. Helper text shows when no error. Focus ring appears. Disabled is grayed. |
| **Select** | Custom arrow renders. Options dropdown works. Placeholder shows in lighter color. Error state matches Input. |
| **RadioGroup** | Custom radio circles render. Selection animates smoothly. Horizontal and vertical layouts both work. Description text renders below option labels. |
| **Slider** | Track fills with primary color to current position. Thumb renders and drags smoothly. Value display updates. Min/max labels render. |
| **Tooltip** | Appears on hover and focus. Correct positioning (top/bottom/left/right). Arrow points to trigger. Fades in smoothly. Disappears on mouse leave. |
| **Navbar** | Sticky on scroll. Active route highlighted. Mobile hamburger toggle works. Menu slides in/out. CTA button routes to `/questionnaire`. Glassmorphism blur visible when content scrolls behind. |
| **Footer** | 3-column layout on desktop, stacked on mobile. Links are clickable. Disclaimer text is visible. Correct dark background. |
| **Container** | Content is centered. Max widths are correct for each size. Padding is responsive. |

#### Cross-Cutting Checks
1. **Responsive**: All components behave correctly at 375px, 768px, 1024px, 1280px widths
2. **Keyboard accessibility**: All interactive components (Button, Input, Select, RadioGroup, Slider, Tooltip, Navbar links) are reachable via Tab and operable via Enter/Space
3. **Focus visibility**: All interactive elements show visible focus rings on keyboard navigation
4. **Design token compliance**: Inspect components in DevTools — no hardcoded color, spacing, or font values (all should reference `var(--*)`)
5. **No console errors**: Browser console clean on all pages
6. **Page layout**: With Navbar + Footer integrated, the page content is properly spaced (not hidden behind sticky navbar, footer at bottom)

---

## Handoff Notes for Phase 2

After Phase 1B, the following is available for Phase 2 (Questionnaire Wizard):

### Components Ready to Use
```js
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import RadioGroup from '@/components/ui/RadioGroup';
import Slider from '@/components/ui/Slider';
import Tooltip from '@/components/ui/Tooltip';
import Container from '@/components/layout/Container';
```

### Key Integration Points
- The `ProgressBar` component is designed specifically for the wizard — use `currentStep`, `totalSteps`, and `labels` props
- The `Input` component supports `prefix="S$"` for all currency fields in the financial step
- The `RadioGroup` component supports `description` per option — useful for the Risk Tolerance step
- The `Slider` component supports `valueFormatter` — useful for the retirement age slider
- Use `Container size="sm"` for the wizard content area (narrower width for focused form filling)
- The `Tooltip` component can wrap any element — use it next to labels that need contextual help (e.g., explaining CPF, residency status impact)

> [!IMPORTANT]
> **Component API contract**: Do not modify the prop interfaces defined above without updating this plan. Other phases depend on these exact prop names and types.
