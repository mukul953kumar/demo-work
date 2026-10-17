AlumniConnect AI --- Phase-Wise Execution Plan
Project: AlumniConnect AI
Execution budget: 15 hours total
Build order: Backend first → core logic → security baseline → frontend →
integration → demo
Primary stack: MongoDB, Express.js, React.js, Node.js, Tailwind CSS
Reference: Use this file as the execution checklist. Keep product scope,
coding rules, and architecture/API contracts in separate plan.md,
rules.md, and architecture.md files if the repository uses them.
1. How to Use This File
This file is the phase-by-phase checklist for building AlumniConnect AI
in a focused 15-hour window. Complete phases in order unless a phase
explicitly depends on another phase's output. Do not begin a new feature
while a blocking issue remains in the current phase.
For every phase: 1. Read the objective, required inputs, and exit
criteria. 2. Implement only the listed scope. 3. Run the stated
verification steps. 4. Fix blocking failures before moving forward. 5.
Update the completion checklist. 6. Record deferred features and known
limitations.
Time allocations are targets, not permission to skip verification. If
the project falls behind, cut optional features from the bottom of the
priority list. Do not remove final integration and demo-rehearsal time.
Status convention: - [ ] Not started. - [x] Completed and
verified. - [~] Partially complete; known limitations documented.
Only mark a phase complete after its exit criteria pass.
2. Fixed MVP Scope
Required for the demo
- [ ] Backend starts reliably and connects to MongoDB.
- [ ] Reproducible fictional demo alumni profiles are seeded.
- [ ] Alumni directory supports search, practical filters, pagination,
  and sorting.
- [ ] Alumni profile details are returned correctly.
- [ ] College identity verification status is separate from employment
  verification status.
- [ ] Alumni can submit a college-identity verification request.
- [ ] Admin can view a pending verification queue and approve, reject,
  or request more information.
- [ ] Verification decisions record reviewer and timestamp.
- [ ] Student can submit a structured mentorship request to an alumni.
- [ ] Addressed alumni can accept, decline, or propose a time.
- [ ] Frontend discovery, profile, admin review, and mentorship
  screens use the real backend API.
- [ ] Loading, empty, validation, unauthorized, and error states are
  present.
- [ ] Baseline validation, safe errors, security headers, CORS, rate
  limits, and role checks are configured.
- [ ] Core demo works without AI, email, calendar, or
  employer-verification API credentials.
- [ ] Setup, seed/reset, and demo steps are documented.
Optional only after the required flow works
- [ ] Rule-based mentor recommendations with understandable match
  reasons.
- [ ] Opportunity posts for internships, referrals, and events.
- [ ] Basic engagement metrics.
- [ ] Email notifications.
- [ ] AI-assisted request drafting or profile summaries.
Do not implement an optional item merely because it appears in a concept
deck. It must fit the remaining time without destabilizing the required
flow.
3. Fifteen-Hour Timeline at a Glance
  Phase                                  Time budget Main output
  01. Scope freeze and                   0:00--0:30 Agreed MVP and
  repository setup                                   runnable repository
  02. Backend                            0:30--1:00 Express server and
  bootstrap                                          scripts
  03. Environment and                    1:00--1:30 Safe configuration
  database                                           and MongoDB
                                                     connection
  04. Models and seed                    1:30--2:15 User, alumni profile,
  data                                               verification request,
                                                     mentorship request,
                                                     demo data
  05. API foundation                     2:15--3:00 Routes, validation,
                                                     error handling
  06. Alumni discovery                   3:00--3:45 Search, filters,
  API                                                pagination, details
  07. Verification                       3:45--4:45 Submit request, admin
  workflow API                                       queue, decision
                                                     actions
  08. Mentorship                         4:45--5:30 Create and respond to
  workflow API                                       requests
  09. Matching logic                     5:30--6:00 Optional
  and date handling                                  deterministic
                                                     matching helper
  10. Security                           6:00--6:45 Headers, CORS, rate
  baseline                                           limits, authorization
  11. Backend                            6:45--7:30 Tested, documented
  verification and API                               API contract
  freeze                                             
  12. Frontend                           7:30--8:15 React shell, routing,
  bootstrap                                          API client
  13. Alumni discovery                   8:15--9:30 Searchable alumni
  UI                                                 feed and profile
  14. Verification and                  9:30--11:15 Admin queue and
  mentorship UI                                      request workflow
  15. Optional                         11:15--12:00 Matching reasons or
  features                                           opportunities if core
                                                     flow is stable
  16. Frontend/backend                 12:00--13:00 Complete main user
  integration                                        journey
  17. Security and                     13:00--13:30 Sensitive-data and
  permissions review                                 role checks
  18. Testing and                      13:30--14:00 Stable demo flow
  defect fixing                                      
  19. Demo setup and                   14:00--14:30 Repeatable
  rehearsal                                          presentation
  20. Buffer and final                 14:30--15:00 Final acceptance
  verification                                       checklist
