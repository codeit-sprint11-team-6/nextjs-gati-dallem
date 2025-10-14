// src/app/(auth)/signin/page.tsx

import LoginForm from "@/components/auth/LoginForm";
import DebugOnce from "../../../components/debug/DebugOnce";
import AuthGrid from "@/components/auth/AuthGrid";

export const metadata = {
  title: "로그인 | 같이달램",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const LoginPage = async ({ searchParams }: PageProps) => {
  const sp = await searchParams; // 반드시 await
  const redirect = typeof sp.redirect === "string" ? sp.redirect : undefined;
  return (
    <AuthGrid
      // 좌측: 이미지 자리에 임시 텍스트
      left={
        <div className="text-center select-none md:text-left">
          <div className="mb-4 text-3xl font-semibold text-slate-700">오늘부터 함께 시작해요</div>
          <div className="text-4xl font-bold tracking-tight text-slate-900">같이달램</div>
          <p className="mt-4 text-slate-500">가입 후 바로 모각코 참여!</p>
          {/* 이미지 필요해지면 여기에만 추가 */}
        </div>
      }
      // 우측: 로그인 폼
      right={
        <>
          <LoginForm redirect={redirect} />
          <DebugOnce /> {/* 임시 디버깅용 */}
        </>
      }
    />
  );
};

export default LoginPage;
