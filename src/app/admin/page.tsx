import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AdminClient } from './AdminClient'

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

export default async function AdminDashboardPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const [users, pendingLeaves, recentPayrolls] = await Promise.all([
    prisma.user.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        baseSalary: true,
      },
    }),
    prisma.leave.findMany({
      where: { status: 'PENDING' },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.payroll.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      take: 12,
    }),
  ])

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return (
    <AdminClient
      users={users}
      pendingLeaves={pendingLeaves}
      recentPayrolls={recentPayrolls}
      currentMonth={currentMonth}
      currentYear={currentYear}
      months={MONTHS}
    />
  )
}
