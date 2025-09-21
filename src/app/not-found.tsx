// app/not-found.tsx  (전역 404)
import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>페이지를 찾을 수 없어요</h1>
      <p style={{ marginBottom: 12 }}>주소가 바뀌었거나 삭제되었을 수 있어요.</p>
      <Link href="/meetings" style={{ textDecoration: "underline" }}>
        모임 목록으로 돌아가기
      </Link>
    </main>
  );
}
