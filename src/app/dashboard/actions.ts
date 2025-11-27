'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function getDayBounds(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  return { start, end }
}

export async function clockIn() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const userId = Number(session.user.id)
  const now = new Date()
  const { start, end } = getDayBounds(now)

  const existing = await prisma.attendance.findFirst({
    where: {
      userId,
      date: {
        gte: start,
        lt: end,
      },
    },
  })

  if (existing) {
    return
  }

  await prisma.attendance.create({
    data: {
      userId,
      date: now,
      clockIn: now,
    },
  })

  revalidatePath('/dashboard')
}

export async function clockOut() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const userId = Number(session.user.id)
  const now = new Date()
  const { start, end } = getDayBounds(now)

  const openAttendance = await prisma.attendance.findFirst({
    where: {
      userId,
      date: {
        gte: start,
        lt: end,
      },
      clockOut: null,
    },
    orderBy: { clockIn: 'desc' },
  })

  if (!openAttendance) {
    return
  }

  await prisma.attendance.update({
    where: { id: openAttendance.id },
    data: { clockOut: now },
  })

  revalidatePath('/dashboard')
}

export async function requestLeave(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const userId = Number(session.user.id)
  const startDateValue = formData.get('startDate')
  const endDateValue = formData.get('endDate')
  const reasonValue = formData.get('reason')

  if (!startDateValue || !endDateValue || !reasonValue) {
    return
  }

  const reason = String(reasonValue).trim()
  const startDate = new Date(String(startDateValue))
  const endDate = new Date(String(endDateValue))

  if (!reason || Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate < startDate) {
    return
  }

  await prisma.leave.create({
    data: {
      userId,
      startDate,
      endDate,
      reason,
      status: 'PENDING',
    },
  })

  revalidatePath('/dashboard')
}
