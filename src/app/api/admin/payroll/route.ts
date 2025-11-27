import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { userId, month, year } = body

    if (!userId || !month || !year) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, month, year' },
        { status: 400 }
      )
    }

    // Check if payroll already exists
    const existingPayroll = await prisma.payroll.findFirst({
      where: {
        userId,
        month,
        year,
      },
    })

    if (existingPayroll) {
      return NextResponse.json(
        { error: 'Payroll already exists for this period' },
        { status: 400 }
      )
    }

    // Get user's base salary
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { baseSalary: true, name: true, email: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create payroll
    const payroll = await prisma.payroll.create({
      data: {
        userId,
        month,
        year,
        amount: user.baseSalary,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Payroll generated successfully',
      data: {
        id: payroll.id,
        userId: payroll.userId,
        month: payroll.month,
        year: payroll.year,
        amount: payroll.amount,
        status: payroll.status,
        user: {
          name: user.name,
          email: user.email,
        },
      },
    })
  } catch (error) {
    console.error('Generate payroll error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const payrolls = await prisma.payroll.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
      take: 20,
    })

    return NextResponse.json({
      success: true,
      data: payrolls,
    })
  } catch (error) {
    console.error('Get payrolls error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
