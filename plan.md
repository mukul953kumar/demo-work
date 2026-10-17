AlumniConnect AI — Project Plan

Verified Alumni Network, Mentorship & Career Connections

Project: AlumniConnect AI

Tagline: Connect Experience. Unlock Potential. Grow Together.

Team: [Team Name]

Hackathon problem: Alumni Network & Professional Connections

Delivery target: A working, demo-ready MVP built in a focused 15-hour execution window

Primary stack: MongoDB, Express.js, React.js, Node.js (MERN), Tailwind CSS

Document note: This plan follows the structure and delivery discipline of the supplied EventPulse project plan, adapted for an alumni networking product.

1. Executive Summary

AlumniConnect AI is a college-focused alumni networking and mentorship platform. Students often need practical career guidance, resume reviews, mock interviews, referrals, higher-study advice, and access to professional communities. Alumni may be willing to help, but discovering relevant people and arranging useful interactions can be difficult when information is scattered across social media, messaging groups, spreadsheets, and informal contacts.

The product goes beyond an alumni directory. It helps students discover relevant alumni, understand why a mentor fits their goal, send structured help requests, book mentoring sessions, and find opportunities shared by alumni. College administrators can review alumni identity evidence and manage verification status. Graduation verification and employment verification must remain separate.

The MVP should prove this core journey:

A student opens the platform and searches for alumni by skills, role, company, industry, or graduation year.

The student opens a profile and sees a clear, honest verification status.

The student requests a specific kind of help, such as a resume review or mock interview.

An alumni user reviews the request and accepts, declines, or proposes a time.

A college admin reviews a pending alumni identity request and approves, rejects, or requests more information.

The platform records request status and basic mentorship outcomes.

Delivery principle: build a coherent, secure end-to-end flow before advanced AI, calendar integrations, or employer verification. A smaller working product is stronger than many incomplete features.

2. Problem Statement

Students often lack an easy, trusted way to connect with alumni who have relevant experience. Alumni details may be outdated or scattered, cold outreach can have low response rates, and colleges may have limited visibility into whether alumni engagement creates value.

Current pain points

Students cannot easily identify alumni who match a specific career goal or technical interest.

Random outreach messages lack context and are easy to ignore.

Mentorship requests are unstructured, making it difficult to set expectations or schedule help.

Alumni profiles may contain unconfirmed graduation or professional claims.

College teams may manage alumni information in spreadsheets without a consistent review workflow.

Colleges have limited data on requests, response rates, completed sessions, and mentorship outcomes.

Target users

Students: seeking mentorship, career guidance, resume reviews, mock interviews, referrals, or higher-study advice.

Alumni: willing to share experience, mentor students, post opportunities, or participate in college events.

College administrators: responsible for alumni identity review, community quality, and engagement oversight.

Placement/alumni relations teams: a future audience for reports and institution-wide engagement tools.

Core insight

Students do not only need an alumni list. They need a trusted, low-friction way to find relevant people and turn a connection into useful action.

3. Product Vision and Goals

Vision

Make college alumni relationships easier to discover, safer to trust, and more useful for students and graduates.

MVP goals

Provide a searchable alumni directory with consistent profile fields.

Separate college identity verification from employment verification.

Enable students to send structured mentorship requests.

Enable alumni to accept, decline, or respond to requests.

Give college admins a review queue for alumni verification submissions.

Show transparent profile-match reasons based on student goals and alumni experience.

Provide basic request-status and engagement summaries.

Deliver a responsive interface suitable for a live hackathon demonstration.

Keep the codebase simple enough for the team to test, explain, and extend.

What success looks like

A judge can complete the main journey without developer intervention: find an alumni profile, understand its verification status, submit a mentorship request, switch to the alumni account to respond, and use the admin account to review a separate verification request. Clear loading, empty, validation, and error states are visible.

4. Scope and Priorities

P0 — Must work in the demo

Responsive application shell and navigation.

Seeded sample alumni profiles clearly marked as demo data.

Search and filters for skills, role, industry, graduation year, and mentorship topics.

Alumni profile detail view with separate college and employment verification statuses.

Mentorship request submission and status updates.

Admin verification queue with approve, reject, and request-more-information actions.

MongoDB persistence for users, profiles, requests, and verification records.

Server-side validation, authorization checks, and consistent API errors.

Role-aware demo accounts for student, alumni, and admin.

