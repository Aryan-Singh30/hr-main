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

    // Check if already clocked in today
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
    })

    if (existingAttendance) {
      return NextResponse.json(
        { error: 'Already clocked in today' },
        { status: 400 }
      )
    }

    // Create attendance record
    const attendance = await prisma.attendance.create({
      data: {
        userId,
        date: new Date(),
        clockIn: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Clocked in successfully',
      data: {
        id: attendance.id,
        clockIn: attendance.clockIn,
        date: attendance.date,
      },
    })
  } catch (error) {
    console.error('Clock in error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
