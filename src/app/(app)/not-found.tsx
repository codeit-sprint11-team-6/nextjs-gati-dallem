// (에러 방지용 전역 404: 최소 컴포넌트로)
/// src/app/not-found.tsx
import Link from "next/link";
export default function NotFound() {
  return (
    <main className="p-6">
      <h1 className="font-semibold mb-2">페이지를 찾을 수 없습니다</h1>
      <Link href="/meetings" className="underline">
        모임 목록으로 이동
      </Link>
    </main>
  );
}