Loading, empty, error, and success states; seed/reset instructions.

P1 — Include if P0 is stable

Rule-based mentor recommendations with plain-language reasons.

Session scheduling using proposed time slots rather than a full calendar integration.

Alumni-shared internships, referrals, events, and opportunities.

Basic dashboard metrics: pending requests, accepted requests, completed sessions.

Email notification integration if a working provider is already configured.

P2 — Stretch goals only

AI-generated mentor summaries or request drafting, with user review.

Calendar integration and automated reminders.

Employer verification workflow.

Institution-wide analytics and multi-college support.

Alumni event management, group mentoring, and community discussions.

Document OCR as an assistive prefill feature, never as final proof of identity.

Scope rule: do not make core networking or verification dependent on an external AI, email, or calendar API. The product must work if optional credentials are missing.

5. Functional Requirements

5.1 Alumni discovery

The directory should show, when available:

Name and profile image or initials.

Graduation year and department.

Current role and employer, if supplied.

Skills, industry, interests, and mentorship topics.

College identity verification status.

Employment verification status, shown separately.

Availability for mentorship and a clear profile action.

Unknown information must be shown as “Not provided” or omitted. Do not infer employment, graduation, or verification from a profile photo, social link, or user-entered claim.

5.2 Search, sorting, and filters

Search name, skills, role, company, industry, and mentorship topics.

Filter by department, graduation year, experience area, and availability.

Optional filter for college-verified profiles.

Sort by relevance, recent activity, or graduation year where useful.

Combine search and filters safely; invalid values must not crash the server.

5.3 Alumni profile

A profile may contain name, department, graduation year, current role, employer, biography, skills, mentorship topics, availability, and relevant public links. It should display separate labels such as “College identity verified” and “Employment not verified.” Do not expose private email, phone number, identity documents, or internal reviewer notes on public profiles.

5.4 Verification workflow

Alumni submit a college identity verification request and provide an approved evidence type or a record-match reference. The admin compares the submission with authorized college records or reviews permitted evidence. The admin can approve, reject, or request more information. Every decision records reviewer ID, timestamp, method, and a concise reason.

Allowed statuses: pending, verified, rejected, needs_more_info.

Only authorized admins can make verification decisions.

Alumni can submit and view their own requests but cannot change their own status.

College identity verification does not imply that current employment is verified.

Employment verification is a separate, optional workflow and should remain unverified until evidence is actually checked.

Store evidence privately and limit access to authorized reviewers.

Do not claim verification if the college has not supplied records or an actual review process.

5.5 Mentorship requests

A student request should include the alumni reference, request type, a short message, the student's goal, and optional proposed time slots.

Request types: resume review, mock interview, technical guidance, career advice, higher studies, startup advice, or other.

Statuses: pending, accepted, declined, time_proposed, completed, cancelled.

Only the requesting student and addressed alumni can view request details; admins receive only the access needed for support and moderation.

Validate message length and prevent duplicate active requests where appropriate.

Do not expose a student's private contact details by default.

Allow alumni to set mentorship availability and pause new requests.

5.6 Mentor matching

For the MVP, use deterministic matching rules instead of claiming to have a trained AI model. Compare the student's selected goal and skills with alumni skills, role, industry, and mentorship topics. Return a match score and reasons, for example: “Works in your target industry” or “Offers mock interview guidance.”

Suggested initial score: 40% mentorship-topic match, 25% skill/role relevance, 20% industry or career-goal match, and 15% availability. These are initial product choices, not validated research findings. Normalize included signals to 0–100, handle missing fields transparently, and keep the weights in a documented module.

5.7 Opportunities and community

If time permits, alumni can post internships, referrals, events, and career resources. Label the source and verification status accurately. Opportunity posting should not be required for the core MVP, and the platform must not imply that a referral or job is guaranteed.

5.8 Authentication and roles

Support student, alumni, and admin roles.

Hash passwords with a suitable password-hashing library if password authentication is implemented.

Validate all inputs on the server and protect private routes.

Enforce profile ownership and role checks on every sensitive action.

Do not allow public registration to create an admin account.

Use seeded demo accounts for judging and keep credentials out of source control.

6. Non-Functional Requirements

Security and privacy

Validate request bodies, query parameters, route IDs, file uploads, and status transitions.

Use Helmet, restrictive CORS, request-size limits, and rate limits for authentication and request creation.

