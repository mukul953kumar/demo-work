# AlumniConnect AI — Permanent Agent Guidelines & Memory

> **CRITICAL INSTRUCTIONS FOR ALL SESSIONS & CHATS**
> This file is automatically loaded by the AI assistant in all sessions. The rules below are non-negotiable requirements set by the project owner.

---

## 1. Mandatory First Step: Read All Project MD Files

At the start of **every new chat session or when addressing any coding task**, the agent **MUST FIRST READ all project markdown files** before generating, planning, or editing code:
1. [`plan.md`](file:///c:/Development/Major%20Project/alumni%20network/plan.md) — Product vision, MVP scope, core user journey, and requirements.
2. [`rules.md`](file:///c:/Development/Major%20Project/alumni%20network/rules.md) — AI coding rules, standards, comments policy, and decision rules.
3. [`phase.md`](file:///c:/Development/Major%20Project/alumni%20network/phase.md) — Phase order, 15-hour time budget, tasks, and exit criteria.
4. [`progress.md`](file:///c:/Development/Major%20Project/alumni%20network/progress.md) — Execution progress tracker, current active phase, and completed milestones.
5. [`design-system.md`](file:///c:/Development/Major%20Project/alumni%20network/design-system.md) (or [`design.md`](file:///c:/Development/Major%20Project/alumni%20network/design.md)) — Stitch design specifications, colors, fonts, and HTML templates.
6. [`architecture.md`](file:///c:/Development/Major%20Project/alumni%20network/architecture.md) (when present) — Folder structure, API contracts, and data models.

*Do not skip reading these files. If any document is missing, state it explicitly.*

---

## 2. Strict UI Design Rule: Exact Stitch Match

The frontend UI **MUST BE 100% IDENTICAL to the Google Stitch designs**:
- **Stitch Project:** `AlumniConnect Editorial Network UI` (`projects/14982706531093909212`)
- **Stitch HTML Templates:** Saved locally in [`design/stitch_screens/`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/):
  - [`discover_alumni_directory.html`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/discover_alumni_directory.html)
  - [`alumni_profile_and_mentorship.html`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/alumni_profile_and_mentorship.html)
  - [`admin_verification_queue.html`](file:///c:/Development/Major%20Project/alumni%20network/design/stitch_screens/admin_verification_queue.html)
- **Aesthetic Direction:** Warm Editorial Minimalism with Precise Modern Tactility.
  - NO generic bootstrap/tailwind defaults.
  - NO neon colors, purple gradients, or floating plastic shadows.
- **Exact Color Palette:**
  - `background`: `#FAF9F5` (Warm Ivory Canvas)
  - `surface` / card: `#FFFFFF` (Pure White)
  - `primary`: `#044430` / container `#245C46` (Deep Forest Green)
  - `secondary`: `#7D571B` / container `#B88B4A` (Warm Antique Brass / Amber)
  - `ink / on-surface`: `#1B1C1A` / `#18251F` (Deep Pine Ink)
  - `muted / on-surface-variant`: `#404944` / `#737B78` (Muted Slate)
  - `border / outline`: `#E4E2DA` / `#C0C9C2` (Hairline warm gray)
- **Exact Typography:**
  - Headings & Editorial Titles: `Newsreader` (Serif)
  - UI, Body, Buttons, Tables, and Forms: `Manrope` (Sans-Serif)

---

## 3. Security, Privacy & Git Hygiene

- **All security-sensitive files MUST remain in [`.gitignore`](file:///c:/Development/Major%20Project/alumni%20network/.gitignore)**:
  - Environment variables: `.env`, `.env.local`, `.env.*.local`
  - Secrets, tokens, private keys, certificates (`*.pem`, `*.key`, `*.cert`)
  - User verification evidence, uploaded documents, private identities
  - Never commit credentials or include private evidence in public API responses or client bundles.
