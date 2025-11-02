// src/app/(auth)/signup/page.tsx

import AuthGrid from "@/components/auth/AuthGrid";
import AuthIntro from "@/components/auth/AuthIntro";
import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "회원가입 | 같이달램",
};

const SignupPage = () => {
  return (
    <AuthGrid
      left={
        <AuthIntro
          title="오늘부터 함께 시작해요"
          subtitle="같이달램"
          description="회원가입 후 바로 모각코 참여!"
        />
      }
      right={
        <>
          <SignupForm />
        </>
      }
    />
  );
};

export default SignupPage;
