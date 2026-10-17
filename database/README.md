# AlumniConnect AI — Database Specifications & Seeds

This directory contains database schemas, initialization scripts, and standalone JSON seed datasets for **AlumniConnect AI**.

---

## 1. Database Overview

* **Database Engine:** MongoDB (v6.0+)
* **Default Database Name:** `alumniconnect_ai`
* **Default URI:** `mongodb://localhost:27017/alumniconnect_ai`
* **ORM / ODM:** Mongoose (v8.9+) in `backend/src/models/`

---

## 2. Collections & Schemas

### `users`
* `_id`: ObjectId
* `name`: String (Required, trimmed, max 100)
* `email`: String (Required, unique, normalized lowercase)
* `passwordHash`: String (Bcrypt hashed, select: false)
* `role`: String enum (`'student'`, `'alumni'`, `'admin'`)
* `status`: String enum (`'active'`, `'disabled'`)
* `createdAt`, `updatedAt`: Timestamps

### `alumniprofiles`
* `_id`: ObjectId
* `userId`: ObjectId (Ref `users`, unique index)
* `name`: String
* `avatarUrl`: String
* `department`: String (Indexed)
* `graduationYear`: Number (Indexed)
* `currentRole`: String
* `employer`: String
* `industry`: String (Indexed)
* `bio`: String
* `skills`: Array of Strings (Indexed)
* `mentorshipTopics`: Array of Strings (Indexed)
* `availability`: String enum (`'available'`, `'busy'`, `'paused'`)
* `collegeVerificationStatus`: String enum (`'unverified'`, `'pending'`, `'verified'`, `'rejected'`, `'needs_more_info'`)
* `employmentVerificationStatus`: String enum (`'unverified'`, `'pending'`, `'verified'`, `'rejected'`)
* `publicLinks`: Array of `{ title, url }`
* `isDemoData`: Boolean
* `createdAt`, `updatedAt`: Timestamps

### `verificationrequests`
* `_id`: ObjectId
* `alumniProfileId`: ObjectId (Ref `alumniprofiles`, indexed)
* `userId`: ObjectId (Ref `users`, indexed)
* `type`: String enum (`'college_identity'`, `'employment'`)
* `evidenceRefs`: Array of `{ type, referenceId, label, privateStoragePath }`
* `status`: String enum (`'pending'`, `'verified'`, `'rejected'`, `'needs_more_info'`)
* `verificationMethod`: String enum (`'college_record_match'`, `'document_review'`, `'approved_email_method'`, `'other'`)
* `submittedAt`: Date
* `reviewedBy`: ObjectId (Ref `users`, nullable)
* `reviewedAt`: Date (nullable)
* `reviewNote`: String
* `isDemoData`: Boolean
* `createdAt`, `updatedAt`: Timestamps

### `mentorshiprequests`
* `_id`: ObjectId
* `studentId`: ObjectId (Ref `users`, indexed)
* `alumniId`: ObjectId (Ref `users`, indexed)
* `alumniProfileId`: ObjectId (Ref `alumniprofiles`, indexed)
* `requestType`: String enum (`'resume_review'`, `'mock_interview'`, `'technical_guidance'`, `'career_advice'`, `'higher_studies'`, `'startup_advice'`, `'other'`)
* `message`: String (Max 1000)
* `studentGoal`: String (Max 500)
* `proposedSlots`: Array of Strings
* `status`: String enum (`'pending'`, `'accepted'`, `'declined'`, `'time_proposed'`, `'completed'`, `'cancelled'`)
* `responseMessage`: String
* `acceptedSlot`: String
* `completedAt`: Date
* `isDemoData`: Boolean
* `createdAt`, `updatedAt`: Timestamps

---

## 3. Seed Files (`database/seeds/`)

* [`users.json`](./seeds/users.json) — Fictional students, alumni, and registrar administrator accounts.
* [`alumni.json`](./seeds/alumni.json) — 5 diverse alumni profiles spanning verified, pending, and unverified states.
* [`verification_requests.json`](./seeds/verification_requests.json) — Sample pending and clarification-needed audit submissions.

---

## 4. Reset & Seed Commands

To populate the database using the Node.js runner:
```bash
cd backend
npm run seed
```
