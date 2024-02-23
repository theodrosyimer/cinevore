import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuthorized = !!token
    const isAdminSegment = req.nextUrl.pathname.startsWith('/admin')
    const isMeSegment = req.nextUrl.pathname.startsWith('/me')
    const isSettingsSegment = req.nextUrl.pathname.startsWith('/settings')
    const isAuthPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register')

    if (!isAuthorized) {
      let from = req.nextUrl.pathname

      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
      )
    }

    if (isAuthPage && isAuthorized) {
      return NextResponse.redirect(new URL('/me', req.url))
    }

    if (
      (isAdminSegment || isMeSegment || isSettingsSegment) &&
      !(token?.role === 'admin' || token?.role === 'superadmin')
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return null
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // returning true here so that the middleware function above
        // is always called.
        return true
      },
    },
  },
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/me/:path*',
    '/settings/:path*',
    '/login',
    '/register',
    '/list/new',
  ],
}
