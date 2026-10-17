# AlumniConnect AI — Stitch Design Document

> **IMPORTANT:** This project strictly uses the Google Stitch design system.  
> See the full specification, token mappings, and HTML component templates in [design-system.md](file:///c:/Development/Major%20Project/alumni%20network/design-system.md).

---

## 1. Design Rule
The frontend interface for AlumniConnect AI **MUST match the Google Stitch design project exactly**:
- **Stitch Project:** `AlumniConnect Editorial Network UI` (`projects/14982706531093909212`)
- **Aesthetic:** Warm Editorial Minimalism with Precise Modern Tactility.
- **Canvas / Background:** `#FAF9F5` (Warm Ivory)
- **Primary Accent:** `#044430` / `#245C46` (Deep Forest Green)
- **Secondary Accent:** `#7D571B` / `#B88B4A` (Warm Antique Brass / Amber)
- **Primary Ink:** `#1B1C1A` / `#18251F`
- **Hairline Borders:** `#E4E2DA` / `#C0C9C2`
- **Headings Font:** `Newsreader` (Serif)
- **UI / Controls Font:** `Manrope` (Sans-Serif)

---

## 2. Preserved HTML Screens from Stitch
Complete standalone HTML files downloaded directly from Stitch are available in [`design/stitch_screens/`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/):
1. [`discover_alumni_directory.html`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/discover_alumni_directory.html) — Alumni directory search and filter screen.
2. [`alumni_profile_and_mentorship.html`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/alumni_profile_and_mentorship.html) — Alumni profile, mentorship offerings, and booking modal.
3. [`admin_verification_queue.html`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/admin_verification_queue.html) — Admin verification queue table and review console.

---

## 3. Mandatory Check for New Chat Sessions
At the start of every new chat session, the AI assistant must read:
- `plan.md`
- `rules.md`
- `phase.md`
- `progress.md`
- `design-system.md` / `design.md`
- `GEMINI.md` / `AGENTS.md`
