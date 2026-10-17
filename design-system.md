# AlumniConnect AI — Design System & Stitch Visual Specification

> **CRITICAL MANDATE: THE FRONTEND UI MUST BE 100% IDENTICAL TO GOOGLE STITCH**  
> All frontend components, layouts, color schemes, typography, spacing, and micro-interactions must strictly adhere to the Stitch design specifications. Do not alter colors, do not substitute fonts, and do not introduce generic templates or unstyled components.

---

## 1. Design Source & Architecture

- **Stitch Project Name:** `AlumniConnect Editorial Network UI`
- **Stitch Project ID:** `projects/14982706531093909212`
- **Core Aesthetic:** **Warm Editorial Minimalism with Precise Modern Tactility**
- **Brand Feeling:** High-trust academic distinction meets modern operational clarity (Linear / Stripe level polish with archival print prestige).
- **Physical Assets Location:** Raw standalone HTML screens are preserved in [`design/stitch_screens/`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/).

---

## 2. Color Palette & Theme Tokens

The design uses an archival, warm-paper palette with deep evergreen accents and antique brass secondary highlights:

### Surface & Canvas Tones
| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| `background` / `canvas` | `#FAF9F5` | Warm ivory paper backdrop; minimizes glare. |
| `surface-container-lowest` | `#FFFFFF` | Pure white; elevated cards, modals, dropdowns. |
| `surface-container-low` | `#F5F4F0` | Subtle inset panels, search inputs, tags. |
| `surface-container` | `#EFEEEA` | Secondary container layers and grouped controls. |
| `surface-container-high` | `#E9E8E4` | Interactive hover states and muted tabs. |
| `surface-container-highest` | `#E3E2DF` | Active borders and recessed indicators. |
| `surface-dim` | `#DBDAD6` | Disabled states and structural backgrounds. |

### Brand & Accent Tones
| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| `primary` | `#044430` | Deep Forest Green; highest-emphasis text and badges. |
| `primary-container` | `#245C46` | Deep Pine Green; primary buttons, active pill items. |
| `on-primary` | `#FFFFFF` | Text on primary containers. |
| `on-primary-container` | `#99D2B6` | Soft mint tint for primary container icons. |
| `secondary` | `#7D571B` | Warm Antique Brass / Amber; verified distinctions & fellow status. |
| `secondary-container` | `#FDC981` | Amber pill backgrounds and highlighted notice boxes. |
| `on-secondary-container` | `#785216` | Amber text on secondary containers. |
| `tertiary` | `#313E37` | Deep slate-pine; secondary icon accents. |
| `tertiary-container` | `#47554E` | Subdued tags and category chips. |

### Typography & Ink
| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| `on-surface` (Ink Primary) | `#1B1C1A` | Rich near-black; headlines, titles, body copy. |
| `on-surface-variant` (Ink Muted) | `#404944` | Slate gray; metadata, subtitles, timestamps. |
| `outline` / `border` | `#707973` | Standard borders. |
| `outline-variant` / `hairline` | `#C0C9C2` / `#E4E2DA` | Crisp 1px hairline dividers and subtle card borders. |
| `error` | `#BA1A1A` | Verification rejections and error alerts. |
| `error-container` | `#FFDAD6` | Soft pinkish-red error banners. |

---

## 3. Typography Hierarchy

