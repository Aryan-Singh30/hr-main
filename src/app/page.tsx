import Link from 'next/link'
import { Button, Card, CardBody } from '@heroui/react'
import {
  ClockIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const features = [
    {
      icon: ClockIcon,
      title: 'Attendance Tracking',
      description: 'Clock in and out with ease. Track working hours automatically with our intuitive system.'
    },
    {
      icon: CalendarIcon,
      title: 'Leave Management',
      description: 'Request and approve leaves seamlessly. Keep track of all leave requests in one place.'
    },
    {
      icon: CurrencyRupeeIcon,
      title: 'Payroll Automation',
      description: 'Generate accurate payroll based on attendance. Support for INR with automatic calculations.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy First',
      description: 'Your data stays local. SQLite database with no external dependencies or cloud storage.'
    },
    {
      icon: UserGroupIcon,
      title: 'Role-Based Access',
      description: 'Separate dashboards for employees and admins. Secure authentication with NextAuth v5.'
    },
    {
      icon: BoltIcon,
      title: 'Lightning Fast',
      description: 'Built with Next.js 16 and Turbopack. Modern UI powered by Hero UI components.'
    }
  ]

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block">Local-First</span>
              <span className="block bg-linear-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                HR Management
              </span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
              Manage attendance, leaves, and payroll effortlessly. Built for modern teams with privacy and speed in mind.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="/sign-in"
                size="lg"
                className="bg-white text-purple-600 font-semibold px-8 hover:bg-gray-100"
              >
                Get Started
              </Button>
              <Button
                as={Link}
                href="/sign-in"
                size="lg"
                variant="bordered"
                className="border-white text-white font-semibold px-8 hover:bg-white/10"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete HR management solution designed for simplicity and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="border-2 border-transparent hover:border-purple-500 transition-all duration-300 hover:shadow-xl"
                >
                  <CardBody className="p-8">
                    <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Transform Your HR?
            </h2>
            <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto">
              Join teams who trust our local-first approach to HR management.
            </p>
            <Button
              as={Link}
              href="/sign-in"
              size="lg"
              className="bg-white text-purple-600 font-semibold px-12 hover:bg-gray-100"
            >
              Start Now
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">HR Management</h3>
            <p className="text-gray-400 mb-6">Local-first, privacy-focused, lightning fast</p>
            <div className="flex justify-center gap-8 mb-8">
              <Link href="/sign-in" className="hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/admin" className="hover:text-white transition-colors">
                Admin
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} HR Management System. Built with Next.js 16 & Hero UI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
