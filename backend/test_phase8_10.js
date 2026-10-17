async function testPhases8Through10() {
  const baseUrl = 'http://localhost:5000/api/v1';

  console.log('=====================================================');
  console.log('STARTING PHASES 8, 9 & 10 INTEGRATION & SECURITY TESTS');
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
  const student1Auth = await login('student1@northstar.edu', 'StudentDemo123!');
  const student2Auth = await login('student2@northstar.edu', 'StudentDemo123!');
  const marcusAuth = await login('marcus.vance@northstar.edu', 'AlumniDemo123!');
  const elenaAuth = await login('elena.rostova@northstar.edu', 'AlumniDemo123!');

  console.log('✔ Authenticated test accounts: Admin, Student 1, Student 2, Marcus Vance, Dr. Elena Rostova');

  // ----------------------------------------------------
  // PHASE 08 TESTS: Mentorship Workflow API
  // ----------------------------------------------------
  console.log('\n--- PHASE 8.1: POST /api/v1/mentorship-requests (Student Submits Request to Dr. Elena) ---');
  const reqRes = await fetch(`${baseUrl}/mentorship-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${student1Auth.token}`
    },
    body: JSON.stringify({
      alumniId: elenaAuth.user.id,
      requestType: 'higher_studies',
      studentGoal: 'Planning applications for PhD programs in generative AI and diffusion foundations.',
      message: 'Dear Dr. Rostova, I have been following your research on alignment and diffusion. Would you have 30 minutes to advise on formulating competitive research proposals?',
      proposedSlots: ['Monday 3:00 PM EST', 'Wednesday 5:00 PM EST']
    })
  });
  const reqJson = await reqRes.json();
  console.log(`Creation Status: ${reqRes.status}`);
  console.log(`Created Request ID: ${reqJson.data?._id}, Status: ${reqJson.data?.status}`);
  if (reqRes.status !== 201 || reqJson.data?.status !== 'pending') {
    throw new Error('Failed to create mentorship request');
  }
  const createdRequestId = reqJson.data._id;

  console.log('\n--- PHASE 8.2: Duplicate Mentorship Request Prevention ---');
  const dupReqRes = await fetch(`${baseUrl}/mentorship-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${student1Auth.token}`
    },
    body: JSON.stringify({
      alumniId: elenaAuth.user.id,
      requestType: 'resume_review',
      studentGoal: 'Duplicate test',
      message: 'Should be rejected as duplicate'
    })
  });
  const dupReqJson = await dupReqRes.json();
  console.log(`Duplicate Request Status: ${dupReqRes.status} (Expected 409 Conflict)`, dupReqJson.message);
  if (dupReqRes.status !== 409) {
    throw new Error('Allowed duplicate active mentorship request');
  }

  console.log('\n--- PHASE 8.3: GET /api/v1/mentorship-requests/me as Student ---');
  const studentListRes = await fetch(`${baseUrl}/mentorship-requests/me`, {
    headers: { Authorization: `Bearer ${student1Auth.token}` }
  });
  const studentListJson = await studentListRes.json();
  console.log(`Student Requests Found: ${studentListJson.data.length}`);
  const hasElenaRequest = studentListJson.data.some((r) => r.alumniId?.email === 'elena.rostova@northstar.edu');
  console.log(`Student sees request addressed to Dr. Elena: ${hasElenaRequest}`);
  if (!hasElenaRequest) {
    throw new Error('Student request not listed in student dashboard');
  }

  console.log('\n--- PHASE 8.4: Privacy & Ownership RBAC (Student 2 Accesses Student 1 Request) ---');
  const unauthAccessRes = await fetch(`${baseUrl}/mentorship-requests/${createdRequestId}`, {
    headers: { Authorization: `Bearer ${student2Auth.token}` }
  });
  const unauthAccessJson = await unauthAccessRes.json();
  console.log(`Unrelated Student Access Status: ${unauthAccessRes.status} (Expected 403 Forbidden)`, unauthAccessJson.message);
  if (unauthAccessRes.status !== 403) {
    throw new Error('SECURITY VIOLATION: Unrelated user was able to access private mentorship request!');
  }

  console.log('\n--- PHASE 8.5: PATCH /api/v1/mentorship-requests/:id (Dr. Elena Accepts Request) ---');
  const acceptRes = await fetch(`${baseUrl}/mentorship-requests/${createdRequestId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${elenaAuth.token}`
    },
    body: JSON.stringify({
      status: 'accepted',
      acceptedSlot: 'Monday 3:00 PM EST',
      responseMessage: 'Delighted to help! Looking forward to reviewing your proposal ideas on Monday.'
    })
  });
  const acceptJson = await acceptRes.json();
  console.log(`Accept Status: ${acceptRes.status}`);
  console.log(`Updated Status: ${acceptJson.data?.status}, Accepted Slot: ${acceptJson.data?.acceptedSlot}`);
  if (acceptJson.data?.status !== 'accepted') {
    throw new Error('Alumni was unable to accept request');
  }

  // ----------------------------------------------------
  // PHASE 09 TESTS: Deterministic Matching & Recommendations
  // ----------------------------------------------------
  console.log('\n--- PHASE 9.1: GET /api/v1/recommendations/mentors (Deterministic Match) ---');
  const recRes = await fetch(
    `${baseUrl}/recommendations/mentors?requestType=mock_interview&skills=Go,Kubernetes&industry=Fintech&limit=3`
  );
  const recJson = await recRes.json();
  console.log(`Recommendations Status: ${recRes.status}, Returned: ${recJson.data.length}`);
  const topMentor = recJson.data[0];
  console.log(`Top Ranked Mentor: ${topMentor?.name} (Score: ${topMentor?.matchScore}/100)`);
  console.log(`Match Reasons: ${JSON.stringify(topMentor?.matchReasons)}`);

  if (topMentor?.name !== 'Marcus Vance') {
    throw new Error(`Expected Marcus Vance to rank #1 for Go/Kubernetes/Fintech mock interview, but got ${topMentor?.name}`);
  }
  if (!topMentor.matchReasons || topMentor.matchReasons.length === 0) {
    throw new Error('Match reasons were missing from recommendation output');
  }

  console.log('\n--- PHASE 9.2: Recommendations with AI Research Criteria ---');
  const aiRecRes = await fetch(
    `${baseUrl}/recommendations/mentors?requestType=higher_studies&skills=PyTorch,Python&industry=Artificial Intelligence`
  );
  const aiRecJson = await aiRecRes.json();
  const topAiMentor = aiRecJson.data[0];
  console.log(`Top Ranked AI Mentor: ${topAiMentor?.name} (Score: ${topAiMentor?.matchScore}/100)`);
  if (topAiMentor?.name !== 'Dr. Elena Rostova') {
    throw new Error(`Expected Dr. Elena Rostova to rank #1 for AI research, but got ${topAiMentor?.name}`);
  }

  // ----------------------------------------------------
  // PHASE 10 TESTS: Security Baseline
  // ----------------------------------------------------
  console.log('\n--- PHASE 10.1: Security Headers (Helmet Check) ---');
  const headRes = await fetch(`${baseUrl}/health`);
  const headers = headRes.headers;
  console.log(`X-Content-Type-Options: ${headers.get('x-content-type-options')}`);
  console.log(`X-Frame-Options: ${headers.get('x-frame-options')}`);
  console.log(`Strict-Transport-Security: ${headers.get('strict-transport-security')}`);
  if (!headers.get('x-content-type-options')) {
    throw new Error('Helmet security headers missing');
  }

  console.log('\n--- PHASE 10.2: Rate Limiting Headers ---');
  console.log(`RateLimit-Limit: ${headers.get('ratelimit-limit')}`);
  console.log(`RateLimit-Remaining: ${headers.get('ratelimit-remaining')}`);
  if (!headers.get('ratelimit-limit')) {
    throw new Error('Rate limiting headers missing from API responses');
  }

  console.log('\n--- PHASE 10.3: Request Body Size Limit (Oversized Payload Rejection) ---');
  // Send 150KB payload (Limit is 100KB)
  const largeString = 'X'.repeat(150 * 1024);
  const largeBodyRes = await fetch(`${baseUrl}/mentorship-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${student1Auth.token}`
    },
    body: JSON.stringify({
      alumniId: marcusAuth.user.id,
      requestType: 'other',
      message: largeString,
      studentGoal: 'Exceeding size limit'
    })
  });
  console.log(`Oversized Request Status: ${largeBodyRes.status} (Expected 413 Payload Too Large)`);
  if (largeBodyRes.status !== 413) {
    throw new Error(`Expected 413 Payload Too Large, received ${largeBodyRes.status}`);
  }

  console.log('\n=====================================================');
  console.log('>>> ALL PHASES 8, 9 & 10 TESTS PASSED WITH 100% SUCCESS! <<<');
  console.log('=====================================================');
}

testPhases8Through10().catch((err) => {
  console.error('\n❌ TEST FAILURE:', err);
  process.exit(1);
});
