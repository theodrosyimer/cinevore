import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const isAuth = !!token
    const isAdminSegment = req.nextUrl.pathname.startsWith("/admin")
    // const isMePage = req.nextUrl.pathname.startsWith("/me")
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      console.log('isAuth', isAuth)
      if (isAuth) {
        return NextResponse.redirect(new URL("/me", req.url))
      }
      return null
    }

    if (isAdminSegment && !(token?.role === "admin" || token?.role === "superadmin")) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (!isAuth) {
      console.log('NO TOKEN', isAuth)
      let from = req.nextUrl.pathname

      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
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
  }
)

export const config = {
  matcher: ["/admin/:path*", "/me/:path*", "/login", "/register"],
}
