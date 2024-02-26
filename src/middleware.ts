import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuthorized = !!token

    // under the (protected) route group
    const isAdminSegment = req.nextUrl.pathname.startsWith('/admin')
    const isMeSegment = req.nextUrl.pathname.startsWith('/me')
    const isSettingsSegment = req.nextUrl.pathname.startsWith('/settings')
    const isNewListPage = req.nextUrl.pathname.startsWith('/list/new')

    const isAuthSegment =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register')

    const hasNoAccessToUserProtectedRoutes =
      (isMeSegment || isSettingsSegment || isNewListPage) && !isAuthorized

    const hasNoAccessToAdminProtectedRoutes =
      isAdminSegment &&
      !(token?.role === 'admin' || token?.role === 'superadmin')

    if (isAuthSegment) {
      if (isAuthorized) {
        return NextResponse.redirect(new URL('/me', req.url))
      }
      return null
    }

    if (hasNoAccessToAdminProtectedRoutes || hasNoAccessToUserProtectedRoutes) {
      let from = req.nextUrl.pathname

      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
      )
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
