async function testPhase6and7() {
  const baseUrl = 'http://localhost:5000/api/v1';

  console.log('=====================================================');
  console.log('STARTING PHASE 6 & 7 INTEGRATION & SECURITY TESTS');
  console.log('=====================================================');

  // Helper function for logins
  async function login(email, password) {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(`Login failed for ${email}: ${json.message}`);
    }
    return { token: json.data.token, user: json.data.user, profile: json.data.profile };
  }

  const adminAuth = await login('admin@northstar.edu', 'AdminDemo123!');
  const studentAuth = await login('student1@northstar.edu', 'StudentDemo123!');
  const marcusAuth = await login('marcus.vance@northstar.edu', 'AlumniDemo123!');
  const anitaAuth = await login('anita.desai@northstar.edu', 'AlumniDemo123!');

  console.log('✔ Logged in demo accounts: Admin, Student, Marcus Vance, Anita Desai');

  // ----------------------------------------------------
  // PHASE 06 TESTS: Alumni Discovery API
  // ----------------------------------------------------
  console.log('\n--- PHASE 6.1: GET /api/v1/alumni (Paginated Directory) ---');
  const dirRes = await fetch(`${baseUrl}/alumni?page=1&limit=10`);
  const dirJson = await dirRes.json();
  console.log(`Directory Status: ${dirRes.status}, Total Found: ${dirJson.meta?.total}`);
  if (!dirJson.success || dirJson.data.length === 0) {
    throw new Error('Alumni directory returned empty or failed');
  }

  console.log('\n--- PHASE 6.2: GET /api/v1/alumni?search=Stripe (Text Search) ---');
  const searchRes = await fetch(`${baseUrl}/alumni?search=Stripe`);
  const searchJson = await searchRes.json();
  console.log(`Search Status: ${searchRes.status}, Found: ${searchJson.data.length}`);
  console.log(`Matched Alumni: ${searchJson.data[0]?.name} (${searchJson.data[0]?.employer})`);
  if (searchJson.data[0]?.name !== 'Marcus Vance') {
    throw new Error('Search for Stripe did not find Marcus Vance');
  }

  console.log('\n--- PHASE 6.3: GET /api/v1/alumni?collegeVerificationStatus=verified (Filter) ---');
  const filterRes = await fetch(`${baseUrl}/alumni?collegeVerificationStatus=verified`);
  const filterJson = await filterRes.json();
  console.log(`Verified Filter Status: ${filterRes.status}, Count: ${filterJson.data.length}`);
  const allVerified = filterJson.data.every((a) => a.collegeVerificationStatus === 'verified');
  console.log(`All returned profiles are verified: ${allVerified}`);
  if (!allVerified) {
    throw new Error('Filter returned unverified alumni');
  }

  console.log('\n--- PHASE 6.4: GET /api/v1/alumni/:id (Public Profile by ID) ---');
  const sampleId = dirJson.data[0].id;
  const profileRes = await fetch(`${baseUrl}/alumni/${sampleId}`);
  const profileJson = await profileRes.json();
  console.log(`Profile Detail Status: ${profileRes.status}`);
  console.log(`Profile Name: ${profileJson.data.name}`);
  console.log(`College Verification: ${profileJson.data.collegeVerificationStatus}`);
  console.log(`Employment Verification: ${profileJson.data.employmentVerificationStatus}`);
  // Check no passwordHash or private evidence exposed
  if (profileJson.data.passwordHash || profileJson.data.evidenceRefs) {
    throw new Error('SECURITY VIOLATION: Private evidence or password leaked in public profile!');
  }

  console.log('\n--- PHASE 6.5: GET /api/v1/alumni/invalid-id (Invalid ObjectId Safety) ---');
  const invalidIdRes = await fetch(`${baseUrl}/alumni/not-an-id`);
  const invalidIdJson = await invalidIdRes.json();
  console.log(`Invalid ID Status: ${invalidIdRes.status}`, invalidIdJson.message);
  if (invalidIdRes.status !== 400) {
    throw new Error('Invalid ObjectId did not return 400');
  }

  console.log('\n--- PHASE 6.6: PATCH /api/v1/alumni/me (Update Own Profile & Anti-Tamper) ---');
  const updateRes = await fetch(`${baseUrl}/alumni/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${marcusAuth.token}`
    },
    body: JSON.stringify({
      bio: 'Updated bio: Staff engineer with 8+ years experience in distributed storage systems.',
      availability: 'busy',
      // Anti-tamper attempt: trying to manually set college verification or change role
      collegeVerificationStatus: 'unverified',
      role: 'admin'
    })
  });
  const updateJson = await updateRes.json();
  console.log(`Update Status: ${updateRes.status}`);
  console.log(`Updated Bio: ${updateJson.data.bio.substring(0, 45)}...`);
  console.log(`Availability changed to: ${updateJson.data.availability}`);
  console.log(`Verification remains: ${updateJson.data.collegeVerificationStatus} (Anti-tamper verified)`);
  if (updateJson.data.collegeVerificationStatus === 'unverified') {
    throw new Error('SECURITY VIOLATION: Alumni was able to tamper with their own verification status!');
  }

  // ----------------------------------------------------
  // PHASE 07 TESTS: Alumni Verification Workflow API
  // ----------------------------------------------------
  console.log('\n--- PHASE 7.1: GET /api/v1/admin/verifications as Student (RBAC Check) ---');
  const studentQueueRes = await fetch(`${baseUrl}/admin/verifications`, {
    headers: { Authorization: `Bearer ${studentAuth.token}` }
  });
  const studentQueueJson = await studentQueueRes.json();
  console.log(`Student Access to Admin Queue Status: ${studentQueueRes.status} (Expected 403)`);
  if (studentQueueRes.status !== 403) {
    throw new Error('SECURITY VIOLATION: Student was allowed to access registrar queue!');
  }

  console.log('\n--- PHASE 7.2: GET /api/v1/admin/verifications as Admin (Queue Inspection) ---');
  const adminQueueRes = await fetch(`${baseUrl}/admin/verifications?status=pending`, {
    headers: { Authorization: `Bearer ${adminAuth.token}` }
  });
  const adminQueueJson = await adminQueueRes.json();
  console.log(`Admin Queue Status: ${adminQueueRes.status}, Pending Requests: ${adminQueueJson.data.length}`);
  const sarahReq = adminQueueJson.data.find((r) => r.userId?.name === 'Sarah Chen');
  if (!sarahReq) {
    throw new Error('Sarah Chen pending verification request not found in queue');
  }
  console.log(`Found Pending Submission for: ${sarahReq.userId?.name} (Evidence: ${sarahReq.evidenceRefs[0]?.label})`);

  console.log('\n--- PHASE 7.3: GET /api/v1/admin/verifications/:id (Single Request Inspection) ---');
  const singleReqRes = await fetch(`${baseUrl}/admin/verifications/${sarahReq._id}`, {
    headers: { Authorization: `Bearer ${adminAuth.token}` }
  });
  const singleReqJson = await singleReqRes.json();
  console.log(`Inspection Status: ${singleReqRes.status}`);
  console.log(`Private Reference ID: ${singleReqJson.data.evidenceRefs[0]?.referenceId}`);

  console.log('\n--- PHASE 7.4: PATCH /api/v1/admin/verifications/:id (Rejection requires note) ---');
  const rejectWithoutNoteRes = await fetch(`${baseUrl}/admin/verifications/${sarahReq._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminAuth.token}`
    },
    body: JSON.stringify({ status: 'rejected', reviewNote: '' })
  });
  const rejectWithoutNoteJson = await rejectWithoutNoteRes.json();
  console.log(`Reject Without Note Status: ${rejectWithoutNoteRes.status} (Expected 400)`, rejectWithoutNoteJson.message);
  if (rejectWithoutNoteRes.status !== 400) {
    throw new Error('Admin was able to reject verification without providing a reviewNote');
  }

  console.log('\n--- PHASE 7.5: PATCH /api/v1/admin/verifications/:id (Approve Sarah Chen) ---');
  const approveRes = await fetch(`${baseUrl}/admin/verifications/${sarahReq._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminAuth.token}`
    },
    body: JSON.stringify({
      status: 'verified',
      reviewNote: 'Verified enrollment ID NS-2017-CS-084 against Northstar Registrar SIS archive.'
    })
  });
  const approveJson = await approveRes.json();
  console.log(`Approve Status: ${approveRes.status}`);
  console.log(`Updated Request Status: ${approveJson.data.request.status}`);
  console.log(`Profile College Verification: ${approveJson.data.updatedProfileStatus.collegeVerificationStatus}`);
  console.log(`Profile Employment Verification: ${approveJson.data.updatedProfileStatus.employmentVerificationStatus} (Separate!)`);

  if (approveJson.data.updatedProfileStatus.collegeVerificationStatus !== 'verified') {
    throw new Error('Alumni profile was not marked verified upon approval');
  }
  if (approveJson.data.updatedProfileStatus.employmentVerificationStatus === 'verified') {
    throw new Error('POLICY BREACH: Employment verification was auto-verified upon college approval!');
  }

  console.log('\n--- PHASE 7.6: POST /api/v1/alumni/verification (Anita Desai Submits Request) ---');
  const submitRes = await fetch(`${baseUrl}/alumni/verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anitaAuth.token}`
    },
    body: JSON.stringify({
      type: 'college_identity',
      verificationMethod: 'college_record_match',
      evidenceRefs: [
        {
          type: 'enrollment_id',
          referenceId: 'NS-2019-IT-042',
          label: 'Northstar Institute Student ID Card'
        }
      ]
    })
  });
  const submitJson = await submitRes.json();
  console.log(`Submission Status: ${submitRes.status}`);
  console.log(`Created Request ID: ${submitJson.data._id}, Status: ${submitJson.data.status}`);

  console.log('\n--- PHASE 7.7: Duplicate Request Prevention ---');
  const dupRes = await fetch(`${baseUrl}/alumni/verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anitaAuth.token}`
    },
    body: JSON.stringify({
      type: 'college_identity',
      verificationMethod: 'document_review'
    })
  });
  const dupJson = await dupRes.json();
  console.log(`Duplicate Request Status: ${dupRes.status} (Expected 409 Conflict)`, dupJson.message);
  if (dupRes.status !== 409) {
    throw new Error('System allowed duplicate pending verification request');
  }

  console.log('\n--- PHASE 7.8: GET /api/v1/alumni/me/verification (Alumni History) ---');
  const historyRes = await fetch(`${baseUrl}/alumni/me/verification`, {
    headers: { Authorization: `Bearer ${anitaAuth.token}` }
  });
  const historyJson = await historyRes.json();
  console.log(`History Status: ${historyRes.status}, Requests Count: ${historyJson.data.length}`);
  console.log(`Latest Request Status: ${historyJson.data[0]?.status}`);

  console.log('\n=====================================================');
  console.log('>>> ALL PHASE 06 & 07 TESTS PASSED WITH 100% SUCCESS! <<<');
  console.log('=====================================================');
}

testPhase6and7().catch((err) => {
  console.error('\n❌ TEST FAILURE:', err);
  process.exit(1);
});
