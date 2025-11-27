import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import SignInForm from './SignInForm'

export default async function SignInPage() {
  const session = await auth()

  if (session?.user) {
    if (session.user.role === 'ADMIN') {
      redirect('/admin')
    }
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HR System
          </h1>
          <p className="text-sm text-default-500">
            Local-first employee management
          </p>
        </div>

        <SignInForm />

        <p className="text-center text-xs text-default-400">
          <Link href="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  )
}
