// Backend API Test Script (Node.js)
// Run with: node test-api.js

const API_URL = 'http://localhost:3002/api/contact';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

async function runTest(testName, description, data, expectedStatus, expectedBodyCheck) {
  console.log(`${colors.yellow}${testName}${colors.reset}`);
  console.log(`Request: ${description}`);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const body = await response.json();
    const status = response.status;
    
    const passed = status === expectedStatus && 
                   (!expectedBodyCheck || expectedBodyCheck(body));
    
    if (passed) {
      console.log(`${colors.green}✓ PASSED${colors.reset} - Status: ${status}`);
    } else {
      console.log(`${colors.red}✗ FAILED${colors.reset} - Status: ${status}`);
    }
    
    console.log(`Response: ${JSON.stringify(body)}`);
    console.log('');
    
    return passed;
  } catch (error) {
    console.log(`${colors.red}✗ FAILED${colors.reset} - Error: ${error.message}`);
    console.log('');
    return false;
  }
}

async function main() {
  console.log('=========================================');
  console.log('Backend API Tests - Contact Form');
  console.log('=========================================');
  console.log('');
  
  const results = [];
  
  // Test 1: Valid Submission
  results.push(await runTest(
    'Test 1: Valid Submission',
    'Valid contact form data',
    {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message for the contact form'
    },
    200,
    (body) => body.success === true && body.id
  ));
  
  // Test 2: Missing Fields
  results.push(await runTest(
    'Test 2: Missing Fields',
    'Only name field (missing email, subject, message)',
    {
      name: 'Test User'
    },
    400,
    (body) => body.error && body.error.includes('required')
  ));
  
  // Test 3: Invalid Email
  results.push(await runTest(
    'Test 3: Invalid Email',
    'Invalid email format',
    {
      name: 'Test User',
      email: 'invalid-email',
      subject: 'Test Subject',
      message: 'This is a test message'
    },
    400,
    (body) => body.error && body.error.includes('email')
  ));
  
  console.log('=========================================');
  console.log('Test Summary');
  console.log('=========================================');
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`Results: ${passed}/${total} tests passed`);
  console.log('');
  
  if (passed === total) {
    console.log(`${colors.green}✓ All tests passed!${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Some tests failed${colors.reset}`);
  }
  
  console.log('');
  console.log('To verify database storage:');
  console.log('1. Visit https://dashboard.convex.dev');
  console.log('2. Go to your deployment > Data');
  console.log('3. Check the contactSubmissions table');
  console.log('');
  
  process.exit(passed === total ? 0 : 1);
}

main();
