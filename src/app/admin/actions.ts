'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export async function approveLeave(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const leaveId = Number(formData.get('leaveId'))
  if (!leaveId) return

  await prisma.leave.update({
    where: { id: leaveId },
    data: { status: 'APPROVED' },
  })

  revalidatePath('/admin')
}

export async function rejectLeave(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const leaveId = Number(formData.get('leaveId'))
  if (!leaveId) return

  await prisma.leave.update({
    where: { id: leaveId },
    data: { status: 'REJECTED' },
  })

  revalidatePath('/admin')
}

export async function generatePayroll(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const userIdValue = formData.get('userId')
  const monthValue = formData.get('month')
  const yearValue = formData.get('year')

  if (!userIdValue || !monthValue || !yearValue) {
    return
  }

  const userId = Number(userIdValue)
  const monthIndex = Number(monthValue)
  const year = Number(yearValue)

  if (Number.isNaN(userId) || Number.isNaN(monthIndex) || Number.isNaN(year)) {
    return
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { baseSalary: true },
  })

  if (!user) return

  const startOfMonth = new Date(year, monthIndex, 1)
  const startOfNextMonth = new Date(year, monthIndex + 1, 1)

  const attendanceCount = await prisma.attendance.count({
    where: {
      userId,
      date: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
  })

  const amount = (user.baseSalary / 30) * attendanceCount
  const monthName = MONTHS[monthIndex] ?? 'Unknown'

  const existingPayroll = await prisma.payroll.findFirst({
    where: {
      userId,
      month: monthName,
      year,
    },
  })

  if (existingPayroll) {
    await prisma.payroll.update({
      where: { id: existingPayroll.id },
      data: {
        amount,
        status: 'UNPAID',
      },
    })
  } else {
    await prisma.payroll.create({
      data: {
        userId,
        month: monthName,
        year,
        amount,
        status: 'UNPAID',
      },
    })
  }

  revalidatePath('/admin')
}