4. Rules for AI-Assisted Implementation
Use these instructions whenever asking an AI coding assistant to
implement a phase:
1. Read the current project files and relevant plan/rules/architecture
   documents before editing.
2. Work only on the current phase and its explicitly listed
   dependencies.
3. Inspect existing files before changing them; do not recreate the
   project blindly.
4. Follow the agreed architecture and API contract.
5. Prefer simple, readable, maintainable code over clever abstractions.
6. Do not add unrelated features, libraries, services, or files.
7. Do not use mock frontend data to conceal a broken backend. Mock data
   is permitted only for documented isolated tests or clearly labelled
   demo seed data.
8. Do not hardcode secrets, credentials, tokens, production URLs, or
   real personal data.
9. Do not claim a phase is complete until its verification checklist
   passes.
10. After each phase, report: files created/changed, behavior
    implemented, commands/tests run, results, known limitations,
    security considerations, next phase, and remaining time.
11. If a command fails, diagnose the actual error instead of repeatedly
    changing unrelated code.
12. Preserve existing working behavior. Make the smallest coherent
    change.
13. Never silently skip a security requirement. If a control is
    deferred, state the reason and risk.
14. Keep the repository runnable at each phase gate.
15. Never claim that AI verified a person's identity, graduation, or
    employment.
16. College identity verification and employment verification must
    remain separate claims.
17. Do not expose uploaded evidence or private contact details through
    public APIs.
18. Do not use real alumni documents or personal data in the public
    demo.
5. Cut List If the Schedule Slips
Cut in this order: 1. AI-assisted summaries and request drafting. 2.
Opportunity posts and community feed. 3. Email notifications. 4.
Calendar integration and automated reminders. 5. Advanced recommendation
scoring. 6. Extra dashboard analytics. 7. Profile animations and
decorative UI. 8. Full authentication enhancements that are not needed
for the demo, while retaining appropriate protected-action checks. 9.
Extra search filters.
Do not cut: - Alumni discovery from the backend. - Alumni profile
details. - Separate college and employment verification states. - Admin
review and verification decision flow. - Mentorship request creation and
response. - Input validation and safe error handling. - Authorization
for admin actions and private evidence. - Final end-to-end integration
and demo rehearsal.
If behind schedule, deliver a smaller coherent implementation rather
than partially implementing every feature.
6. Team Coordination Checkpoints
For teams working in parallel: - Checkpoint A --- after Phase 01:
Agree on folder structure, schemas, status enums, API paths, and
response shapes. - Checkpoint B --- after Phase 04: Share exact
seeded profile examples and field names. - Checkpoint C --- after
Phase 11: Freeze the backend contract before frontend integration. -
Checkpoint D --- after Phase 14: Run the complete student → alumni →
admin journey. - Checkpoint E --- after Phase 17: Stop adding
features and focus on defects and demo reliability.
Parallel work is useful only when interfaces are agreed. Do not have
frontend and backend independently invent field names.
7. Completion Report Template
At the end of each phase, record: - Phase number/name: - Status: Not
started / Partial / Complete and verified - Files changed: - Implemented
behavior: - Verification commands and results: - Known limitations: -
Security considerations: - Next phase: - Remaining time budget:
This keeps the build measurable and prevents an AI assistant from
reporting success based only on code generation.
Phase-by-Phase Execution Checklist
Phase 01 --- Scope Freeze and Repository Setup
Time: 0:00--0:30
Priority: Critical
Objective
Agree on the smallest coherent MVP and confirm the repository is
runnable.
Tasks
- [ ] Inspect the existing repository before creating or overwriting
  files.
