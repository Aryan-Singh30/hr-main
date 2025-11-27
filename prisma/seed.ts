import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('Admin123!', 10)
  const employeePassword = await bcrypt.hash('Employee123!', 10)

  await prisma.user.upsert({
    where: { email: 'admin@local.dev' },
    update: {
      name: 'Local Admin',
      role: 'ADMIN',
      baseSalary: 6000,
      password: adminPassword,
    },
    create: {
      name: 'Local Admin',
      email: 'admin@local.dev',
      password: adminPassword,
      role: 'ADMIN',
      baseSalary: 6000,
    },
  })

  await prisma.user.upsert({
    where: { email: 'employee@local.dev' },
    update: {
      name: 'Local Employee',
      role: 'EMPLOYEE',
      baseSalary: 4000,
      password: employeePassword,
    },
    create: {
      name: 'Local Employee',
      email: 'employee@local.dev',
      password: employeePassword,
      role: 'EMPLOYEE',
      baseSalary: 4000,
    },
  })

  console.log('Seed data created successfully.')
}

main()
  .catch((error) => {
    console.error('Failed to seed database:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
