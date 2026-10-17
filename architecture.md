# AlumniConnect AI — System Architecture & API Contracts

> **STACK:** MongoDB, Express.js, React.js, Node.js (MERN), Tailwind CSS  
> **DESIGN SYSTEM:** Google Stitch (`projects/14982706531093909212` — *AlumniConnect Editorial Network UI*)

---

## 1. Directory Structure

```
alumni network/
├── .agents/                      # Agent memory and permanent project rules
│   └── rules/
│       └── project_rules.md
├── design/                       # Preserved Stitch design templates
│   └── stitch_screens/
│       ├── admin_verification_queue.html
│       ├── alumni_profile_and_mentorship.html
│       └── discover_alumni_directory.html
├── backend/                      # Express.js REST API
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── config/               # DB connection & environment validator
│       │   ├── db.js
│       │   └── env.js
│       ├── controllers/          # Request orchestrators
│       │   ├── auth.controller.js
│       │   ├── alumni.controller.js
│       │   ├── verification.controller.js
│       │   └── mentorship.controller.js
│       ├── middleware/           # Auth, validation, rate-limiting, errors
│       │   ├── auth.js
│       │   ├── errorHandler.js
│       │   ├── notFound.js
│       │   ├── pagination.js
│       │   └── validate.js
│       ├── models/               # Mongoose Schemas
│       │   ├── User.js
│       │   ├── AlumniProfile.js
│       │   ├── VerificationRequest.js
│       │   └── MentorshipRequest.js
│       ├── routes/               # Express Routes
│       │   ├── index.js          # Main /api/v1 router
│       │   ├── auth.routes.js
│       │   ├── alumni.routes.js
│       │   ├── verification.routes.js
│       │   ├── mentorship.routes.js
│       │   └── health.routes.js
│       ├── seeds/                # Deterministic fictional demo seed data
│       │   └── seed.js
│       ├── utils/                # Response formatters & helpers
│       │   └── apiResponse.js
│       ├── app.js                # Express app setup & middleware
│       └── server.js             # Process entry point
├── frontend/                     # React + Vite + Tailwind CSS
├── architecture.md               # This architecture specification
├── design-system.md              # Visual design tokens & Stitch specs
├── design.md                     # Design guidelines pointer
├── GEMINI.md                     # Permanent agent instructions & memory
├── AGENTS.md                     # Agent guidelines mirror
├── phase.md                      # Phase roadmap & time budgets
├── plan.md                       # Product vision & MVP priorities
├── progress.md                   # Real-time execution tracker
├── rules.md                      # AI engineering rules
└── .gitignore                    # Security and privacy exclusions
```

---

## 2. Core Entities & Status State Machines

### 2.1 User
* **Roles:** `student` | `alumni` | `admin`
* **Status:** `active` | `disabled`

### 2.2 AlumniProfile
* **Separation of Concerns:**
  * `collegeVerificationStatus`: `unverified` | `pending` | `verified` | `rejected` | `needs_more_info`
  * `employmentVerificationStatus`: `unverified` | `pending` | `verified` | `rejected` (Never auto-verified when college ID is verified)
* **Availability:** `available` | `busy` | `paused`

### 2.3 VerificationRequest
* **Types:** `college_identity` | `employment`
* **Status Lifecycle:** `pending` ➔ `verified` OR `rejected` OR `needs_more_info`
* **Verification Methods:** `college_record_match` | `document_review` | `approved_email_method` | `other`

### 2.4 MentorshipRequest
* **Request Types:** `resume_review` | `mock_interview` | `technical_guidance` | `career_advice` | `higher_studies` | `startup_advice` | `other`
* **Status Lifecycle:** `pending` ➔ `accepted` | `declined` | `time_proposed` ➔ `completed` | `cancelled`

---

## 3. Standard API Response Shapes

### Success Response (`200 OK`, `201 Created`)
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

### Error Response (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Error`)
```json
{
  "success": false,
  "message": "Human-readable error description",
  "errors": [
    {
      "field": "email",
      "message": "Email address format is invalid"
    }
  ]
}
```

---

## 4. API Endpoints Map (`/api/v1`)

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/health` | Public | System & database health status |
| **POST** | `/api/v1/auth/register` | Public | Register student or alumni (No public admin registration) |
| **POST** | `/api/v1/auth/login` | Public | Authenticate and obtain JWT token |
| **GET** | `/api/v1/auth/me` | Authenticated | Retrieve authenticated user profile |
| **GET** | `/api/v1/alumni` | Public | Search, filter, and paginate alumni profiles |
| **GET** | `/api/v1/alumni/:id` | Public | View public alumni profile (No private evidence leaked) |
| **PATCH** | `/api/v1/alumni/me` | Alumni | Update own alumni profile |
| **POST** | `/api/v1/alumni/verification` | Alumni | Submit college identity verification request |
| **GET** | `/api/v1/alumni/me/verification` | Alumni | View own verification history and review status |
| **GET** | `/api/v1/admin/verifications` | Admin Only | List verification audit queue (with status filter) |
| **GET** | `/api/v1/admin/verifications/:id` | Admin Only | Inspect specific submission and private evidence |
| **PATCH** | `/api/v1/admin/verifications/:id` | Admin Only | Submit audit decision (`verified`, `rejected`, `needs_more_info`) |
| **POST** | `/api/v1/mentorship-requests` | Student Only | Submit mentorship request with structured goals |
| **GET** | `/api/v1/mentorship-requests/me` | Authenticated | List mentorship requests relevant to current user |
| **GET** | `/api/v1/mentorship-requests/:id` | Recipient / Student | View specific private mentorship request |
| **PATCH** | `/api/v1/mentorship-requests/:id` | Recipient / Student | Accept, decline, propose times, or update status |
| **GET** | `/api/v1/recommendations/mentors` | Public | Ranked mentor recommendations with explainable match reasons |