- [ ] Confirm the stack: React, Vite, Tailwind CSS, Node.js, Express,
  MongoDB, Mongoose.
- [ ] Freeze P0 scope from Section 2.
- [ ] Agree on roles: student, alumni, admin.
- [ ] Agree on verification statuses: pending, verified, rejected,
  needs_more_info.
- [ ] Agree on mentorship statuses: pending, accepted, declined,
  time_proposed, completed, cancelled.
- [ ] Confirm college identity and employment verification are
  separate.
- [ ] Create or update README and .env.example.
Verification
- [ ] Repository structure is understood.
- [ ] Team can explain the main demo journey.
- [ ] No real personal data or secrets are in the repository.
Exit criteria
The team has a fixed scope, known entry points, and agreed API/model
names.
Phase 02 --- Backend Bootstrap
Time: 0:30--1:00
Priority: Critical
Objective
Create a minimal Express server with reliable development scripts.
Tasks
- [ ] Initialize backend package only if one does not already exist.
- [ ] Add the smallest necessary dependency set.
- [ ] Create the server entry point.
- [ ] Add a health route such as GET /api/v1/health.
- [ ] Add JSON parsing with a body-size limit.
- [ ] Add centralized not-found and error-handling middleware.
- [ ] Add development and start scripts.
Verification
- [ ] Server starts using documented commands.
- [ ] Health endpoint returns a predictable response.
- [ ] Invalid route returns a safe 404 response.
- [ ] Unhandled errors do not reveal stack traces to public clients.
Exit criteria
The backend starts reliably without database-dependent routes crashing
the process.
Phase 03 --- Environment and Database
Time: 1:00--1:30
Priority: Critical
Tasks
- [ ] Read MongoDB connection string from environment variables.
- [ ] Validate required environment variables at startup.
- [ ] Create a single database connection module.
- [ ] Handle database connection failures clearly.
- [ ] Add .env to .gitignore.
- [ ] Add placeholders, not secrets, to .env.example.
Verification
- [ ] Valid configuration connects to MongoDB.
- [ ] Invalid configuration produces a clear startup error.
- [ ] Secrets do not appear in frontend code or logs.
- [ ] Health reporting distinguishes application status from database
  status.
Exit criteria
Database connection behavior is documented and reproducible.
Phase 04 --- Models and Seed Data
Time: 1:30--2:15
Priority: Critical
Objective
Create the minimum data model and reliable fictional data for the demo.
Tasks
- [ ] Create User model with normalized unique email, role, status,
  and timestamps.
- [ ] Create AlumniProfile model with department, graduation year,
  skills, role, employer, industry, mentorship topics, and
  availability.
- [ ] Create VerificationRequest model with type, private evidence
  references, status, reviewer, timestamps, method, and review note.
- [ ] Create MentorshipRequest model with student, alumni, request
  type, message, goal, proposed slots, status, and timestamps.
- [ ] Add indexes for unique email and common query paths where
  useful.
- [ ] Create deterministic seed and reset scripts.
- [ ] Seed fictional profiles with different skills and career paths.
- [ ] Clearly label seeded records as demo data.
- [ ] Include college-verified/employment-unverified, pending, and
  needs-more-information examples only as demo states.
Verification
- [ ] Seed can run more than once without uncontrolled duplicate data.
- [ ] Required fields and allowed status values are enforced.
- [ ] Public profile serialization omits private evidence, contact
  details, and password hashes.