Import Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet">
```

### Typographic Roles
1. **Newsreader (Serif):** Used for all headlines, editorial titles, quotes, and primary mastheads.
2. **Manrope (Sans-Serif):** Used for all interactive elements, navigation, forms, buttons, tables, filters, and body copy.

### Type Scale Specification
| Class Name | Font Family | Size / Line-Height | Weight | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| `font-display-hero` | Newsreader | `56px / 64px` | 400 | `-0.02em` |
| `font-headline-xl` | Newsreader | `40px / 48px` | 400 | `-0.015em` |
| `font-headline-lg` | Newsreader | `32px / 40px` | 500 | `-0.01em` |
| `font-headline-md` | Newsreader | `24px / 32px` | 500 | normal |
| `font-title-editorial` | Newsreader | `20px / 28px` | 500 | normal |
| `font-title-ui` | Manrope | `16px / 24px` | 600 | `-0.005em` |
| `font-body-lg` | Newsreader | `19px / 32px` | 400 | normal |
| `font-body-base` | Manrope | `15px / 24px` | 400 | normal |
| `font-body-sm` | Manrope | `13px / 20px` | 400 | normal |
| `font-label-caps` | Manrope | `11px / 16px` | 700 | `+0.08em` (Uppercase) |
| `font-caption` | Manrope | `12px / 16px` | 500 | normal |

---

## 4. Spacing, Borders & Elevation

- **Base Rhythm:** 4px / 8px grid system.
  - `space-xs`: `0.25rem` (4px)
  - `space-sm`: `0.5rem` (8px)
  - `space-md`: `1rem` (16px)
  - `space-lg`: `1.5rem` (24px)
  - `space-xl`: `2.5rem` (40px)
- **Container Max-Width:** `1240px` centered with responsive gutter:
  - Mobile: `1rem` (16px) margin
  - Tablet: `2rem` (32px) margin
  - Desktop: `3rem` (48px) margin
- **Corner Radii:**
  - Micro tags / chips / buttons: `0.25rem` (4px) or `0.375rem` (6px)
  - Cards & panels: `0.5rem` (8px)
  - Modals & dialog envelopes: `0.75rem` (12px)
  - Rounded pills: `9999px` (exclusive to status pills and badges)
- **Depth & Hairlines:**
  - Avoid heavy, blurry drop shadows.
  - Use 1px solid hairline borders in `#E4E2DA` or `#C0C9C2`.
  - Resting shadow: `0 1px 8px rgba(24, 37, 31, 0.04)`.
  - Floating modal shadow: `0 8px 30px rgba(24, 37, 31, 0.12)`.

---

## 5. Tailwind Configuration Object

The exact Tailwind theme extension used in the Stitch screens:

```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#044430",
        "primary-container": "#245C46",
        "on-primary": "#ffffff",
        "on-primary-container": "#99d2b6",
        "primary-fixed": "#b5efd2",
        "primary-fixed-dim": "#99d3b7",
        "on-primary-fixed": "#002115",
        "on-primary-fixed-variant": "#16503b",
        "secondary": "#7d571b",
        "secondary-container": "#fdc981",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#785216",
        "secondary-fixed": "#ffddb3",
        "secondary-fixed-dim": "#f0be78",
        "on-secondary-fixed": "#291800",
        "on-secondary-fixed-variant": "#624002",
        "tertiary": "#313e37",
        "tertiary-container": "#47554e",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#bac9c0",
        "tertiary-fixed": "#d7e6dc",
        "tertiary-fixed-dim": "#bbcac1",
        "on-tertiary-fixed": "#111e18",
        "on-tertiary-fixed-variant": "#3c4a43",
        "surface": "#faf9f5",
        "surface-bright": "#faf9f5",
        "surface-dim": "#dbdad6",
        "surface-variant": "#e3e2df",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#404944",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f4f0",
        "surface-container": "#efeeea",
        "surface-container-high": "#e9e8e4",
        "surface-container-highest": "#e3e2df",
        "inverse-surface": "#30312e",
        "inverse-on-surface": "#f2f1ed",
        "background": "#faf9f5",
        "on-background": "#1b1c1a",
        "outline": "#707973",
        "outline-variant": "#c0c9c2",
        "surface-tint": "#316852",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a"
      },
      fontFamily: {
        "display-hero": ["Newsreader", "serif"],
        "headline-xl": ["Newsreader", "serif"],
        "headline-lg": ["Newsreader", "serif"],
        "headline-md": ["Newsreader", "serif"],
        "title-editorial": ["Newsreader", "serif"],
        "body-lg": ["Newsreader", "serif"],
        "title-ui": ["Manrope", "sans-serif"],
        "body-base": ["Manrope", "sans-serif"],
        "body-sm": ["Manrope", "sans-serif"],
        "label-caps": ["Manrope", "sans-serif"],
        "caption": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "9999px"
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "margin-mobile": "1rem",
        "margin-tablet": "2rem",
        "margin": "3rem"
      }
    }
  }
};
```

