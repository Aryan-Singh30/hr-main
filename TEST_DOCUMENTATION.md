# HR Management System - Test Suite Documentation

## Overview
This test suite provides comprehensive coverage for the HR Management System's core functionalities including authentication, attendance tracking, leave management, payroll processing, and user administration.

## Test Cases

### Test Case 1: Authentication API (`__tests__/auth.test.ts`)
**Purpose:** Validate user authentication and session management

**Test Scenarios:**
- ✅ Successful authentication with valid credentials
- ✅ Rejection of invalid credentials
- ✅ Validation of required fields (email, password)
- ✅ Session management with user roles
- ✅ Role-based access control (ADMIN vs EMPLOYEE)

**Key Features Tested:**
- Login validation
- Password authentication
- Session creation
- User role assignment

---

### Test Case 2: Attendance Management API (`__tests__/attendance.test.ts`)
**Purpose:** Validate attendance clock-in/clock-out functionality

**Test Scenarios:**
- ✅ Successful clock-in for authenticated users
- ✅ Rejection of unauthenticated access
- ✅ Prevention of duplicate clock-in
- ✅ Clock-out validation
- ✅ Work hours calculation
- ✅ Date and timezone handling

**Key Features Tested:**
- Clock-in functionality
- Clock-out functionality
- Duplicate prevention
- Working hours calculation
- Date validation

---

### Test Case 3: Leave Management API (`__tests__/leave.test.ts`)
**Purpose:** Validate leave request creation and approval workflow

**Test Scenarios:**
- ✅ Leave request creation with valid data
- ✅ Validation of required fields (startDate, endDate, reason)
- ✅ Date range validation
- ✅ Leave duration calculation
- ✅ Admin approval workflow
- ✅ Admin rejection workflow
- ✅ Status management (PENDING, APPROVED, REJECTED)
- ✅ Role-based authorization

**Key Features Tested:**
- Leave request submission
- Field validation
- Admin approval/rejection
- Status tracking
- Role-based access control

---

### Test Case 4: Payroll Management API (`__tests__/payroll.test.ts`)
**Purpose:** Validate payroll generation and calculation logic

**Test Scenarios:**
- ✅ Payroll generation with valid data
- ✅ Validation of required fields (userId, month, year)
- ✅ Prevention of duplicate payroll
- ✅ Salary calculation logic
- ✅ Attendance bonus calculation
- ✅ Deduction for missed days
- ✅ Status management (PAID, UNPAID, PROCESSING)
- ✅ Admin-only access control

**Key Features Tested:**
- Payroll generation
- Salary calculations
- Bonus calculations
- Deduction logic
- Status tracking
- Month/year validation

---

### Test Case 5: Admin User Management API (`__tests__/admin-users.test.ts`)
**Purpose:** Validate admin functionality for user management

**Test Scenarios:**
- ✅ User list retrieval for admins
- ✅ Access control for non-admin users
- ✅ User data structure validation
- ✅ Password exclusion from responses
- ✅ Role validation (ADMIN, EMPLOYEE)
- ✅ Email format validation
- ✅ Salary validation
- ✅ User sorting and filtering
- ✅ Authorization checks

**Key Features Tested:**
- User list retrieval
- Role-based access control
- Data validation
- Sorting and filtering
- Security (password exclusion)

---

## Running the Tests

### Prerequisites
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Specific Test File
```bash
npm test auth.test.ts
npm test attendance.test.ts
npm test leave.test.ts
npm test payroll.test.ts
npm test admin-users.test.ts
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

---

## Test Structure

Each test file follows this structure:

```typescript
describe('Feature Name', () => {
  describe('Endpoint/Function', () => {
    it('should test specific behavior', () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
```

---

## Technology Stack

- **Testing Framework:** Jest 29.7.0
- **Testing Library:** @testing-library/react 14.1.2
- **Environment:** jest-environment-jsdom
- **Next.js:** 15.5.6

---

## Test Coverage Goals

- ✅ **API Routes:** All major endpoints covered
- ✅ **Authentication:** Login, session management
- ✅ **Attendance:** Clock-in/out, validation
- ✅ **Leave Management:** Request, approval workflow
- ✅ **Payroll:** Generation, calculations
- ✅ **User Management:** Admin operations

---

## Configuration Files

### `jest.config.js`
- Configures Jest for Next.js
- Sets up module path mapping
- Defines test patterns and coverage

### `jest.setup.js`
- Imports @testing-library/jest-dom
- Provides custom matchers

---

## Continuous Integration

These tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run Tests
  run: npm test
  
- name: Generate Coverage
  run: npm test -- --coverage
```

---

## Best Practices Demonstrated

1. **Clear Test Names:** Descriptive test case names
2. **Isolation:** Each test is independent
3. **Arrange-Act-Assert:** Structured test organization
4. **Edge Cases:** Testing boundary conditions
5. **Security:** Validation of authentication and authorization
6. **Data Validation:** Input validation testing

---

## Future Enhancements

- [ ] Integration tests with real database
- [ ] E2E tests with Playwright
- [ ] Performance testing
- [ ] Load testing for API endpoints
- [ ] Mock server responses for external APIs

---

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all tests pass before committing
3. Maintain test coverage above 80%
4. Document new test cases in this README

---

## License

This test suite is part of the HR Management System project.

---

## Contact

For questions about the test suite, please refer to the project documentation or open an issue on GitHub.