Keep secrets in environment variables and never expose server secrets in frontend bundles.

Use least-privilege database credentials and HTTPS in deployment.

Store verification documents in private storage; do not place them in public static folders.

Restrict evidence access to authorized reviewers and use short-lived links when supported.

Collect only the personal data needed for the product and define retention/deletion rules for evidence.

Keep audit records of verification decisions and avoid logging sensitive document contents.

Use generic public profile fields and separate private contact information.

Reliability

Centralized error-handling middleware.

Clear database health checks and visible startup failures.

Seed/reset command for reproducible demos.

Optional external API failure must not break discovery, requests, or admin review.

Accessibility and maintainability

Responsive desktop and mobile layouts, semantic labels, keyboard focus, and sufficient contrast.

Visible loading, empty, error, unauthorized, and success states.

Separate routes, controllers, models, validation, authorization, and matching logic.

Use clear naming and avoid oversized components or route files.

7. Recommended MERN Technology Stack

Layer

Recommendation

Frontend

React.js, Vite, Tailwind CSS, React Router

API client

Fetch or Axios; choose one consistently

Backend

Node.js, Express.js, Mongoose

Validation

Zod or express-validator; choose one

Authentication

Secure password hashing; JWT or session strategy documented

Security

Helmet, express-rate-limit, centralized error middleware

Database

MongoDB hosted or local for development

Evidence storage

Private object storage or controlled local demo storage; never public by default

Testing

Vitest/Jest and Supertest depending on team familiarity

Optional services

Email provider, calendar API, or AI API only after core flow is stable

Dependency discipline: do not introduce microservices, a separate ML backend, or complex state management unless the MVP demonstrates a concrete need.

8. Data Model Plan

8.1 User

name: required string.

email: normalized and unique.

passwordHash: only if password authentication is implemented; never return it.

role: student, alumni, or admin; restricted to supported values.

status: active or disabled.

createdAt, updatedAt.

8.2 AlumniProfile

userId: reference to User.

department, graduationYear, skills, currentRole, employer, industry, bio, mentorshipTopics.

availability: optional structured slots or availability flag.

collegeVerificationStatus: pending/verified/rejected/needs_more_info/unverified.

employmentVerificationStatus: unverified/pending/verified/rejected.

publicLinks: validated URLs, optional.

createdAt, updatedAt.

8.3 VerificationRequest

alumniProfileId: reference to AlumniProfile.

type: college_identity or employment.

evidenceRefs: private file references or authorized record-match reference.

status: pending/verified/rejected/needs_more_info.

submittedAt, reviewedBy, reviewedAt, reviewNote.

verificationMethod: college_record_match, document_review, approved_email_method, or other documented method.

Keep private evidence and reviewer notes out of public profile responses.

8.4 MentorshipRequest

studentUserId and alumniUserId.

requestType, message, studentGoal, proposedSlots.

status, responseMessage, acceptedSlot, createdAt, updatedAt, completedAt.

Optional outcome feedback after completion.

8.5 Optional models

Opportunity: only if alumni opportunity posting is implemented.

AuditLog: useful for security-sensitive admin decisions.

Notification: only if in-app or email notifications are actually implemented.

Do not create collections for features that are not in the agreed scope. Add indexes for unique emails, profile ownership, pending verification queues, and mentorship requests only where justified.

9. API Contract Plan

Use a versioned prefix such as /api/v1 and document the final route names in architecture.md.

Method

Endpoint

Purpose

GET

/api/v1/health

Application and database health

POST

/api/v1/auth/register

Register student or alumni account; never accept public admin role

POST

/api/v1/auth/login

Authenticate user

GET

/api/v1/users/me

Get current user's safe profile

GET

/api/v1/alumni

Paginated alumni search and filters

GET

/api/v1/alumni/:id

Public-safe alumni profile

PATCH

/api/v1/alumni/me

Update own alumni profile

POST

/api/v1/alumni/verification

Submit identity verification request

GET

/api/v1/alumni/me/verification

View own verification status

GET

/api/v1/admin/verifications

Admin-only pending review queue

GET

/api/v1/admin/verifications/:id

Admin-only request and authorized evidence view

PATCH

/api/v1/admin/verifications/:id

Admin-only approve/reject/request more information

POST

/api/v1/mentorship-requests

Student submits a request

GET

/api/v1/mentorship-requests/me