---

## 6. Stitch HTML Screen References

The complete, working HTML templates from Stitch have been downloaded directly into the repository:

### Screen 1: Discover Alumni Directory
- **File:** [`design/stitch_screens/discover_alumni_directory.html`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/discover_alumni_directory.html)
- **Stitch ID:** `4f736daac4c645129a852752346ec7e3`
- **Key Features:**
  - Sticky glassmorphic top navigation bar with search shortcut (`⌘K`)
  - Filter sidebar (Graduation Year, Industry, Mentorship Offerings, College Affiliation)
  - Alumni Grid Cards with Verified College & Employment badges
  - Match-reason highlights and quick "Connect / Request" triggers

### Screen 2: Alumni Profile & Mentorship Request
- **File:** [`design/stitch_screens/alumni_profile_and_mentorship.html`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/alumni_profile_and_mentorship.html)
- **Stitch ID:** `354a2ed2d9014018be98b074d215f062`
- **Key Features:**
  - Hero profile card with badge distinction, graduation evidence summary, and career trajectory
  - Mentorship offerings breakdown (Resume Review, Mock Interview, Career Guidance)
  - Structured request flow with clear reason, goal description, and time selection

### Screen 3: Administrator Verification Queue
- **File:** [`design/stitch_screens/admin_verification_queue.html`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/admin_verification_queue.html)
- **Stitch ID:** `ac62366fac6b47e186a516ca34327635`
- **Key Features:**
  - Registrar audit workspace header
  - Metric summary cards (Pending Submissions, Clarification Needed, Verified Batches)
  - High-density verification ledger table with actions (Approve, Reject, Request More Info)
  - Modal review dialog with private student-record comparison

---

## 7. Sample Core Components (HTML Form)

### Component: Navigation Header
```html
<header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(24,37,31,0.04)]">
  <div class="h-20 max-w-[1240px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-lg">
      <div class="flex items-center gap-space-sm">
        <div class="flex flex-col">
          <span class="font-title-editorial text-title-editorial text-on-surface leading-tight tracking-tight">AlumniConnect AI</span>
          <span class="font-caption text-caption text-on-surface-variant flex items-center gap-space-xs">Northstar Institute & Affiliated Colleges</span>
        </div>
      </div>
    </div>
    <nav class="hidden lg:flex items-center gap-space-xs">
      <a class="px-space-md py-space-sm bg-primary-container text-on-primary font-title-ui rounded-xl shadow-[0_1px_8px_rgba(4,68,48,0.12)]" href="/discover">Discover Alumni</a>
      <a class="font-body-sm text-body-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" href="/mentorships">Mentorships</a>
      <a class="font-body-sm text-body-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" href="/verification">Verification Queue</a>
    </nav>
  </div>
</header>
```

### Component: Verification Status Badge
```html
<!-- Verified College Identity -->
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-caps text-label-caps bg-primary-fixed text-on-primary-fixed-variant border border-primary/20">
  <span class="material-symbols-outlined text-[12px]">verified</span>
  COLLEGE IDENTITY VERIFIED
</span>

<!-- Unverified / Pending -->
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-caps text-label-caps bg-secondary-fixed/50 text-on-secondary-fixed-variant">
  <span class="material-symbols-outlined text-[12px]">schedule</span>
  PENDING REGISTRAR AUDIT
</span>
```

### Component: Primary Action Button
```html
<button class="bg-primary-container hover:bg-primary text-on-primary font-title-ui text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_1px_8px_rgba(4,68,48,0.12)] active:scale-[0.98]">
  Request Mentorship
</button>
```
