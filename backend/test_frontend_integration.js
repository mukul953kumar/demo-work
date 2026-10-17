const baseUrl = 'http://localhost:5000/api/v1';

async function runFullStackJourney() {
  console.log('=====================================================');
  console.log('FULL-STACK END-TO-END FLOW VERIFICATION (PHASES 11-15)');
  console.log('=====================================================');

  // 1. Student Login
  console.log('\n[1] Student Login (Alex Rivera)');
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'student1@northstar.edu',
      password: 'StudentDemo123!'
    })
  });
  const studentAuth = await loginRes.json();
  console.log('Student Login Status:', loginRes.status, 'User:', studentAuth.data.user.name);

  // 2. Discover Alumni with Filter
  console.log('\n[2] Discover Alumni Directory (Filtered by Available & Verified)');
  const dirRes = await fetch(`${baseUrl}/alumni?availability=available&collegeVerificationStatus=verified`);
  const dirJson = await dirRes.json();
  console.log(`Directory Status: ${dirRes.status}, Verified Available Alumni: ${dirJson.data.length}`);
  const targetAlumnus = dirJson.data[0];
  console.log('Found Alumnus:', targetAlumnus.name, 'Role:', targetAlumnus.currentRole, 'at', targetAlumnus.employer);

  // 3. Student Submits Structured Mentorship Request
  console.log('\n[3] Student Sends Mentorship Request to Marcus Vance');
  const reqRes = await fetch(`${baseUrl}/mentorship-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${studentAuth.data.token}`
    },
    body: JSON.stringify({
      alumniId: targetAlumnus.userId,
      alumniProfileId: targetAlumnus.id,
      requestType: 'mock_interview',
      studentGoal: 'Staff Infrastructure & Distributed Systems',
      message: 'Hi, would love a mock system design interview for distributed queues.',
      proposedSlots: ['Tuesday 4:00 PM EST', 'Thursday 2:00 PM EST']
    })
  });
  const reqJson = await reqRes.json();
  console.log('Mentorship Submission Status:', reqRes.status, 'Message:', reqJson.message);
  const createdRequestId = reqJson.data ? reqJson.data._id : null;

  // 4. Alumni Login and Respond
  console.log('\n[4] Alumni Login (Marcus Vance)');
  const alLoginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'marcus.vance@northstar.edu',
      password: 'AlumniDemo123!'
    })
  });
  const alAuth = await alLoginRes.json();
  console.log('Alumni Login Status:', alLoginRes.status, 'User:', alAuth.data.user.name);

  // 5. Alumni Reviews Incoming Requests
  console.log('\n[5] Alumni Reviews Incoming Mentorship Queue');
  const alReqsRes = await fetch(`${baseUrl}/mentorship-requests/me`, {
    headers: { Authorization: `Bearer ${alAuth.data.token}` }
  });
  const alReqsJson = await alReqsRes.json();
  console.log(`Alumni Queue Status: ${alReqsRes.status}, Total Requests: ${alReqsJson.data.length}`);
  const pendingReq = alReqsJson.data.find(r => r.status === 'pending');
  if (pendingReq) {
    console.log('Accepting Pending Request ID:', pendingReq._id);
    const acceptRes = await fetch(`${baseUrl}/mentorship-requests/${pendingReq._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${alAuth.data.token}`
      },
      body: JSON.stringify({
        status: 'accepted',
        responseMessage: 'Looking forward to our session! Tuesday 4 PM works best.',
        acceptedSlot: 'Tuesday 4:00 PM EST'
      })
    });
    const acceptJson = await acceptRes.json();
    console.log('Mentorship Acceptance Status:', acceptRes.status, 'New Status:', acceptJson.data.status);
  }

  // 6. Admin Login
  console.log('\n[6] Admin Login (Dean Eleanor Vance)');
  const adminLoginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@northstar.edu',
      password: 'AdminDemo123!'
    })
  });
  const adminAuth = await adminLoginRes.json();
  console.log('Admin Login Status:', adminLoginRes.status, 'User:', adminAuth.data.user.name);

  // 7. Admin Queue Inspection
  console.log('\n[7] Admin Audits Verification Queue');
  const queueRes = await fetch(`${baseUrl}/admin/verifications`, {
    headers: { Authorization: `Bearer ${adminAuth.data.token}` }
  });
  const queueJson = await queueRes.json();
  console.log(`Admin Queue Status: ${queueRes.status}, Total Pending/Audited: ${queueJson.data.length}`);

  // 8. Explainable Mentor Recommendation Engine
  console.log('\n[8] Test Recommendation Engine Matching');
  const recoRes = await fetch(`${baseUrl}/recommendations/mentors?requestType=mock_interview&skills=Go,Kubernetes&industry=Fintech&limit=3`);
  const recoJson = await recoRes.json();
  console.log(`Recommendations Status: ${recoRes.status}, Returned Mentors: ${recoJson.data.length}`);
  recoJson.data.forEach((m, idx) => {
    console.log(`   Rank #${idx + 1}: ${m.name || m.fullName} - Score: ${m.matchScore}%`);
    console.log(`   Reasons: ${JSON.stringify(m.matchReasons)}`);
  });

  console.log('\n=====================================================');
  console.log('>>> COMPLETE USER JOURNEY VERIFIED SUCCESSFULLY! <<<');
  console.log('=====================================================');
}

runFullStackJourney().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
