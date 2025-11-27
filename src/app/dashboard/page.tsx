import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DashboardClient } from './DashboardClient'

function getDayBounds(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  return { start, end }
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  const userId = Number(session.user.id)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      baseSalary: true,
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  const now = new Date()
  const { start, end } = getDayBounds(now)

  const todayAttendance = await prisma.attendance.findFirst({
    where: {
      userId,
      date: {
        gte: start,
        lt: end,
      },
    },
    orderBy: { clockIn: 'desc' },
  })

  const recentAttendance = await prisma.attendance.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 10,
  })

  type AttendanceRecord = (typeof recentAttendance)[number]

  const leaveRequests = await prisma.leave.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  type LeaveRecord = (typeof leaveRequests)[number]

  const canClockIn = !todayAttendance
  const canClockOut = Boolean(todayAttendance && !todayAttendance.clockOut)

  return (
    <DashboardClient
      user={user}
      canClockIn={canClockIn}
      canClockOut={canClockOut}
      todayAttendance={todayAttendance}
      recentAttendance={recentAttendance}
      leaveRequests={leaveRequests}
    />
  )
}
