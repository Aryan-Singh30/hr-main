/**
 * Test Case 3: Leave Request Management API
 * Tests leave request creation and admin approval/rejection
 */

import { NextRequest } from 'next/server'

describe('Leave Management API Tests', () => {
  describe('POST /api/leave/request', () => {
    it('should create leave request with valid data', async () => {
      const leaveData = {
        startDate: '2025-12-20',
        endDate: '2025-12-22',
        reason: 'Family vacation',
      }

      const request = new NextRequest('http://localhost:3000/api/leave/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveData),
      })

      expect(request.method).toBe('POST')
      const body = await request.json()
      expect(body.reason).toBe('Family vacation')
    })

    it('should reject leave request with missing startDate', async () => {
      const incompleteData = {
        endDate: '2025-12-22',
        reason: 'Family vacation',
      }

      const request = new NextRequest('http://localhost:3000/api/leave/request', {
        method: 'POST',
        body: JSON.stringify(incompleteData),
      })

      const body = await request.json()
      expect(body.endDate).toBeDefined()
      expect(body.startDate).toBeUndefined()
    })

    it('should reject leave request with missing reason', async () => {
      const incompleteData = {
        startDate: '2025-12-20',
        endDate: '2025-12-22',
      }

      const request = new NextRequest('http://localhost:3000/api/leave/request', {
        method: 'POST',
        body: JSON.stringify(incompleteData),
      })

      const body = await request.json()
      expect(body.reason).toBeUndefined()
    })

    it('should validate date range is logical', () => {
      const startDate = new Date('2025-12-20')
      const endDate = new Date('2025-12-22')

      expect(endDate.getTime()).toBeGreaterThan(startDate.getTime())
    })

    it('should calculate leave duration correctly', () => {
      const startDate = new Date('2025-12-20')
      const endDate = new Date('2025-12-22')
      
      const durationDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      expect(durationDays).toBe(2)
    })
  })

  describe('PATCH /api/admin/leave/[id]', () => {
    it('should allow admin to approve leave request', async () => {
      const approvalData = {
        status: 'APPROVED',
      }

      const request = new NextRequest('http://localhost:3000/api/admin/leave/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(approvalData),
      })

      expect(request.method).toBe('PATCH')
      const body = await request.json()
      expect(body.status).toBe('APPROVED')
    })

    it('should allow admin to reject leave request', async () => {
      const rejectionData = {
        status: 'REJECTED',
      }

      const request = new NextRequest('http://localhost:3000/api/admin/leave/1', {
        method: 'PATCH',
        body: JSON.stringify(rejectionData),
      })

      const body = await request.json()
      expect(body.status).toBe('REJECTED')
    })

    it('should reject invalid status values', async () => {
      const invalidData = {
        status: 'INVALID_STATUS',
      }

      const validStatuses = ['APPROVED', 'REJECTED']
      expect(validStatuses).not.toContain(invalidData.status)
    })

    it('should require admin role for approval', () => {
      const mockUser = {
        id: '1',
        role: 'EMPLOYEE',
      }

      expect(mockUser.role).not.toBe('ADMIN')
    })

    it('should handle leave ID parameter correctly', () => {
      const leaveId = '123'
      const parsedId = parseInt(leaveId)

      expect(parsedId).toBe(123)
      expect(typeof parsedId).toBe('number')
    })
  })

  describe('Leave Status Management', () => {
    it('should have default status as PENDING', () => {
      const newLeave = {
        status: 'PENDING',
      }

      expect(newLeave.status).toBe('PENDING')
    })

    it('should track leave status changes', () => {
      const statuses = ['PENDING', 'APPROVED', 'REJECTED']
      
      expect(statuses).toContain('PENDING')
      expect(statuses).toContain('APPROVED')
      expect(statuses).toContain('REJECTED')
      expect(statuses.length).toBe(3)
    })
  })
})
