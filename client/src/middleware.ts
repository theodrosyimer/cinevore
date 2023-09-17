import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAdminSegment = req.nextUrl.pathname.startsWith("/admin")
    const isLoginPage = req.nextUrl.pathname.startsWith("/login")
    const isRegisterPage = req.nextUrl.pathname.startsWith("/register")
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")
    console.log(req.nextUrl)

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/me", req.url))
      }
      return null
    }

    if (isLoginPage) {
      if (isAuth && token?.role === "admin") {
        console.log('LOGGED IN AS:', token.role)

        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
      }
      if (isAuth && token?.role === "user") {
        console.log('LOGGED IN AS:', token.role)
        return NextResponse.redirect(new URL("/me", req.url))
      }
      console.log('NO TOKEN:', token)

      return null
    }

    if (isAdminSegment && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      // console.log('FROM:', from)

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
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/me/:path*", "/login", "/register"],
}
