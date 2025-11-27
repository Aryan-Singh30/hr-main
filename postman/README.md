# 🚀 HR Application - Postman Testing Guide

Complete Postman collection for testing the HR Management System API.

## 📦 What's Included

### API Endpoints Created
- ✅ **Authentication**: Sign in, Sign out, Session management
- ✅ **Attendance**: Clock in, Clock out
- ✅ **Leave Management**: Request leave, View leave requests
- ✅ **Admin - Users**: View all users
- ✅ **Admin - Leave**: Approve/Reject leave requests
- ✅ **Admin - Payroll**: Generate and view payroll

### Postman Files
- `HR-App-Collection.postman_collection.json` - Complete API collection
- `HR-Local-Dev.postman_environment.json` - Environment variables

---

## 🎯 Quick Start (3 Steps)

### Step 1: Start Your Dev Server
```powershell
cd D:\PROJECTS\hr-main
npm run dev
```

### Step 2: Import into Postman

1. **Open Postman**
2. **Import Collection:**
   - Click **"Import"** button (top left)
   - Click **"files"** or drag & drop
   - Select: `D:\PROJECTS\hr-main\postman\HR-App-Collection.postman_collection.json`
   - Click **"Import"**

3. **Import Environment:**
   - Click **"Import"** again
   - Select: `D:\PROJECTS\hr-main\postman\HR-Local-Dev.postman_environment.json`
   - Click **"Import"**

4. **Activate Environment:**
   - Top-right dropdown
   - Select: **"HR Local Dev"**

### Step 3: Run Tests

1. Click on **"HR Application API"** collection
2. Click **"Run"** button
3. Select all requests
4. Click **"Run HR Application API"**

**Done!** All tests will run automatically. ✅

---

## 📋 Collection Structure

### 1️⃣ **Authentication** (4 requests)
```
1. Get CSRF Token          → GET    /api/auth/csrf
2. Sign In (Admin)         → POST   /api/auth/callback/credentials
2b. Sign In (Employee)     → POST   /api/auth/callback/credentials
3. Get Session             → GET    /api/auth/session
9. Sign Out                → POST   /api/auth/signout
```

### 2️⃣ **Employee - Attendance** (2 requests)
```
4. Clock In                → POST   /api/attendance/clock-in
5. Clock Out               → POST   /api/attendance/clock-out
```

### 3️⃣ **Employee - Leave** (2 requests)
```
6. Request Leave           → POST   /api/leave/request
6b. Get My Leave Requests  → GET    /api/leave/request
```

### 4️⃣ **Admin - Users** (1 request)
```
7. Get All Users           → GET    /api/admin/users
```

### 5️⃣ **Admin - Leave Management** (2 requests)
```
8a. Approve Leave          → PATCH  /api/admin/leave/:id
8b. Reject Leave           → PATCH  /api/admin/leave/:id
```

### 6️⃣ **Admin - Payroll** (2 requests)
```
8c. Generate Payroll       → POST   /api/admin/payroll
8d. Get All Payrolls       → GET    /api/admin/payroll
```

---

## 🔐 Test Credentials

### Admin Account
```
Email:    admin@example.com
Password: password123
```

### Employee Account
```
Email:    employee@example.com
Password: password123
```

---

## 🧪 Testing Workflows

### Workflow 1: Employee Daily Tasks
1. Get CSRF Token
2. Sign In (Employee)
3. Get Session
4. Clock In
5. Clock Out
6. Request Leave
7. Get My Leave Requests
8. Sign Out

### Workflow 2: Admin Tasks
1. Get CSRF Token
2. Sign In (Admin)
3. Get Session
4. Get All Users
5. Approve/Reject Leave
6. Generate Payroll
7. Get All Payrolls
8. Sign Out

---

## 📊 Request Examples

### Clock In
```http
POST http://localhost:3000/api/attendance/clock-in
Cookie: next-auth.session-token=YOUR_TOKEN
```

