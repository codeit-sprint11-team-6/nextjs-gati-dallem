// /src/app/(app)/(my)/bookings/page.tsx
"use client";

import { useState } from "react";
import { useAuthStore, selectIsAuthenticated, selectUser } from "@/store/authStore";
// import { useSignin, useAuthUser } from "@/apis/auths/auths.query";
import { useAuthUser } from "@/hooks/auths/useAuthUser";
import { useSignin } from "@/hooks/auths/useSignin";
import { useJoinedGatherings } from "@/apis/gatherings/gatherings.query";

// ─────────────────────────────────────────────────────────────────────────────
// Signin 패널: React Query 뮤테이션(useSignin) 사용
// ─────────────────────────────────────────────────────────────────────────────
function SigninPanel() {
  const signinMutation = useSignin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signinMutation.mutate({ email, password });
  };

  return (
    <div className="max-w-sm space-y-3">
      <h2 className="text-lg font-semibold">로그인</h2>
      <form onSubmit={onSubmit} className="space-y-2">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
        <button
          type="submit"
          disabled={signinMutation.isPending}
          className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-50"
        >
          {signinMutation.isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {signinMutation.isError && (
        <p className="text-sm text-red-600">
          로그인 실패: {(signinMutation.error as Error)?.message}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 내 참석 모임 목록: React Query 쿼리(useJoinedGatherings) 사용
// ─────────────────────────────────────────────────────────────────────────────
function MyBookings() {
  // 로그인된 사용자 정보(도메인 타입) 쿼리 – 캐시 유지 및 name 표기를 위해 사용 (선택)
  const { data } = useAuthUser({ enabled: true });

  // 참석한 모임 목록 – 정렬/필터는 필요에 따라 인자 조절
  const joined = useJoinedGatherings(
    { sortBy: "dateTime", sortOrder: "asc", limit: 20 },
    { enabled: true },
  );

  if (joined.isLoading) return <div>내 참석 모임을 불러오는 중...</div>;
  if (joined.isError) return <div className="text-red-600">불러오기 실패</div>;

  const list = joined.data ?? [];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {data ? `${data.name}님의 참석 모임` : "내 참석 모임"}
      </h2>

      {list.length === 0 ? (
        <p className="text-sm text-gray-600">참석한 모임이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((g) => (
            <li key={g.id} className="rounded border p-3">
              <div className="font-medium">{g.name}</div>
              <div className="text-sm text-gray-700">
                {new Date(g.dateTime).toLocaleString()}
                {" · "}
                {g.location}
              </div>
              <div className="text-xs text-gray-500">
                인원 {g.participantCount}/{g.capacity}
                {g.isCompleted ? " · 종료" : ""}
                {g.isReviewed ? " · 리뷰 완료" : ""}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 페이지 컴포넌트
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  // Zustand에 저장된 인증 스냅샷만으로 즉시 분기
  const isAuthed = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore(selectUser);

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-6">
      <h1 className="text-2xl font-bold">내 예약(참석 모임)</h1>

      {!isAuthed ? (
        <SigninPanel />
      ) : (
        <>
          {/* 로그인 상태라면 예약(참석 모임) 목록을 바로 보여줌 */}
          <MyBookings />
        </>
      )}
    </main>
  );
}
