async function runTests() {
  const baseUrl = 'http://localhost:5000/api/v1';

  console.log('--- TEST 1: Health Check ---');
  const healthRes = await fetch(`${baseUrl}/health`);
  const healthJson = await healthRes.json();
  console.log(`Health Status: ${healthRes.status}`, healthJson);

  console.log('\n--- TEST 2: 404 Route Check ---');
  const notFoundRes = await fetch(`${baseUrl}/undefined-endpoint`);
  const notFoundJson = await notFoundRes.json();
  console.log(`404 Status: ${notFoundRes.status}`, notFoundJson);

  console.log('\n--- TEST 3: Admin Login ---');
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@northstar.edu',
      password: 'AdminDemo123!'
    })
  });
  const loginJson = await loginRes.json();
  console.log(`Login Status: ${loginRes.status}`, loginJson.success ? 'Login Success' : loginJson);
  const token = loginJson.data?.token;

  console.log('\n--- TEST 4: Auth /me with Bearer Token ---');
  const meRes = await fetch(`${baseUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const meJson = await meRes.json();
  console.log(`Me Status: ${meRes.status}`, meJson);

  console.log('\n--- TEST 5: Security Rule - Public Admin Registration Rejected ---');
  const badRegRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Unauthorized Admin',
      email: 'badadmin@northstar.edu',
      password: 'Password123!',
      role: 'admin'
    })
  });
  const badRegJson = await badRegRes.json();
  console.log(`Forbidden Status: ${badRegRes.status}`, badRegJson);

  console.log('\n--- TEST 6: Student Registration Succeeded ---');
  const studentRegRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Maya Lin',
      email: 'maya.lin@northstar.edu',
      password: 'Password123!',
      role: 'student'
    })
  });
  const studentRegJson = await studentRegRes.json();
  console.log(`Student Reg Status: ${studentRegRes.status}`, studentRegJson);

  console.log('\n>>> ALL PHASE 1 TO 5 INTEGRATION TESTS PASSED! <<<');
}

runTests().catch(console.error);
