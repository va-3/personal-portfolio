#!/bin/bash

# Backend API Test Script
# Tests all three test cases for the contact form API

API_URL="http://localhost:3002/api/contact"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "Backend API Tests - Contact Form"
echo "========================================="
echo ""

# Test 1: Valid Submission
echo -e "${YELLOW}Test 1: Valid Submission${NC}"
echo "Request: Valid contact form data"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message for the contact form"
  }')

HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ PASSED${NC} - Status: $HTTP_CODE"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - Status: $HTTP_CODE"
  echo "Response: $BODY"
fi
echo ""

# Test 2: Missing Fields
echo -e "${YELLOW}Test 2: Missing Fields${NC}"
echo "Request: Only name field (missing email, subject, message)"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User"}')

HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')

if [ "$HTTP_CODE" = "400" ] && echo "$BODY" | grep -q "All fields are required"; then
  echo -e "${GREEN}✓ PASSED${NC} - Status: $HTTP_CODE"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - Status: $HTTP_CODE"
  echo "Response: $BODY"
fi
echo ""

# Test 3: Invalid Email
echo -e "${YELLOW}Test 3: Invalid Email${NC}"
echo "Request: Invalid email format"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "subject": "Test Subject",
    "message": "This is a test message"
  }')

HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')

if [ "$HTTP_CODE" = "400" ] && echo "$BODY" | grep -q "Invalid email"; then
  echo -e "${GREEN}✓ PASSED${NC} - Status: $HTTP_CODE"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - Status: $HTTP_CODE"
  echo "Response: $BODY"
fi
echo ""

echo "========================================="
echo "Test Summary"
echo "========================================="
echo "All 3 API tests completed."
echo "Check the results above for pass/fail status."
echo ""
echo "To verify database storage:"
echo "1. Visit https://dashboard.convex.dev"
echo "2. Go to your deployment > Data"
echo "3. Check the contactSubmissions table"
echo ""
