import { getToken } from 'next-auth/jwt'
import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (path === '/') {
    return NextResponse.next()
  }

  const session = await getToken({ req })

  const isProtected = path.startsWith('/dashboard')

  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url))
  } else if (session && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard/event', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
