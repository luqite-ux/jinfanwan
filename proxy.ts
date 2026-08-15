import { NextResponse, type NextRequest } from "next/server"

import { SESSION_COOKIE } from "@/lib/admin-session"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicAdminPath = pathname === "/admin/login" || pathname === "/admin/logout"

  if (!isPublicAdminPath && pathname.startsWith("/admin") && !request.cookies.get(SESSION_COOKIE)?.value) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/admin/login"
    loginUrl.searchParams.set("reason", "unauthorized")
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = { matcher: ["/admin/:path*"] }