**Response:**
```json
{
  "success": true,
  "message": "Clocked in successfully",
  "data": {
    "id": 1,
    "clockIn": "2025-11-27T09:00:00.000Z",
    "date": "2025-11-27T00:00:00.000Z"
  }
}
```

### Request Leave
```http
POST http://localhost:3000/api/leave/request
Cookie: next-auth.session-token=YOUR_TOKEN
Content-Type: application/json

{
  "startDate": "2025-12-01",
  "endDate": "2025-12-03",
  "reason": "Family vacation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Leave request submitted successfully",
  "data": {
    "id": 1,
    "startDate": "2025-12-01T00:00:00.000Z",
    "endDate": "2025-12-03T00:00:00.000Z",
    "reason": "Family vacation",
    "status": "PENDING"
  }
}
```

### Approve Leave (Admin)
```http
PATCH http://localhost:3000/api/admin/leave/1
Cookie: next-auth.session-token=YOUR_TOKEN
Content-Type: application/json

{
  "status": "APPROVED"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Leave request approved successfully",
  "data": {
    "id": 1,
    "status": "APPROVED",
    "user": {
      "name": "Employee User",
      "email": "employee@example.com"
    },
    "startDate": "2025-12-01T00:00:00.000Z",
    "endDate": "2025-12-03T00:00:00.000Z"
  }
}
```

---

## 🔄 Environment Variables

The collection automatically manages these variables:

| Variable | Purpose | Auto-Set |
|----------|---------|----------|
| `baseUrl` | API base URL | ❌ Manual |
| `sessionToken` | Auth session token | ✅ After sign-in |
| `csrfToken` | CSRF protection token | ✅ On first request |
| `leaveRequestId` | Current leave ID | ✅ After creating leave |
| `firstUserId` | First user from list | ✅ After get users |
| `attendanceId` | Current attendance ID | ✅ After clock-in |

---

## ⚡ Pro Tips

### 1. **Use Collection Runner for Full Testing**
   - Tests all endpoints sequentially
   - Shows pass/fail status
   - Generates test report

### 2. **Check Console Output**
   - Each request logs useful info
   - View in Postman Console (bottom-left icon)

### 3. **Cookie Management**
   - Session cookies are auto-managed
   - Postman handles cookie storage

### 4. **Test Order Matters**
   - Always get CSRF token first
   - Sign in before other requests
   - Some requests need data from previous requests

### 5. **Error Handling**
   - 401 = Not authenticated (sign in again)
   - 403 = Not authorized (need admin role)
   - 400 = Bad request (check request body)

---

## 🛠️ Troubleshooting

### Issue: "Unauthorized" Errors
**Solution:** 
1. Run "1. Get CSRF Token"
2. Run "2. Sign In"
3. Verify session token is set in environment

### Issue: "Already clocked in today"
**Solution:** 
- Run "5. Clock Out" first
- Or test on a different day

### Issue: Admin endpoints return 403
**Solution:**
- Sign in with admin credentials
- Use "2. Sign In (Admin)" not employee

### Issue: Leave request ID not found
**Solution:**
- Create a leave request first using "6. Request Leave"
- Check the `leaveRequestId` in environment variables

---

## 📈 API Response Format

All API endpoints follow this consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## 🎓 Next Steps

1. ✅ Import collection and environment
2. ✅ Start dev server
3. ✅ Run full collection test
4. ✅ Test individual endpoints
5. ✅ Modify requests for custom testing
6. ✅ Export and share with team

---

## 📞 Support

If you encounter issues:
1. Check server is running on `http://localhost:3000`
2. Verify database is set up (`npx prisma db push`)
3. Ensure test users exist (`npx prisma db seed`)
4. Check Postman Console for detailed errors

---

## 🎉 You're All Set!

Your complete Postman testing environment is ready. Happy testing! 🚀

**Quick Start Command:**
```powershell
cd D:\PROJECTS\hr-main
npm run dev
```

Then open Postman and start testing!
