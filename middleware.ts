import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard')

  if (!req.auth && (isAdminRoute || isDashboardRoute)) {
    const signInUrl = new URL('/sign-in', nextUrl.origin)
    signInUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  if (isAdminRoute && req.auth?.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
