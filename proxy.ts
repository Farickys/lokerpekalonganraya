import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const path = req.nextUrl.pathname
  const session = req.auth

  if (path.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (path.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (path.startsWith('/admin') && session?.user && (session.user as any).role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