List requests the current user is allowed to see

PATCH

/api/v1/mentorship-requests/:id

Addressed alumni or requesting student updates permitted status

GET

/api/v1/recommendations/mentors

Optional rule-based mentor recommendations

Use consistent response shapes, correct HTTP status codes, pagination, ID validation, and safe error messages. The backend is the source of truth for roles, verification status, and request permissions.

10. Frontend Experience and Pages

10.1 Discover alumni

Headline explaining the value of the network.

Search and filters for skills, role, industry, department, graduation year, and mentorship availability.

Profile cards with clear identity and employment verification labels.

Recommended mentors with explainable match reasons, if implemented.

10.2 Alumni profile

Professional summary, skills, mentorship topics, and availability.

Separate college and employment verification states.

Request mentorship action and clear response expectations.

Private contact information and evidence are never exposed publicly.

10.3 Student dashboard

Mentorship requests grouped by pending, accepted, and completed.

Suggested alumni and saved profiles if time permits.

Clear request status and next action.

10.4 Alumni dashboard

Profile completion and verification status.

Incoming mentorship requests with accept, decline, or propose-time actions.

Availability settings and optional opportunity posting.

10.5 Admin verification dashboard

Counts for pending, approved, rejected, and needs-more-information requests.

Review queue with submitted profile details and private evidence access.

Authorized record-match checklist and decision controls.

Required reason for rejection or additional-information request.

Reviewer identity, timestamp, and audit history.

10.6 Shared UI states

Loading, no results, API failure, invalid input, successful submission, and unauthorized action.

Clear labels for demo/sample data and unverified information.

Accessible form labels, keyboard navigation, and responsive layouts.

11. Data and Demo Strategy

A convincing demo should use fictional alumni records and clearly marked demo evidence. Do not invent real graduates or imply that sample profiles have been genuinely verified.

Recommended demo coverage:

One alumni profile whose identity is pending review.

One fictional profile with a demo-only college-verified state.

One profile with college identity verified but employment unverified.

One rejected or needs-more-information verification request.

Several alumni with different skills, roles, industries, and mentorship topics.

A student request that can be accepted by an alumni demo account.

A seed/reset script and documented demo login accounts.

For a real deployment, use an authorized college graduate list or a documented evidence-review process. Do not use real personal documents in a public hackathon demo. Avoid scraping alumni profiles from professional networks.

12. AI / Intelligence Strategy

Required MVP intelligence

Deterministic mentor matching using skills, goals, industry, mentorship topics, and availability.

Transparent match reasons returned by the backend.

Verification status derived only from authorized admin decisions.

Request-status and basic engagement summaries.

Optional AI integration

An AI API may help draft a mentorship request or summarize an alumni biography, but it must not decide whether a person is a real graduate or currently employed. Keep API keys on the server, validate model output, rate-limit calls, and provide a deterministic fallback. AI-generated profile text must be reviewed before publication.

Document matching weights and test edge cases. Do not describe a deterministic matching score as a trained machine-learning prediction.

13. Security and Privacy Plan

Never allow users to submit their own role as admin through a public registration request.

Enforce role and ownership checks server-side for every protected route.

Do not trust client-submitted verification statuses, reviewer IDs, or role values.

Use private evidence storage and validate file type, size, and access permissions.

Keep audit logs for admin decisions and protect them from normal-user modification.

Avoid unnecessary collection of government ID numbers or sensitive personal data.

Provide a documented retention and deletion process for uploaded evidence.

Use environment variables and commit only .env.example.

Configure HTTPS, security headers, CORS, rate limits, and request-size limits.

Use fictional demo records and accounts during the presentation.

14. Testing and Acceptance Criteria

Backend checks

Server starts with valid environment variables and reports database health accurately.

Alumni search and filters work with pagination.

A student cannot access private evidence or admin routes.

A normal user cannot approve or modify their own verification status.

Only authorized admins can approve, reject, or request more information.

College identity and employment verification remain independent.

A student can create a mentorship request and only authorized participants can view it.

Invalid IDs, fields, statuses, and oversized inputs return safe errors.

Verification decisions record reviewer and timestamp.

Private fields, password hashes, tokens, and evidence URLs are not exposed in public responses.

Frontend checks

Alumni directory loads from the API and search/filter combinations work.

Profile displays verification labels accurately.

Verification request submission and admin review work end to end.

