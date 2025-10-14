// src/app/(auth)/signup/page.tsx

import DebugOnce from "../../../components/debug/DebugOnce";
// import strict from "assert/strict";
import AuthGrid from "@/components/auth/AuthGrid";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <AuthGrid
      left={
        <div className="text-center select-none md:text-left">
          <div className="mb-4 text-3xl font-semibold text-slate-700">오늘부터 함께 시작해요</div>
          <div className="text-4xl font-bold tracking-tight text-slate-900">같이달램</div>
          <p className="mt-4 text-slate-500">가입 후 바로 모각코 참여!</p>
          {/* 이미지 필요해지면 여기에만 추가 */}
        </div>
      }
      right={
        <>
          <SignupForm
          // redirect={redirect}
          />
          <DebugOnce /> {/* 임시 디버깅용 */}
        </>
      }
    />
  );
};

export default SignupPage;
