import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("loggedIn");

  // 로그인 상태에서 로그인, 회원가입 페이지 접근 막음
  if (request.nextUrl.pathname.startsWith("/sign"))
    return isLoggedIn ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();

  // 비로그인 상태에서 마이페이지 접근 막음
  return request.nextUrl.pathname.startsWith("/my") && !isLoggedIn
    ? NextResponse.redirect(new URL("/signin", request.url))
    : NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/profile", "/meetings", "/favorite/", "/my"],
};
