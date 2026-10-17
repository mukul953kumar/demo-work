# AlumniConnect AI

> **Tagline:** Connect Experience. Unlock Potential. Grow Together.  
> **Aesthetic:** Warm Editorial Minimalism with Precise Modern Tactility (Google Stitch: `AlumniConnect Editorial Network UI`)

AlumniConnect AI is a college-focused alumni networking and mentorship platform designed for students, alumni, and college administrators. It offers trusted alumni discovery, structured mentorship requests, and an administrative review workflow for alumni verification.

---

## Quick Start Guide

### Prerequisites
* **Node.js:** v18+ (verified on Node v24.5.0)
* **MongoDB:** Running locally on `mongodb://localhost:27017` or via MongoDB Atlas

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed       # Seeds fictional demo profiles and admin accounts
npm run dev        # Starts Express API at http://localhost:5000
```

### 2. Demo Accounts (Fictional Demo Data)
| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@northstar.edu` | `AdminDemo123!` |
| **Student** | `student1@northstar.edu` | `StudentDemo123!` |
| **Alumni (Verified)** | `marcus.vance@northstar.edu` | `AlumniDemo123!` |
| **Alumni (Pending Audit)**| `sarah.chen@northstar.edu` | `AlumniDemo123!` |

---

## Documentation
* [`plan.md`](./plan.md) — Product requirements, MVP goals, user stories.
* [`phase.md`](./phase.md) — 15-hour execution roadmap.
* [`rules.md`](./rules.md) — AI coding rules & standards.
* [`progress.md`](./progress.md) — Real-time phase completion tracker.
* [`design-system.md`](./design-system.md) — Google Stitch design system, tokens, and components.
* [`architecture.md`](./architecture.md) — Architecture, Mongoose models, and API contracts.
