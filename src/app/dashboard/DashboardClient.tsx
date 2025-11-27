'use client'

import { Button, Card, CardHeader, CardBody, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Textarea } from '@heroui/react'
import { Avatar } from '@/components/Avatar'
import { clockIn, clockOut, requestLeave } from './actions'

interface DashboardClientProps {
  user: {
    name: string | null
    baseSalary: number
  }
  canClockIn: boolean
  canClockOut: boolean
  todayAttendance: { clockOut: Date | null } | null
  recentAttendance: Array<{
    id: number
    date: Date
    clockIn: Date | null
    clockOut: Date | null
  }>
  leaveRequests: Array<{
    id: number
    startDate: Date
    endDate: Date
    reason: string
    status: string
  }>
}

export function DashboardClient({
  user,
  canClockIn,
  canClockOut,
  todayAttendance,
  recentAttendance,
  leaveRequests,
}: DashboardClientProps) {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your daily activities and leave requests.</p>
        </div>
        <Card className="w-fit bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm">
          <CardBody className="py-2 px-4">
            <p className="text-sm font-medium text-slate-600">
              Base Salary: <span className="text-indigo-600 font-bold ml-1">₹{user.baseSalary.toLocaleString('en-IN')}</span>
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-col items-start gap-1 pb-0 px-6 pt-6">
            <div className="p-2 bg-blue-50 rounded-lg mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Clock In</h2>
            <p className="text-sm text-slate-500">
              {canClockIn ? 'Start your workday.' : 'You have already clocked in today.'}
            </p>
          </CardHeader>
          <CardBody className="px-6 pb-6 pt-4">
            <form action={clockIn}>
              <Button
                type="submit"
                color="primary"
                size="lg"
                className="w-full font-medium shadow-md shadow-blue-500/20"
                isDisabled={!canClockIn}
              >
                Clock In
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-col items-start gap-1 pb-0 px-6 pt-6">
            <div className="p-2 bg-pink-50 rounded-lg mb-2">
              <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Clock Out</h2>
            <p className="text-sm text-slate-500">
              {canClockOut
                ? 'End your workday.'
                : todayAttendance
                  ? 'You have already clocked out.'
                  : 'Clock in first.'}
            </p>
          </CardHeader>
          <CardBody className="px-6 pb-6 pt-4">
            <form action={clockOut}>
              <Button
                type="submit"
                color="danger"
                variant="flat"
                size="lg"
                className="w-full font-medium"
                isDisabled={!canClockOut}
              >
                Clock Out
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
        {/* Leave Request Form */}
        <Card className="border border-slate-200 shadow-sm h-fit">
          <CardHeader className="px-6 pt-6 pb-0">
            <h2 className="text-lg font-semibold text-slate-900">Request Leave</h2>
          </CardHeader>
          <CardBody className="p-6">
            <form action={requestLeave} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  name="startDate"
                  label="Start Date"
                  labelPlacement="outside"
                  placeholder="Select date"
                  isRequired
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-white border-slate-200 hover:border-slate-300",
                  }}
                />
                <Input
                  type="date"
                  name="endDate"
                  label="End Date"
                  labelPlacement="outside"
                  placeholder="Select date"
                  isRequired
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-white border-slate-200 hover:border-slate-300",
                  }}
                />
              </div>
              <Textarea
                name="reason"
                label="Reason"
                labelPlacement="outside"
                placeholder="Why are you taking leave?"
                minRows={3}
                isRequired
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-white border-slate-200 hover:border-slate-300",
                }}
              />
              <Button
                type="submit"
                className="w-full bg-slate-900 text-white font-medium shadow-lg shadow-slate-900/10"
                size="lg"
              >
                Submit Request
              </Button>
            </form>
          </CardBody>
        </Card>

        <div className="space-y-8">
          {/* Recent Attendance */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="px-6 pt-6 pb-2">
              <h2 className="text-lg font-semibold text-slate-900">Recent Attendance</h2>
            </CardHeader>
            <CardBody className="px-2 pb-2">
              <Table
                aria-label="Recent attendance records"
                removeWrapper
                className="bg-transparent"
              >
                <TableHeader>
                  <TableColumn className="bg-slate-50 text-slate-500 font-medium">DATE</TableColumn>
                  <TableColumn className="bg-slate-50 text-slate-500 font-medium">CLOCK IN</TableColumn>
                  <TableColumn className="bg-slate-50 text-slate-500 font-medium">CLOCK OUT</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No attendance records yet.">
                  {recentAttendance.map((record) => (
                    <TableRow key={record.id} className="border-b border-slate-100 last:border-0">
                      <TableCell className="font-medium text-slate-700">{dateFormatter.format(record.date)}</TableCell>
                      <TableCell className="text-slate-600">
                        {record.clockIn ? (
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                            {timeFormatter.format(record.clockIn)}
                          </span>
                        ) : '--'}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {record.clockOut ? (
                          <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium">
                            {timeFormatter.format(record.clockOut)}
                          </span>
                        ) : '--'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>

          {/* Leave History */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="px-6 pt-6 pb-0">
              <h2 className="text-lg font-semibold text-slate-900">Leave History</h2>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-3">
                {leaveRequests.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <p className="text-sm">No leave requests found</p>
                  </div>
                ) : (
                  leaveRequests.map((leave) => (
                    <div key={leave.id} className="group p-4 rounded-xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">
                          {dateFormatter.format(leave.startDate)} – {dateFormatter.format(leave.endDate)}
                        </span>
                        <Chip
                          color={
                            leave.status === 'APPROVED'
                              ? 'success'
                              : leave.status === 'REJECTED'
                                ? 'danger'
                                : 'warning'
                          }
                          variant="flat"
                          size="sm"
                          className="capitalize"
                        >
                          {leave.status.toLowerCase()}
                        </Chip>
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-2">{leave.reason}</p>
                    </div>
                  ))
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
