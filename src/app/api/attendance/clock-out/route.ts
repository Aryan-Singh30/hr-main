import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = parseInt(session.user.id)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Find today's attendance
    const attendance = await prisma.attendance.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
    })

    if (!attendance) {
      return NextResponse.json(
        { error: 'No clock-in record found for today' },
        { status: 400 }
      )
    }

    if (attendance.clockOut) {
      return NextResponse.json(
        { error: 'Already clocked out today' },
        { status: 400 }
      )
    }

    // Update with clock out time
    const updatedAttendance = await prisma.attendance.update({
      where: { id: attendance.id },
      data: { clockOut: new Date() },
    })

    return NextResponse.json({
      success: true,
      message: 'Clocked out successfully',
      data: {
        id: updatedAttendance.id,
        clockIn: updatedAttendance.clockIn,
        clockOut: updatedAttendance.clockOut,
        date: updatedAttendance.date,
      },
    })
  } catch (error) {
    console.error('Clock out error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