- [ ] No real graduate is falsely represented as verified.
Exit criteria
Models and sample records support the planned demo without manual
database editing.
Phase 05 --- API Foundation
Time: 2:15--3:00
Priority: Critical
Tasks
- [ ] Use a consistent prefix such as /api/v1.
- [ ] Separate routes, controllers, validation, and models where
  appropriate.
- [ ] Define consistent success and error response shapes.
- [ ] Validate route IDs, query parameters, request bodies, and
  allowed enum values.
- [ ] Add pagination defaults and maximum page sizes.
- [ ] Add role and ownership middleware placeholders, then enforce
  them on protected routes.
- [ ] Keep public profile responses separate from private
  admin/evidence responses.
Verification
- [ ] Invalid IDs and invalid payloads return safe 4xx errors.
- [ ] Unexpected errors return a generic 5xx response.
- [ ] No endpoint returns password hashes or private evidence
  references to public users.
- [ ] Pagination cannot request unbounded result sets.
Exit criteria
The API foundation is consistent enough to build discovery and workflow
endpoints.
Phase 06 --- Alumni Discovery API
Time: 3:00--3:45
Priority: Critical
Objective
Make alumni discoverable through real backend queries.
Tasks
- [ ] Implement GET /api/v1/alumni.
- [ ] Support text search across approved public fields such as name,
  skills, role, industry, and mentorship topics.
- [ ] Support filters for department, graduation year, industry, and
  availability.
- [ ] Support pagination and useful sorting.
- [ ] Implement GET /api/v1/alumni/:id.
- [ ] Return separate college identity and employment verification
  statuses.
- [ ] Handle missing optional profile fields honestly.
Verification
- [ ] Search and filters work independently and together.
- [ ] Empty results return an empty list and useful pagination
  metadata.
- [ ] Unknown optional values are not fabricated.
- [ ] Private data is not returned.
- [ ] Invalid IDs return a safe error.
Exit criteria
The frontend can discover and open alumni profiles using real API data.
Phase 07 --- Verification Workflow API
Time: 3:45--4:45
Priority: Critical
Objective
Implement a real admin-reviewed college identity workflow.
Tasks
- [ ] Implement POST /api/v1/alumni/verification.
- [ ] Allow an alumni user to submit their own college identity
  request.
- [ ] Validate evidence type and accept only private storage
  references or authorized record-match references.
- [ ] Implement GET /api/v1/alumni/me/verification.
- [ ] Implement admin-only GET /api/v1/admin/verifications.
- [ ] Implement admin-only GET /api/v1/admin/verifications/:id.
- [ ] Implement admin-only PATCH /api/v1/admin/verifications/:id.
- [ ] Support approve, reject, and needs-more-information decisions.
- [ ] Require an appropriate review note for rejection or
  further-information requests.
- [ ] Record reviewer ID, review timestamp, and verification method.
- [ ] Update the profile's college identity status from the saved
  admin decision.
- [ ] Keep employment verification unchanged when college identity is
  approved.
- [ ] Prevent duplicate or conflicting pending requests where
  appropriate.
Verification
- [ ] Student cannot review or approve a request.
- [ ] Alumni cannot change their own status by editing a request.
- [ ] Admin can review and save a valid decision.
- [ ] Decision history identifies the reviewer and time.
- [ ] Public profile shows the saved status after review.
- [ ] Evidence is accessible only to authorized reviewers.
- [ ] Employment status does not become verified automatically.
Exit criteria
The verification workflow can be demonstrated end to end with fictional
records and a real backend decision.
Phase 08 --- Mentorship Workflow API
Time: 4:45--5:30
Priority: Critical
Objective
Turn alumni discovery into a concrete interaction.
Tasks
- [ ] Implement POST /api/v1/mentorship-requests.
- [ ] Require the authenticated student to specify the alumni, request
  type, and concise message/goal.
- [ ] Implement GET /api/v1/mentorship-requests/me.
- [ ] Allow addressed alumni to accept, decline, or propose a time.
- [ ] Allow the requesting student to cancel a pending request where
  appropriate.
