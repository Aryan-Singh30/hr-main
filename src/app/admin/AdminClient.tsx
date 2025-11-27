'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button, Card, CardHeader, CardBody, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'
import { Avatar } from '@/components/Avatar'
import { approveLeave, rejectLeave, generatePayroll } from './actions'

interface AdminClientProps {
  users: Array<{
    id: number
    name: string | null
    email: string
    role: string
    baseSalary: number
  }>
  pendingLeaves: Array<{
    id: number
    startDate: Date
    endDate: Date
    reason: string
    user: {
      name: string | null
      email: string
    } | null
  }>
  recentPayrolls: Array<{
    id: number
    month: string
    year: number
    amount: number
    status: string
    user: {
      name: string | null
      email: string
    } | null
  }>
  currentMonth: number
  currentYear: number
  months: string[]
}

export function AdminClient({
  users,
  pendingLeaves,
  recentPayrolls,
  currentMonth,
  currentYear,
  months,
}: AdminClientProps) {
  const { data: session, status } = useSession()
  
  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  })

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/sign-in' })
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600">Loading...</div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Access denied. Admin privileges required.</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Control Center</h1>
          <p className="text-slate-500 mt-1">Welcome, {session.user?.name || 'Admin'} - Manage staff, leave requests, and payroll.</p>
        </div>
        <Button
          color="danger"
          variant="flat"
          size="sm"
          onClick={handleSignOut}
          className="font-medium"
        >
          Sign Out
        </Button>
      </div>

      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="px-6 pt-6 pb-2">
          <h2 className="text-lg font-semibold text-slate-900">Team Overview</h2>
        </CardHeader>
        <CardBody className="px-2 pb-2">
          <Table
            aria-label="Team members"
            removeWrapper
            className="bg-transparent"
          >
            <TableHeader>
              <TableColumn className="bg-slate-50 text-slate-500 font-medium">MEMBER</TableColumn>
              <TableColumn className="bg-slate-50 text-slate-500 font-medium">EMAIL</TableColumn>
              <TableColumn className="bg-slate-50 text-slate-500 font-medium">ROLE</TableColumn>
              <TableColumn className="bg-slate-50 text-slate-500 font-medium">BASE SALARY</TableColumn>
              <TableColumn className="bg-slate-50 text-slate-500 font-medium">PAYROLL</TableColumn>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-b border-slate-100 last:border-0">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name || ''} size="sm" />
                      <span className="font-medium text-slate-900">{user.name ?? 'Unnamed'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      color={user.role === 'ADMIN' ? 'secondary' : 'default'}
                      variant="flat"
                      size="sm"
                      className="capitalize"
                    >
                      {user.role.toLowerCase()}
                    </Chip>
                  </TableCell>
                  <TableCell className="font-medium text-slate-700">{currencyFormatter.format(user.baseSalary)}</TableCell>
                  <TableCell>
                    <form action={generatePayroll} className="flex items-center gap-2">
                      <input type="hidden" name="userId" value={user.id} />
                      <select
                        name="month"
                        defaultValue={currentMonth}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
                      >
                        {months.map((month, index) => (
                          <option key={month} value={index}>
                            {month.slice(0, 3)}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        name="year"
                        defaultValue={currentYear}
                        className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
                      />
                      <Button type="submit" color="primary" size="sm" className="bg-indigo-600 font-medium">
                        Generate
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="px-6 pt-6 pb-0">
            <h2 className="text-lg font-semibold text-slate-900">Pending Leave Requests</h2>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {pendingLeaves.length === 0 ? (
                <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  <p className="text-sm">No pending leave requests</p>
                </div>
              ) : (
                pendingLeaves.map((leave) => (
                  <div key={leave.id} className="group p-4 rounded-xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={leave.user?.name || ''} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{leave.user?.name ?? 'Employee'}</p>
                          <p className="text-xs text-slate-500">{leave.user?.email}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                        {dateFormatter.format(leave.startDate)} – {dateFormatter.format(leave.endDate)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{leave.reason}</p>
                    <div className="mt-4 flex gap-3 justify-end">
                      <form action={rejectLeave}>
                        <input type="hidden" name="leaveId" value={leave.id} />
                        <Button type="submit" color="danger" variant="flat" size="sm">
                          Reject
                        </Button>
                      </form>
                      <form action={approveLeave}>
                        <input type="hidden" name="leaveId" value={leave.id} />
                        <Button type="submit" color="success" size="sm" className="text-white font-medium">
                          Approve
                        </Button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardBody>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="px-6 pt-6 pb-0">
            <h2 className="text-lg font-semibold text-slate-900">Recent Payroll Runs</h2>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {recentPayrolls.length === 0 ? (
                <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  <p className="text-sm">No payroll entries generated yet</p>
                </div>
              ) : (
                recentPayrolls.map((payroll) => (
                  <div key={payroll.id} className="group p-4 rounded-xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Avatar name={payroll.user?.name || ''} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{payroll.user?.name ?? 'Employee'}</p>
                          <p className="text-xs text-slate-500">{payroll.user?.email}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                        {payroll.month} {payroll.year}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-50">
                      <p className="text-lg font-bold text-slate-900">
                        {currencyFormatter.format(payroll.amount)}
                      </p>
                      <Chip
                        color={payroll.status === 'PAID' ? 'success' : 'default'}
                        variant="flat"
                        size="sm"
                        className="capitalize font-medium"
                      >
                        {payroll.status.toLowerCase()}
                      </Chip>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
