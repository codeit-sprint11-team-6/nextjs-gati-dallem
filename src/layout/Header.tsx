"use client";
import Link from "next/link";

export default function MainNav() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="mx-auto max-w-6xl h-14 md:h-16 px-4 flex items-center gap-6">
        <Link href="/" className="font-semibold">
          같이달램
        </Link>
        <Link href="/meetings">모임 찾기</Link>
        <Link href="/favorites">찜한 모임</Link>
        <Link href="/my">마이페이지</Link>
        <Link href="/signin" className="ml-auto">
          로그인
        </Link>
        <Link href="/signup">회원가입</Link>
      </nav>
    </header>
  );
}