- [ ] Restrict request visibility to the student and addressed alumni,
  with narrowly scoped admin support access if needed.
- [ ] Validate status transitions and prevent unrelated users from
  modifying a request.
Verification
- [ ] Student can submit a request to an alumni profile.
- [ ] Unrelated users cannot view or change that request.
- [ ] Addressed alumni can respond.
- [ ] Invalid transitions and duplicate active requests are handled
  safely.
- [ ] Request status persists after refresh.
Exit criteria
A student and alumni demo account can complete the request-and-response
flow.
Phase 09 --- Mentor Matching and Date Logic
Time: 5:30--6:00
Priority: Important; simplify or defer if behind
Tasks
- [ ] If core APIs are stable, implement a deterministic mentor
  matching helper.
- [ ] Compare mentorship topics, skills/role, industry/career goal,
  and availability.
- [ ] Return a score and readable reasons.
- [ ] Handle missing fields without fabricating a match.
- [ ] Keep weights documented and easy to change.
- [ ] If scheduling is included, validate proposed time slots and
  timezone assumptions.
Verification
- [ ] A mentor with matching topics ranks above an unrelated mentor in
  the test fixture.
- [ ] Match reasons correspond to actual profile fields.
- [ ] Missing data is handled consistently.
- [ ] No AI credentials are required.
Exit criteria
Recommendations are explainable and deterministic, or the feature is
explicitly deferred.
Phase 10 --- Security Baseline
Time: 6:00--6:45
Priority: Critical
Tasks
- [ ] Configure Helmet/security headers.
- [ ] Configure CORS for the intended frontend origin.
- [ ] Apply rate limits, especially to authentication and
  request-submission routes.
- [ ] Set request body-size limits.
- [ ] Validate body, query, route parameters, IDs, and status
  transitions.
- [ ] Enforce role and ownership checks server-side.
- [ ] Ensure public endpoints do not expose private user data.
- [ ] Keep uploaded evidence in private storage with controlled
  access.
- [ ] Confirm environment files and secrets are ignored.
- [ ] Review error responses and logs for sensitive data leaks.
- [ ] If password authentication is included, verify secure password
  hashing and protected routes.
- [ ] Do not create a public admin-registration path.
Verification
- [ ] Excessive requests receive a rate-limit response.
- [ ] Disallowed origins cannot read credentialed responses.
- [ ] Oversized request bodies are rejected.
- [ ] Student and alumni accounts cannot access admin actions.
- [ ] Private data and secrets are not returned.
- [ ] Unauthorized requests are rejected.
Exit criteria
The API has a reasonable MVP security baseline and documented remaining
limitations.
Phase 11 --- Backend Verification and Freeze
Time: 6:45--7:30
Priority: Critical gate
Tasks
- [ ] Run backend smoke tests.
- [ ] Test listing, filters, profile details, verification submission,
  admin decisions, and mentorship requests.
- [ ] Test invalid IDs, empty results, missing fields, invalid
  statuses, and database errors.
- [ ] Confirm seed data supports the demo story.
- [ ] Record exact API paths, query parameters, response fields, and
  error shapes.
- [ ] Fix blocking backend defects.
- [ ] Update architecture.md if implementation differs from the
  original plan.
- [ ] Do not rename API fields casually after this phase.
Verification checklist
- [ ] Server starts from documented commands.
- [ ] Database connects and seed command works.
- [ ] Alumni listing and details work.
- [ ] Verification workflow works.
- [ ] Mentorship workflow works.
- [ ] Security middleware and authorization are active.
- [ ] API contract is written down.
Exit criteria
The frontend can be built against a stable API contract. Do not proceed
with known blocking API defects.
Phase 12 --- Frontend Bootstrap
Time: 7:30--8:15
Priority: Critical
Tasks
- [ ] Initialize React with Vite only if not already present.
- [ ] Configure Tailwind CSS using the installed version's official
  setup.
