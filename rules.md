AlumniConnect AI — AI Coding Rules and Engineering Standards
Project: AlumniConnect AI
Primary stack: MongoDB, Express.js, React.js, Node.js, Tailwind CSS (MERN)
Delivery target: A coherent, demo-ready MVP built in a focused 15-hour window
Purpose: Mandatory rules for AI coding assistants and contributors working on AlumniConnect AI.
Related documents
- plan.md defines product scope and priority.
- architecture.md defines folder structure, data models, API contracts, and data flow.
- phase.md defines execution order, time budget, and verification gates.
- design-system.md defines visual design and reusable UI patterns.
- progress.md records completed work, blockers, deferred scope, and verification results.
If any referenced document does not exist, state that fact and work only from the documents that are actually available. Do not invent its contents.
1. Highest-Priority Working Rules
1. Read plan.md, rules.md, architecture.md, phase.md, design-system.md, and progress.md before implementing a phase. If a file is missing, explicitly identify it.
2. Work only on the current phase in phase.md, plus dependencies required to complete it.
3. Inspect the existing repository and relevant files before creating, replacing, or editing code.
4. Preserve working behavior. Make the smallest coherent change that satisfies the current requirement.
5. Do not build the entire application in one giant response or overwrite many files without checking their current contents.
6. Do not claim code works, tests pass, a server starts, a feature is complete, or a deployment succeeded unless it was actually verified.
7. If a command or test cannot be run, say so and provide the exact command the developer should run.
8. Do not silently change schemas, API contracts, dependency choices, roles, status values, or architecture. Explain the reason and update the relevant documentation before implementing a breaking change.
9. Do not add features simply because they are easy to generate.
10. If time is running out, defer optional features according to phase.md; do not sacrifice core integration, security checks, or final demo verification.
11. The frontend UI design MUST BE 100% IDENTICAL to the Google Stitch design project (`AlumniConnect Editorial Network UI`, `projects/14982706531093909212`), utilizing the exact color scheme (`#FAF9F5`, `#245C46`, `#B88B4A`, `#18251F`, `#E4E2DA`), typography (`Newsreader` + `Manrope`), and HTML structures detailed in `design-system.md` and saved in `design/stitch_screens/*.html`.
12. Security and privacy must be preserved: All `.env` files, API keys, credentials, tokens, and private user verification documents must remain in `.gitignore` and never exposed to the frontend or git.
2. Coding Style
Readable, maintainable code
- Write code a junior developer can understand and a senior developer can review quickly.
- Prefer descriptive names, small focused functions, early returns, and straightforward control flow.
- Avoid giant files, giant React components, dense one-liners, unnecessary abstraction, and premature generalization.
- Keep routes, controllers, services, validation, models, and response formatting separated according to the agreed architecture.
- Follow the repository's established naming and formatting conventions.
- Avoid unrelated reformatting and do not suppress warnings just to make output appear clean.
Comments policy
- Do not add comments to application source code.
- Do not add comments that narrate an obvious implementation or restate a function name.
- Keep explanations in Markdown documentation, clear names, and tests.
- Preserve meaningful existing legal, licensing, generated-code, or operational-warning comments. Ask before removing important existing comments.
- This rule does not prohibit README documentation, test descriptions, or useful commit messages.
Quality and honesty
- Produce original, understandable code; do not deliberately introduce mistakes to make it look human-written.
- Do not claim AI-generated code was manually written by a person.
- Do not create fake tests, fake verification evidence, or sample records that appear to represent real verified alumni.
3. Senior-Developer Decision Rules
Optimize for correctness, clarity, security, privacy, delivery risk, and maintainability—not the number of files or lines generated.
Before implementation:
1. Identify the exact user-visible behavior required by the current phase.
2. Identify inputs, outputs, dependencies, authorization requirements, and failure cases.
3. Check whether the repository already has a suitable implementation.
4. Choose the simplest solution that meets acceptance criteria.
5. Identify privacy and security implications, especially for alumni evidence and contact details.
6. Decide how the result will be verified.
During implementation:
- Keep changes limited to the current phase.
- Avoid unrelated refactors and premature optimization.
- Do not introduce microservices, a separate AI service, queues, additional databases, or complex state management without a documented requirement.
- Prefer one Express API and one MongoDB database for the MVP.
- Keep matching, eligibility, status-transition, and other testable business rules independent of Express handlers where practical.
- Never trust frontend-calculated roles, ownership, verification status, mentor-match scores, or review decisions.
- Distinguish user input, validated data, persisted records, private evidence, and public API response objects.
After implementation:
- Run the narrowest useful test first, then broader relevant checks.
- Review the diff for accidental deletions, secrets, personal data, and inconsistent field names.
- Report what changed and what was actually verified.
- List known limitations honestly.
- Do not start the next phase until exit criteria pass or the blocker is explicitly recorded.
4. Scope and Time-Management Rules
- plan.md is the product-scope source of truth.
- phase.md is the execution-order and time-budget source of truth.
- P0 features take priority over P1 and P2 features.
- The core product must work without AI, email, calendar, or employer-verification API credentials.
- Do not claim college identity verification or employment verification unless the corresponding process is genuinely implemented.
- Do not use a static frontend mock as a substitute for a failed backend integration.
- Test fixtures are acceptable only when isolated from the real app and clearly identified as fictional demo data.
- If an optional feature threatens the 15-hour target, defer it and record the decision.
- Reserve final time for integration, defect fixing, security review, and demo rehearsal.
- Prefer one complete end-to-end journey over multiple half-built features.
MVP flow that takes priority
1. A user discovers and filters alumni profiles.
2. The user opens an alumni profile and sees only fields intended for that audience.
3. An alumni user submits a college-identity verification request with the required information or evidence reference.
4. An authorized college administrator reviews the queue and approves, rejects, or requests more information.
5. The decision records the reviewer, timestamp, status, and appropriate review note.
6. A student submits a structured mentorship request to an alumni.
7. The addressed alumni can accept, decline, or propose a time.
8. The frontend uses the real backend API and shows loading, empty, success, validation, unauthorized, and error states.
5. Architecture and Repository Discipline
- Follow the agreed folder structure in architecture.md.
- Keep routes, controllers, services, models, middleware, validation, and utilities separated according to their responsibilities.
- Keep React UI components separate from API access and business logic where practical.
- Do not place database queries directly in React components.
- Do not put all backend logic in one route file.
- Use one API-client approach consistently.
- Use one validation library consistently unless a documented limitation requires a change.
- Use one package manager and commit its lockfile.
- Avoid circular dependencies, empty placeholder files, and unused abstractions.
- Keep filenames and exports consistent with repository conventions.
- Do not silently change endpoint names, response fields, schema fields, role names, or status enums.
- Keep private verification evidence out of public profile responses.
- Avoid storing a copy of identity documents when a secure reference or a less sensitive verification method is sufficient.
6. JavaScript and React Rules
- Use the JavaScript version and module system already configured by the project.
- Prefer const; use let only when reassignment is needed; avoid var.
- Use async/await when it makes asynchronous flows and error handling clearer.
- Handle rejected promises deliberately; do not leave floating promises that can fail silently.
- Avoid unexplained magic numbers, deeply nested callbacks, and complicated conditional expressions.
- Never use eval or dynamically execute untrusted strings.
- Do not use unsafe HTML rendering for user-controlled profile text, biography, skills, or mentorship messages.
- Keep React components focused and reasonably small.
- Use stable keys when rendering lists.
- Avoid effects for values that can be calculated during render.
- Prevent duplicate requests and handle stale requests where race conditions could affect the displayed data.
- Represent loading, empty, success, and error states explicitly.
- Do not hide API failures by silently falling back to fabricated alumni records.
- Use semantic HTML, associated form labels, keyboard-accessible controls, and visible focus states.
- Keep UI state predictable; add a state-management library only if a real need appears.
7. Node.js and Express Rules
- Separate application setup from the process entry point where the architecture calls for it.
- Register middleware in a deliberate order.
- Parse and validate request bodies, query parameters, route parameters, and IDs before using them in business logic or database operations.
- Keep route handlers thin; delegate reusable business logic to services.
- Use centralized error handling instead of duplicating response logic in every route.
- Do not expose stack traces, filesystem paths, environment values, database URIs, or internal details in production responses.
- Use appropriate HTTP status codes and a consistent response/error format.
- Set reasonable request/body-size limits.
- Add a health endpoint that does not reveal secrets.
- Handle database startup failures explicitly.
- Never swallow exceptions and return fake success responses.
- Keep server logs useful but free of passwords, tokens, evidence contents, and unnecessary personal information.
8. MongoDB and Mongoose Rules
- Define schemas for persisted entities and validate required fields, lengths, ranges, enums, and relationships.
- Normalize email addresses and other fields where appropriate.
- Add indexes for justified query patterns and uniqueness constraints.
- Do not accept client-provided MongoDB operators or raw query objects.
- Do not pass arbitrary request objects directly into Mongoose filters or update operations.
- Build filters from an allowlist of validated fields; allowlist sort fields and directions.
- Validate document IDs before querying.
- Use explicit update-field allowlists to prevent mass assignment.
- Do not return internal fields that clients do not need; never return password hashes or private evidence references in public responses.
- Handle duplicate-key and validation errors without leaking internals.
- Use appropriate unique indexes for email and any business rule that requires uniqueness.
- Make seed/reset scripts repeatable and safe to run more than once.
- Use only fictional demo data. Never label a real alumnus as verified in a seed file.
- Do not store secrets or unnecessary sensitive personal data in MongoDB.
Suggested domain entities
Follow architecture.md if it defines different names or relationships. The MVP may use:
- User: normalized email, password hash, role, account status, timestamps.
- AlumniProfile: public career and education details, skills, graduation year, mentorship topics, availability, verification-status fields.
- VerificationRequest: request type, private evidence reference if needed, status, reviewer, review timestamps, method, and review note.
- MentorshipRequest: requesting student, addressed alumni, goal, message, proposed slots, status, and timestamps.
Do not merge college identity verification with employer or job verification. These are different claims and require separate evidence and status.
9. Security Rules — Mandatory Baseline
Security begins in the backend foundation phase, not at the end.
Secrets and configuration
- Keep credentials in environment variables or the deployment provider's secret manager.
- Commit .env.example with placeholder values only.
- Never commit .env, access tokens, database URIs, private keys, API keys, or real user credentials.
- Never expose server secrets through React variables or client-side bundles.
- Validate required environment variables at startup.
- Use separate development and deployment configuration when practical.
- Rotate any secret that is accidentally exposed; deleting it from the latest commit alone is not enough.
HTTP and browser security
- Configure Helmet or equivalent security headers.
- Configure CORS for intended frontend origins only. Do not combine wildcard origins with credentialed requests.
- Set reasonable JSON/body-size limits.
- Use HTTPS for deployment.
- Validate external links and URL protocols.
- If cookie-based authentication is selected, configure secure cookie attributes and evaluate CSRF protections.
- Avoid unsafe HTML injection and untrusted HTML rendering.
Validation and injection resistance
- Validate request bodies, query parameters, route parameters, IDs, and external-provider output.
- Reject unexpected fields on sensitive writes or explicitly select allowed fields.
- Never concatenate user input into database queries or shell commands.
- Normalize and bound string lengths; validate URL protocols and numerical ranges.
- Treat AI-generated text as untrusted input and validate it before storage or display.
Rate limiting and abuse prevention
- Add general API rate limiting suitable for the MVP.
- Use stricter limits for login, registration, verification-request creation, and mentorship-request creation where appropriate.
- Limit request body size and any AI prompt/output size.
- Do not allow unlimited external API calls per user.
- Prefer maintained middleware over a home-made rate limiter.
Authentication and authorization
Apply account-related rules only if authentication is in scope, but every implemented protected action must meet them.
- Hash passwords using a maintained password-hashing library; never store or log plaintext passwords.
- Use a documented token/session strategy and keep access tokens out of URLs.
- Protect private routes on the server; hiding a button in React is not authorization.
- Check roles and record ownership on every protected read/write.
- Never trust a client-submitted role, user ID, reviewer ID, or verification flag.
- Only an authorized administrator may approve, reject, or request more information on a verification request.
- An alumni user may manage only their own profile and requests, subject to the agreed permissions.
- A student must not alter another user's mentorship request.
- Return generic authentication failure messages and rate-limit authentication routes.
- Do not invent a custom cryptography scheme.
- If authentication is not implemented, do not show fake login controls or claim protected actions are secure.
Verification and evidence privacy
- Collect only evidence necessary for the stated verification purpose.
- Do not put identity documents, private evidence URLs, personal contact details, or review notes in public alumni responses.
- Restrict evidence access to authorized reviewers and the relevant account owner, according to the product's policy.
- Do not log evidence contents or sensitive personal information.
- Keep college identity verification separate from employment verification.
- A verified college identity does not prove a current employer, job title, salary, or professional credential.
- Never describe an alumni profile as verified merely because the user signed in or supplied a document.
- Record who made an administrative decision and when.
- Clearly document any demo-only verification shortcut; do not present it as a production-grade verification process.
10. Authentication and Data Privacy Principles
- Collect only data needed for a visible product feature.
- Explain the purpose of profile fields and mentorship preferences.
- Do not collect sensitive personal data for a demo.
- Keep private profile fields accessible only to authorized users.
- Public alumni-directory endpoints must not return private account fields, password hashes, private evidence, or administrative notes.
- Do not use real student/alumni passwords or personal data in seed files.
- Use fictional demo accounts and clearly identified sample profiles.
- Do not claim college-email verification, document verification, or employer verification unless that exact flow is implemented.
- Do not expose private contact details by default; use an intentional, documented visibility rule.
- Document known privacy limitations before presenting the MVP.
11. Verification and Mentorship Business Rules
Verification
- Keep verification status transitions in one backend module or service.
- Use only the agreed statuses, for example pending, verified, rejected, and needs_more_info.
- Validate allowed transitions and prevent unauthorized or contradictory decisions.
- Store reviewer identity and decision timestamp for administrative decisions.
- Do not let the frontend set the final verification status.
- Keep college identity verification distinct from employment verification.
- Treat uploaded or linked evidence as untrusted input; validate type, size, and access if file uploads are implemented.
- Avoid retaining evidence longer than required by the documented policy.
- Test approval, rejection, request-more-information, invalid transitions, unauthorized decisions, and missing requests.
Mentorship
- Keep mentorship status transitions in one backend module or service.
- Use only agreed values, for example pending, accepted, declined, time_proposed, completed, and cancelled.
- Check that the acting user is the request's student, addressed alumni, or authorized administrator for the action being performed.
- Validate proposed dates and times; document timezone assumptions.
- Do not claim a meeting is booked unless a real confirmation workflow exists.
- Keep private messages and contact details visible only to the appropriate participants.
- Test invalid transitions, unauthorized access, unknown users, invalid dates, and duplicate submissions.
Recommendations and AI
- Core discovery, verification, and mentorship flows must work without an AI provider.
- Keep any mentor-matching formula in one backend module and document its inputs.
- Use deterministic rules for the MVP unless a model is deliberately added and evaluated.
- Explain recommendation reasons where feasible.
- Do not describe rule-based matching as machine learning.
- Do not claim AI summaries or recommendations verify a person's identity, employer, qualifications, or trustworthiness.
- Do not send unnecessary personal information to third-party AI services.
12. Dates, Time Zones, and Unknown Values
- Store dates in a consistent standard representation and document timezone assumptions.
- Display dates and times clearly in the UI.
- Validate mentorship availability and proposed meeting slots.
- Test deadline and time-boundary cases.
- Do not invent graduation years, employers, job titles, verification dates, or availability.
- Distinguish missing information from a negative result.
- Display unknown fields as “Not provided” or an equivalent—not as an assumed value.
- Never show a mentorship meeting as confirmed if it is only proposed.
13. API Contract Rules
- Use the API prefix and routes documented in architecture.md.
- Use consistent response and error shapes and correct status codes.
- Paginate potentially large alumni collections and set a maximum page size.
- Allowlist filters and sort fields.
- Do not expose internal document structure unnecessarily.
- Validate IDs before database access.
- Keep response fields consistent between frontend and backend.
- Update architecture/API documentation before a breaking contract change.
- Never return stack traces, password hashes, private evidence, or secrets.
- Do not report a successful mutation unless it actually succeeded.
- Ensure verification and mentorship endpoints enforce authorization on the server.
14. Testing and Verification Rules
- Test pure business logic first: verification status transitions, role/ownership rules, mentorship transitions, and date validation.
- Test invalid input and error cases, not only happy paths.
- Test authorization for admin-only verification decisions and participant-only mentorship actions.
- Test pagination, filters, sorting, unknown IDs, and empty results.
- Test that public profile responses omit private fields.
- Test repeatable seed/reset behavior.
- Run relevant tests after modifying related code.
- Run a production frontend build before declaring frontend completion.
- Use manual end-to-end checks when automated end-to-end tooling is not practical within the time limit.
- Do not claim tests pass unless they were run and passed.
- Do not delete or weaken tests to make the build green.
- If the environment prevents a test from running, report the limitation and give the exact command needed.
15. Git and .gitignore Rules
Create .gitignore before adding dependencies or generated files. Adapt entries to the actual repository. At minimum, ignore:
node_modules/
.env
.env.*
!.env.example
dist/
build/
coverage/
logs/
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*
*.sqlite
*.sqlite3
*.db
tmp/
temp/
pids/
*.pid
*.seed
.vscode/
.idea/
.DS_Store
Thumbs.db
.cache/
.eslintcache
.vite/
Git rules
- Commit the lockfile for the selected package manager.
- Never commit node_modules, build output, local logs, credentials, private evidence, or real database dumps.
- Do not ignore .env.example.
- Review git status before every commit and inspect staged changes before committing.
- Do not rewrite shared Git history unless the team explicitly agrees.
- Use meaningful commit messages and avoid unrelated generated files.
- If a secret is committed, revoke/rotate it immediately and clean repository history when appropriate.
16. Dependency Rules
- Add a dependency only when it solves a current requirement.
- Prefer maintained packages with a clear purpose.
- Check compatibility with the installed Node.js version and existing project setup.
- Do not install multiple libraries that solve the same problem.
- Do not upgrade all dependencies during a feature phase.
- If an install fails, read the actual error before changing versions or deleting files.
- Commit the lockfile.
- Do not introduce Redux, a UI framework beyond the agreed design stack, a second database, a queue, or microservices without a demonstrated need.
- Keep the project within the chosen MERN stack.
17. UI and Accessibility Rules
- Make the primary action clear on each screen.
- Use consistent spacing, typography, color, and component behavior according to design-system.md.
- Keep the directory and profile pages readable; avoid an overloaded dashboard.
- Design mobile layouts as well as desktop layouts.
- Use semantic buttons and links for their intended actions.
- Associate labels with inputs and show validation errors near the relevant fields.
- Ensure controls are keyboard-accessible and visibly focused.
- Use adequate color contrast; do not use color alone to convey verification status or errors.
- Provide loading, empty, success, unauthorized, and failure states.
- Never show an active button for an unimplemented action; remove it or clearly disable it.
- Do not show a “verified” badge without a backend-supported verification status.
- Make the distinction between college identity verification and employment verification understandable in the UI.
- Avoid decorative animation that threatens the 15-hour delivery target.
18. AI Assistant File-Editing Protocol
Before changing code, the AI assistant must:
1. State the current phase and its exit criteria.
2. Inspect the relevant existing files.
3. Identify the smallest set of files needed.
4. Check dependencies and contracts with adjacent modules.
5. Explain any required deviation from the architecture before applying it.
After changing code, report:
- Files created or modified.
- What behavior changed.
- Commands and tests actually run.
- Test/build results.
- Assumptions made.
- Known defects and limitations.
- Whether the phase's exit criteria pass.
- The next recommended action.
The AI assistant must not:
- Invent successful test results.
- Claim deployment, email delivery, AI credentials, or verification integrations are configured without evidence.
- Replace the entire project when a small patch is sufficient.
- Change working code for unrelated stylistic preferences.
- Silently add optional features.
- Expose private keys, tokens, evidence, or user data in its answer.
- Move on from a failed phase without recording the blocker.
19. Definition of “Done” for a Change
A change is done only when:
- It meets the current phase requirement.
- Inputs are validated and relevant failure paths are handled.
- Existing behavior has not been accidentally broken.
- The relevant test or manual verification has been run.
- Code is readable and consistent with the architecture.
- No secret or unnecessary sensitive data was introduced.
- Authorization and ownership checks are enforced where needed.
- API contracts and documentation are updated if necessary.
- Remaining limitations are documented honestly.