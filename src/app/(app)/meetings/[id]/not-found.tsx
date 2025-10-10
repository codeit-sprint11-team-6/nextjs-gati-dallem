import { useRouter } from "next/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">모임을 찾을 수 없습니다</h1>
        <p className="mb-8 text-gray-600">요청하신 모임이 존재하지 않거나 삭제되었습니다.</p>
        <a
          href="/meetings"
          className="inline-block rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
        >
          모임 목록으로 돌아가기
        </a>
      </div>
    </div>
  );
}