Mentorship request can be submitted and answered by the correct account.

Loading, empty, error, validation, and unauthorized states are visible.

Layout works at desktop and mobile widths with no critical console errors.

End-to-end acceptance criteria

A clean setup starts frontend and backend using documented commands.

Seeded alumni profiles appear in discovery.

A student opens a profile and sees separate verification states.

A student submits a mentorship request.

The addressed alumni account can respond.

An admin reviews a pending verification request and changes its status.

The profile badge updates based on the backend's saved decision.

Core flow works without AI, email, or calendar credentials.

No real personal documents or secrets are included in the repository.

The team can explain verification limitations and security controls.

15. Fifteen-Hour Delivery Strategy

Workstream

Target time

Deliverable

Scope freeze and repository setup

0.5 h

Agreed MVP, repo, environment template

Backend foundation and database

2 h

Express server, schemas, seed data, health endpoint

Authentication and role checks

1.5 h

Student/alumni/admin demo roles and protected routes

Alumni directory and search APIs

1.5 h

Profiles, filters, pagination

Verification workflow API

2 h

Submit request, admin queue, review decision, audit fields

Mentorship request API

1 h

Create and update requests with authorization

Frontend shell and discovery

2 h

Responsive directory, search, profile details

Admin review and mentorship UI

2 h

Review queue, decision actions, request flow

Integration and testing

1.5 h

End-to-end checks and bug fixes

Demo rehearsal and contingency

1 h

Reset data, rehearse demo, verify setup

Total

15 h

Demo-ready MVP target

This is a target, not a guarantee. If the core flow falls behind, remove optional recommendations and opportunity posting before cutting integration, security, or testing.

16. Explicitly Out of Scope for the 15-Hour MVP

Automated verification against private college systems without authorized integration.

Guaranteed identity or employment verification using AI or social-profile scraping.

Production-grade document OCR or biometric identity checks.

Full calendar synchronization and automated email delivery.

Live video calling, payments, and complex chat.

Multi-tenant college administration and large-scale analytics.

A trained recommendation model or separate ML service.

Public exposure of uploaded identity documents.

Complex alumni social feed unless the core flow is already stable.

17. Risks and Mitigations

Risk

Mitigation

No authorized alumni data

Use clearly labelled fictional demo records; seek permission before production.

Fake or misleading profiles

Use admin-reviewed evidence and clear, separate verification states.

Admin account abuse

Provision admins privately and enforce server-side role checks.

Sensitive evidence exposure

Private storage, restricted reviewer access, short-lived links, retention policy.

Alumni do not respond

Show availability, structured requests, and response status; validate engagement with users.

Scope becomes too large

Freeze P0 and defer AI, chat, calendar, and opportunity posting.

AI/email provider fails

Keep core functionality deterministic and independent of external APIs.

Frontend/backend mismatch

Agree on API contracts before parallel implementation.

Misleading trust claims

Show verification method/status and never claim more than was actually checked.

18. Team Workflow and Git Discipline

Use one shared repository and keep the main branch runnable.

Agree on models, roles, status enums, and API response contracts before parallel work.

Split work into backend/auth, directory/profile UI, and verification/mentorship workflow where team size allows.

Use short branches and descriptive commits.

Commit .env.example, never actual secrets or personal evidence.

Run relevant tests before merging and keep setup instructions current.

Review AI-generated code for security, assumptions, and correctness before accepting it.

19. Final Deliverables

Working MERN application with role-aware flows.

Seeded fictional alumni data and repeatable seed/reset command.

Responsive alumni discovery and profile pages.

Separate college identity and employment verification states.

Admin verification queue and review actions.

Mentorship request creation and response flow.

Secure configuration pattern and .env.example.

.gitignore and README with setup, environment variables, limitations, and demo steps.

Basic tests for authorization, verification state transitions, and request permissions.

Short rehearsed demo showing the complete core journey.

20. Product Principles

Trust must be earned through a documented process, not a badge design.

College identity verification and employment verification are separate claims.

Discovery should lead to useful interaction, not just profile views.

Use honest labels for unknown, pending, demo, and unverified data.

Protect private evidence and collect only necessary personal information.

Core functionality must work without optional external APIs.

Keep matching explainable and testable.

Prioritize a reliable end-to-end flow over a long feature list.

Never imply that mentorship, referrals, or jobs are guaranteed.