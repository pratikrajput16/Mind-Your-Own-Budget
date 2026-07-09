import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuthPage = request.nextUrl.pathname === "/login";

  const isDashboard =
    request.nextUrl.pathname.startsWith("/dashboard");

  // User not logged in
  if (!token && isDashboard) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // User already logged in
  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
  ],
};