# AlumniConnect AI — Hackathon Demo & Rehearsal Guide

> **Core Value Proposition:** Beyond a static directory — a high-trust, verified academic alumni network with structured mentorship, explainable AI matching, and independent registrar audits.
> **Design Theme:** Google Stitch *Warm Editorial Minimalism* (`#FAF9F5` Ivory, `#044430` Forest Green, `#7D571B` Antique Brass, `Newsreader` Serif & `Manrope` Sans).

---

## 1. Running Services & Setup

Make sure both backend and frontend servers are running:

| Component | Port | URL |
| :--- | :--- | :--- |
| **Backend API** | `5000` | `http://localhost:5000/api/v1/health` |
| **Frontend Web App** | `5173` | `http://localhost:5173/` |

To reset the database to pristine demo state at any time:
```bash
cd backend
npm run seed
```

---

## 2. Rehearsal Walkthrough (3-Minute Storyline)

### Act 1: The Student Experience (Alex Rivera)
1. **Open** `http://localhost:5173/`.
2. Notice the **Editorial Masthead**: *“AlumniConnect AI — Northstar Institute & Affiliated Colleges”*.
3. **Search & Filter:**
   - Type `Stripe` or `Kubernetes` into the search bar.
   - Click the **Filter Rail**: select **Computer Science**, filter by **Accepting Sessions**.
   - Notice the distinct badges: **`COLLEGE VERIFIED`** vs unverified employment claims.
4. **Alumni Profile & Mentorship Request:**
   - Click on **Marcus Vance** (Principal Engineer @ Stripe).
   - Review his verified academic credentials, graduation era (Class of 2018), and background.
   - In the modal form, select **Mock Interview**, specify the goal (*"Distributed systems and queue architecture"*), write a polite message, propose meeting slots, and click **Submit Mentorship Request**.
   - A success banner confirms the request was recorded.

### Act 2: Explainable Mentor Matching (Phase 15 Engine)
1. In the top navigation, click **AI Match Engine**.
2. Select the **Technical Guidance** or **Resume Review** track.
3. Enter skills (e.g. `Distributed Systems, Go, Kubernetes`).
4. Click **Recalculate Matches**.
5. Observe the transparent, explainable score breakdown:
   - **40% Topic Match**: Directly offers guidance in selected track.
   - **25% Skill Match**: Verified overlap in technologies.
   - **20% Industry Alignment**: Active practitioner in sector.
   - **15% Availability**: Accepting student sessions.
6. Click **View & Request** directly from the match card to launch the modal.

### Act 3: The Alumni Response (Marcus Vance)
1. In the top-right header, open the **Persona Switcher** dropdown and click **Marcus Vance (Verified)**.
2. In the navigation, click **Mentorship Requests**.
3. Point out the incoming request from student **Alex Rivera**.
4. Click **Respond to Request**:
   - Choose **Accept**.
   - Confirm the proposed meeting slot: `Tuesday 4:00 PM EST`.
   - Add a note: *"Looking forward to reviewing your system design sketches!"*
   - Click **Send Response**. The status transitions to **Accepted**.

### Act 4: The Registrar Audit Workflow (Dean Eleanor Vance)
1. Switch to **Dean Eleanor Vance (Admin)** from the top-right switcher.
2. The UI automatically transitions to the **Registrar Audit Queue**.
3. Review the institutional audit ledger:
   - Pending candidates: **Sarah Chen** and **David Kalu**.
   - Metrics counter cards showing Pending, Verified, and Flagged counts.
4. Click **Review Application** on **Sarah Chen**:
   - Inspect the institutional reference ID: `NS-2017-CS-084`.
   - Check the verification method: `Institutional Registration Card`.
   - Choose **Verify & Issue Badge**.
   - Click **Submit Audit Decision**.
5. Notice Sarah Chen's status instantly updates to **Verified**, while emphasizing that her **Employment Claim remains separate and unverified**.

### Act 5: Alumni Self-Service & Verification Submission
1. Switch to **Sarah Chen (Pending)** or use the **"Sign In / Join"** button to register a new Alumni.
2. Navigate to **My Profile & Verification**.
3. Edit bio, update current role, and adjust mentorship tracks.
4. Use the **Submit Identity Evidence** drawer to submit registration credentials directly to the Registrar queue!

---

## 3. Demo Credentials Reference

| Persona | Email | Password | Primary Demo Role |
| :--- | :--- | :--- | :--- |
| **Student** | `student1@northstar.edu` | `StudentDemo123!` | Discovery, Matching, Mentorship requests |
| **Alumni (Verified)** | `marcus.vance@northstar.edu` | `AlumniDemo123!` | Mentorship inbox, accepting sessions |
| **Alumni (Audit)** | `sarah.chen@northstar.edu` | `AlumniDemo123!` | Profile editing, verification status check |
| **Admin** | `admin@northstar.edu` | `AdminDemo123!` | Registrar audit ledger, credential review |