- [ ] Add routing only if multiple pages require it.
- [ ] Create a shared API client configuration.
- [ ] Create an app shell with header/navigation and content
  container.
- [ ] Add shared loading, error, empty-state, and unauthorized
  components.
- [ ] Define reusable styles and components.
- [ ] Keep API base URL in frontend environment configuration without
  secrets.
Verification
- [ ] Frontend starts locally.
- [ ] Production build succeeds.
- [ ] Responsive shell renders.
- [ ] Missing backend produces a visible error state, not a blank
  page.
Exit criteria
A clean React shell is ready for the real alumni feed.
Phase 13 --- Alumni Discovery Page
Time: 8:15--9:30
Priority: Critical
Tasks
- [ ] Fetch alumni from the listing endpoint.
- [ ] Render cards with name, graduation year, department, role,
  skills, mentorship topics, and verification labels where available.
- [ ] Add search input with deliberate submit/debounce behavior.
- [ ] Add selected MVP filters.
- [ ] Add sorting controls if supported by the API.
- [ ] Keep filter state and API query parameters synchronized.
- [ ] Add loading, empty, and error states.
- [ ] Add action to open alumni details.
- [ ] Ensure college and employment verification labels are distinct.
- [ ] Do not hardcode UI-only profiles to conceal API failures.
Verification
- [ ] Feed uses API data.
- [ ] Search and filters update results correctly.
- [ ] Clearing filters restores expected results.
- [ ] No-results state is understandable.
- [ ] Unverified and missing fields are labelled honestly.
- [ ] Desktop and mobile layouts remain usable.
Exit criteria
A student can search the real API-backed directory and open a profile.
Phase 14 --- Verification and Mentorship UI
Time: 9:30--11:15
Priority: Critical
Admin verification interface
- [ ] Display pending requests with submitted profile details.
- [ ] Provide a controlled evidence-view action for authorized admins.
- [ ] Show comparison checklist or record-match result.
- [ ] Provide approve, reject, and request-more-information actions.
- [ ] Require a reason where appropriate.
- [ ] Display saved decision status, reviewer, and timestamp.
- [ ] Show a clear empty state when no requests are pending.
Alumni verification interface
- [ ] Show current verification status.
- [ ] Allow submission or resubmission where appropriate.
- [ ] Explain that college identity and employment verification are
  separate.
- [ ] Do not expose evidence publicly.
Mentorship interface
- [ ] Add request form on the alumni profile.
- [ ] Show the student's request list and current statuses.
- [ ] Show incoming requests on the alumni dashboard.
- [ ] Add accept, decline, and propose-time actions.
- [ ] Show success, validation, and API error messages.
Verification
- [ ] Admin actions call the real backend.
- [ ] The saved profile badge updates after a decision.
- [ ] Unauthorized users cannot use admin controls successfully.
- [ ] Mentorship request is visible to the correct participants.
- [ ] No private evidence appears in public profile UI.
Exit criteria
The core student → alumni → admin experience is connected to the real
API.
Phase 15 --- Optional Features
Time: 11:15--12:00
Priority: Optional
Choose only one: - \(\) Add explainable mentor recommendations. - \(\)
Add alumni opportunity posts. - \(\) Add basic engagement counts. - \(\) Add a simple in-app notification indicator.
Do not start optional work if any P0 acceptance criterion is failing.
Verification
- [ ] Optional feature has a clear fallback.
- [ ] Core user journey still works.
- [ ] No new security or data-leak issue is introduced.
Exit criteria
Optional work is either verified or explicitly deferred.
Phase 16 --- Frontend/Backend Integration
Time: 12:00--13:00
Priority: Critical
Tasks
- [ ] Configure the frontend API base URL.
- [ ] Confirm frontend request fields match the frozen API contract.
- [ ] Verify the student → profile → mentorship request journey.
- [ ] Verify the alumni response journey.
- [ ] Verify the admin verification review journey.
- [ ] Check authentication/role transitions in the demo environment.
- [ ] Handle API failures without losing the whole page.
- [ ] Remove any temporary mock data not explicitly used for isolated
  tests.
