import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { startDate, endDate, reason } = body

    if (!startDate || !endDate || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields: startDate, endDate, reason' },
        { status: 400 }
      )
    }

    const userId = parseInt(session.user.id)

    const leave = await prisma.leave.create({
      data: {
        userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Leave request submitted successfully',
      data: {
        id: leave.id,
        startDate: leave.startDate,
        endDate: leave.endDate,
        reason: leave.reason,
        status: leave.status,
      },
    })
  } catch (error) {
    console.error('Leave request error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = parseInt(session.user.id)

    const leaves = await prisma.leave.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
      take: 10,
    })

    return NextResponse.json({
      success: true,
      data: leaves,
    })
  } catch (error) {
    console.error('Get leave requests error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
