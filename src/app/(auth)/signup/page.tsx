// src/app/(auth)/signup/page.tsx

// import strict from "assert/strict";
import AuthGrid from "@/components/auth/AuthGrid";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <AuthGrid
      // 좌측: 이미지 자리에 임시 텍스트 : 공통 분리 예정
      left={
        <div className="text-center select-none md:text-left">
          <div className="mb-4 text-3xl font-semibold text-slate-700">오늘부터 함께 시작해요</div>
          <div className="text-4xl font-bold tracking-tight text-slate-900">같이달램</div>
          <p className="mt-4 text-slate-500">가입 후 바로 모각코 참여!</p>
          {/* 이미지 필요해지면 여기에만 추가 */}
        </div>
      }
      // 우측: 회원가입 폼
      right={
        <>
          <SignupForm
          // redirect={redirect}
          />
        </>
      }
    />
  );
};

export default SignupPage;