Verification
- [ ] Main journeys work from a clean browser session.
- [ ] Refreshing a page does not fabricate or lose saved backend
  status.
- [ ] API errors are visible and understandable.
- [ ] No blocking browser-console or server errors remain.
Exit criteria
The MVP works end to end using real backend responses.
Phase 17 --- Security and Permissions Review
Time: 13:00--13:30
Priority: Critical
Tasks
- [ ] Attempt admin actions with a student account.
- [ ] Attempt to change another user's profile or verification status.
- [ ] Attempt to access another user's mentorship request.
- [ ] Check public profile responses for private contact information
  and evidence references.
- [ ] Confirm password hashes and secrets are never returned.
- [ ] Confirm file access is private and limited to authorized
  reviewers.
- [ ] Confirm verification status can only be changed through the
  admin workflow.
- [ ] Confirm employment verification is not automatically granted.
Exit criteria
No known critical authorization or sensitive-data exposure issue blocks
the demo. Document any remaining limitation honestly.
Phase 18 --- Testing and Defect Fixing
Time: 13:30--14:00
Priority: Critical
Tasks
- [ ] Test no-results and backend-unavailable states.
- [ ] Test malformed or missing data.
- [ ] Test long names, biographies, and skill lists.
- [ ] Test pending, verified, rejected, and needs-more-information
  states.
- [ ] Test invalid status transitions and unauthorized actions.
- [ ] Test student, alumni, and admin journeys.
- [ ] Check desktop and mobile widths.
- [ ] Run tests and production build.
- [ ] Fix critical and high-impact issues first.
- [ ] Avoid introducing new features during this phase.
Severity order
1. App does not start or crashes.
2. Core flow cannot be completed.
3. Wrong or misleading verification status.
4. Security or private-data exposure.
5. Broken layout or unusable controls.
6. Minor visual polish.
Exit criteria
No known blocker prevents the planned demo scenario.
Phase 19 --- Demo Setup and Rehearsal
Time: 14:00--14:30
Priority: Critical
Tasks
- [ ] Reset and seed the demo database.
- [ ] Verify required environment variables.
- [ ] Start frontend and backend using documented commands.
- [ ] Prepare a fictional student profile and a matching alumni
  profile.
- [ ] Prepare one pending verification request for admin review.
- [ ] Prepare one mentorship request that can be accepted by an alumni
  demo account.
- [ ] Rehearse the narrative: problem → alumni discovery →
  verification status → mentorship request → alumni response → admin
  review.
- [ ] Clearly state which data is fictional and which features are not
  implemented.
- [ ] Keep a local demo path in case hosted deployment fails.
- [ ] Avoid last-minute dependency upgrades or refactors.
Exit criteria
The team can repeat the demo without improvising setup steps.
Phase 20 --- Buffer and Final Verification
Time: 14:30--15:00
Priority: Critical
Tasks
- [ ] Run the clean startup procedure one final time.
- [ ] Verify the main user journey.
- [ ] Confirm .env and secrets are not staged in Git.
- [ ] Confirm .gitignore covers dependencies, builds, logs,
  coverage, local environment files, and editor/OS clutter as
  appropriate.
- [ ] Confirm README setup commands are accurate.
- [ ] Confirm seed data is reproducible.
- [ ] Check the final build.
- [ ] Check for critical console/server errors.
- [ ] Record known limitations honestly.
- [ ] Stop feature development.
Final acceptance checklist
- [ ] Alumni discovery loads from the backend.
- [ ] Search and filters work.
- [ ] Alumni profile details work.
- [ ] College identity and employment verification are shown
  separately.
- [ ] Admin verification decisions work.
- [ ] Mentorship request and response work.
- [ ] Loading, empty, validation, unauthorized, and error states work.
- [ ] Security baseline is active.
- [ ] App starts from documented commands.
- [ ] Demo works without optional external API credentials.
- [ ] Fictional demo data is clearly labelled.
- [ ] Team can explain the system and its limitations.