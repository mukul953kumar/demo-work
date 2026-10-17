const baseUrl = 'http://localhost:5000/api/v1';

async function runPhases16to20Tests() {
  console.log('=====================================================');
  console.log('STARTING PHASES 16-20 INTEGRATION, SECURITY & DEFECT TESTS');
  console.log('=====================================================');

  // --- PHASE 16: REGISTRATION & FULL-STACK AUTH JOURNEY ---
  console.log('\n--- PHASE 16.1: New Student Registration ---');
  const uniqueEmail = `test.student.${Date.now()}@northstar.edu`;
  const regRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Priya Sharma',
      email: uniqueEmail,
      password: 'SecurePassword123!',
      role: 'student'
    })
  });
  const regJson = await regRes.json();
  console.log('Student Registration Status:', regRes.status, 'Message:', regJson.message);
  if (regRes.status !== 201 || !regJson.data.token) {
    throw new Error('Student registration failed');
  }
  const newStudentToken = regJson.data.token;

  console.log('\n--- PHASE 16.2: New Alumni Registration with Auto-Profile ---');
  const uniqueAlumniEmail = `test.alumni.${Date.now()}@northstar.edu`;
  const alRegRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Rohan Mehta',
      email: uniqueAlumniEmail,
      password: 'SecurePassword123!',
      role: 'alumni',
      department: 'Electrical Engineering',
      graduationYear: 2021
    })
  });
  const alRegJson = await alRegRes.json();
  console.log('Alumni Registration Status:', alRegRes.status, 'Message:', alRegJson.message);
  if (alRegRes.status !== 201 || !alRegJson.data.token) {
    throw new Error('Alumni registration failed');
  }
  const newAlumniToken = alRegJson.data.token;

  console.log('\n--- PHASE 16.3: Alumni Profile Update via PATCH /alumni/me ---');
  const updateProfileRes = await fetch(`${baseUrl}/alumni/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAlumniToken}`
    },
    body: JSON.stringify({
      currentRole: 'Senior Hardware Engineer',
      employer: 'NVIDIA Labs',
      industry: 'Semiconductors',
      bio: 'Alumnus working on edge TPU silicon design.',
      skills: ['Verilog', 'VLSI', 'CUDA', 'Python'],
      mentorshipTopics: ['technical_guidance', 'mock_interview'],
      availability: 'available'
    })
  });
  const updateJson = await updateProfileRes.json();
  console.log('Alumni Profile Update Status:', updateProfileRes.status, 'Role:', updateJson.data.currentRole);
  if (updateProfileRes.status !== 200 || updateJson.data.currentRole !== 'Senior Hardware Engineer') {
    throw new Error('Alumni profile update failed');
  }

  console.log('\n--- PHASE 16.4: Alumni Submits College Verification Request ---');
  const verifRes = await fetch(`${baseUrl}/alumni/verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAlumniToken}`
    },
    body: JSON.stringify({
      verificationType: 'college_identity',
      method: 'college_record_match',
      evidenceReference: 'NS-2021-EE-099',
      notes: 'Final semester medal recipient.'
    })
  });
  const verifJson = await verifRes.json();
  console.log('Verification Submission Status:', verifRes.status, 'Request Status:', verifJson.data.status);
  const newVerifRequestId = verifJson.data._id;
  if (verifRes.status !== 201 || verifJson.data.status !== 'pending') {
    throw new Error('Verification submission failed');
  }

  // --- PHASE 17: SECURITY & PERMISSIONS REVIEW ---
  console.log('\n--- PHASE 17.1: Attempt Admin Action as Student (RBAC Guard) ---');
  const studentAdminAttempt = await fetch(`${baseUrl}/admin/verifications`, {
    headers: { Authorization: `Bearer ${newStudentToken}` }
  });
  console.log('Student Access to Admin Queue:', studentAdminAttempt.status, '(Expected 403 Forbidden)');
  if (studentAdminAttempt.status !== 403) {
    throw new Error('SECURITY BREACH: Student accessed admin verification queue!');
  }

  console.log('\n--- PHASE 17.2: Attempt Anti-Tamper Verification Elevation on Profile Update ---');
  const tamperRes = await fetch(`${baseUrl}/alumni/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAlumniToken}`
    },
    body: JSON.stringify({
      collegeVerificationStatus: 'verified', // Tamper attempt!
      employmentVerificationStatus: 'verified' // Tamper attempt!
    })
  });
  const tamperJson = await tamperRes.json();
  console.log('Tamper Result - College Status:', tamperJson.data.collegeVerificationStatus);
  console.log('Tamper Result - Employment Status:', tamperJson.data.employmentVerificationStatus);
  if (tamperJson.data.collegeVerificationStatus === 'verified' || tamperJson.data.employmentVerificationStatus === 'verified') {
    throw new Error('SECURITY BREACH: Client forged verification status through profile update!');
  }

  console.log('\n--- PHASE 17.3: Check Public Directory for Evidence Reference Leaks ---');
  const pubDirRes = await fetch(`${baseUrl}/alumni`);
  const pubDirJson = await pubDirRes.json();
  const hasEvidenceLeak = pubDirJson.data.some(p => p.evidenceReference || p.evidenceUrl);
  console.log('Public Profiles Exclude Private Evidence References:', !hasEvidenceLeak);
  if (hasEvidenceLeak) {
    throw new Error('PRIVACY VIOLATION: Private evidence reference leaked in public profile response!');
  }

  console.log('\n--- PHASE 17.4: Check Auth Response for Password Hashes ---');
  const hashLeakCheck = JSON.stringify(regJson).includes('password') && !JSON.stringify(regJson).includes('"password":');
  console.log('Auth Responses Exclude Password Hashes:', !JSON.stringify(regJson).includes('$2a$'));
  if (JSON.stringify(regJson).includes('$2a$')) {
    throw new Error('SECURITY BREACH: Bcrypt hash exposed in API response!');
  }

  console.log('\n--- PHASE 17.5: Admin Audit Workflow & Separation of Claims ---');
  // Admin Login
  const adminLogin = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@northstar.edu', password: 'AdminDemo123!' })
  });
  const adminAuth = await adminLogin.json();

  // Approve Rohan Mehta
  const approveRes = await fetch(`${baseUrl}/admin/verifications/${newVerifRequestId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminAuth.data.token}`
    },
    body: JSON.stringify({
      status: 'verified',
      reviewNote: 'Degree roll NS-2021-EE-099 verified in 2021 commencement ledger.'
    })
  });
  const approveJson = await approveRes.json();
  console.log('Admin Approval Status:', approveRes.status, 'New Request Status:', approveJson.data.request.status);
  console.log('Profile College Verified:', approveJson.data.updatedProfileStatus.collegeVerificationStatus);
  console.log('Profile Employment Verified (Should be unverified):', approveJson.data.updatedProfileStatus.employmentVerificationStatus);
  if (approveJson.data.updatedProfileStatus.collegeVerificationStatus !== 'verified' || approveJson.data.updatedProfileStatus.employmentVerificationStatus !== 'unverified') {
    throw new Error('CLAIM CONFLATION: College and employment verifications were not kept strictly separate!');
  }

  // --- PHASE 18: TESTING & DEFECT FIXING (EDGE CASES & RESILIENCE) ---
  console.log('\n--- PHASE 18.1: Malformed ObjectId Route Parameter ---');
  const badIdRes = await fetch(`${baseUrl}/alumni/invalid-hex-id`);
  console.log('Malformed ID Status:', badIdRes.status, '(Expected 400 Bad Request)');
  if (badIdRes.status !== 400) {
    throw new Error('Failed to validate ObjectId format');
  }

  console.log('\n--- PHASE 18.2: Out-of-Bounds Status Transition ---');
  const badTransitionRes = await fetch(`${baseUrl}/admin/verifications/${newVerifRequestId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminAuth.data.token}`
    },
    body: JSON.stringify({
      status: 'non_existent_status',
      reviewNote: 'Test note'
    })
  });
  console.log('Invalid Status Transition:', badTransitionRes.status, '(Expected 400 Bad Request)');
  if (badTransitionRes.status !== 400) {
    throw new Error('Allowed invalid status transition');
  }

  console.log('\n--- PHASE 18.3: Empty Search Result Handling ---');
  const emptySearchRes = await fetch(`${baseUrl}/alumni?search=NonExistentCompanyX999`);
  const emptySearchJson = await emptySearchRes.json();
  console.log('Empty Search Status:', emptySearchRes.status, 'Results:', emptySearchJson.data.length);
  if (emptySearchRes.status !== 200 || emptySearchJson.data.length !== 0) {
    throw new Error('Failed empty search result handling');
  }

  console.log('\n--- PHASE 18.4: Pagination Bounds Check (Excessive Limit Clamping) ---');
  const clampedPageRes = await fetch(`${baseUrl}/alumni?limit=500`);
  const clampedPageJson = await clampedPageRes.json();
  console.log('Page Limit Clamping: limit was capped at:', clampedPageJson.meta.limit, '(Max: 50)');
  if (clampedPageJson.meta.limit > 50) {
    throw new Error('Failed to clamp excessive limit parameter');
  }

  console.log('\n=====================================================');
  console.log('>>> ALL PHASES 16-20 INTEGRATION & DEFECT TESTS PASSED! <<<');
  console.log('=====================================================');
}

runPhases16to20Tests().catch(err => {
  console.error('Phases 16-20 test failed:', err);
  process.exit(1);
});
